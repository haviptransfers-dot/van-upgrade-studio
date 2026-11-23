// React 18's streaming text buffer can leave U+0000 bytes between multibyte
// characters on long Greek/Hebrew/Arabic pages. They are never real content.
export function stripRendererNulls(html: string) {
  return html.replace(/\u0000/g, "");
}
