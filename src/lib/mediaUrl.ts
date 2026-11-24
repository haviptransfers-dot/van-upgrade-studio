/** Serve existing hosted media from the owner's same-domain static copies. */
export function hostedImageUrl(url: string): string {
  if (url.includes("/__l5e/assets-v1/")) {
    const filename = url.split("/").pop()?.split(/[?#]/)[0];
    if (filename) return `/static-media/${filename}`;
  }
  return url;
}