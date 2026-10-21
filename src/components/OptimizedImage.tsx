import type { ImgHTMLAttributes } from "react";
import manifest from "@/assets/imageManifest.json";

type ImageEntry = { width: number; height: number; variants: { url: string; width: number; bytes: number }[] };
const images = manifest as Record<string, ImageEntry>;
export const hostedImageUrl = (url: string) => url.startsWith("/") ? `https://van-move-boost.lovable.app${url}` : url;

export function imageEntry(src: string) {
  const filename = src.split("/").pop()?.split("?")[0] ?? "";
  // Keep the already-small original brand mark lossless and unchanged.
  if (filename === "logo.webp" || filename.startsWith("logo-")) return undefined;
  const key = Object.keys(images).find((name) => name === filename) ?? Object.keys(images).find((name) => filename.startsWith(`${name.slice(0, name.lastIndexOf("."))}-`));
  return key ? images[key] : undefined;
}

export default function OptimizedImage({ src = "", sizes = "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 800px", loading = "lazy", ...props }: ImgHTMLAttributes<HTMLImageElement>) {
  const entry = imageEntry(src);
  const largest = entry?.variants[entry.variants.length - 1];
  return <img {...props} src={largest ? hostedImageUrl(largest.url) : src} width={props.width ?? entry?.width ?? 800} height={props.height ?? entry?.height ?? 600}
    srcSet={entry?.variants.map((variant) => `${hostedImageUrl(variant.url)} ${variant.width}w`).join(", ") ?? props.srcSet}
    sizes={sizes} loading={loading} decoding={props.decoding ?? "async"} />;
}