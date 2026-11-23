// React 18's streaming text buffer can leave U+0000 bytes between multibyte
// characters on long Greek/Hebrew/Arabic pages. They are never real content.
const CLEANED_PATHS = ["/blog/child-car-seats-private-transfers-greece", "/privacy-policy"];

export function stripRendererNulls(path: string, html: string) {
  const base = path.replace(/\/+$/, "");
  return CLEANED_PATHS.some((suffix) => base.endsWith(suffix)) ? html.replace(/\u0000/g, "") : html;
}
