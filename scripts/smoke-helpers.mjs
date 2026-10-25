export function numericOption(value, fallback, minimum = 0) {
  const parsed = Number(value);
  return value === undefined || value === "" || !Number.isFinite(parsed) || parsed < minimum ? fallback : Math.floor(parsed);
}

export class UnavailableError extends Error {}

export async function fetchWithRetry(url, { retries = 3, delay = 5000, timeout = 15000, fetcher = fetch, sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms)) } = {}) {
  let lastError;
  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetcher(url, { redirect: "follow", signal: AbortSignal.timeout(timeout) });
      if (response.ok) return await response.text();
      const transient = response.status === 408 || response.status === 429 || response.status >= 500;
      lastError = transient ? new UnavailableError(`HTTP ${response.status}`) : new Error(`HTTP ${response.status}`);
      if (!transient) throw lastError;
    } catch (error) {
      if (error === lastError && !(error instanceof UnavailableError)) throw error;
      lastError = error instanceof UnavailableError ? error : new UnavailableError(error.message);
    }
    if (attempt < retries) await sleep(delay);
  }
  throw lastError ?? new UnavailableError("No response received");
}

export function jsonLdBlocks(html) {
  return [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script\s*>/gi)]
    .filter((match) => /\btype\s*=\s*["']application\/ld\+json["']/i.test(match[1]))
    .map((match) => JSON.parse(match[2]));
}

export function hasOrganization(value) {
  if (Array.isArray(value)) return value.some(hasOrganization);
  if (!value || typeof value !== "object") return false;
  const types = [value["@type"] ?? []].flat();
  return types.some((type) => ["Organization", "TravelAgency", "LocalBusiness"].includes(type)) || hasOrganization(value["@graph"]);
}