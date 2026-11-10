import mobile from "@/assets/riviera-home-480.webp.asset.json";
import desktop from "@/assets/riviera-home-800.webp.asset.json";

export const hostedImageUrl = (url: string) => url.startsWith("/") ? `https://van-move-boost.lovable.app${url}` : url;
export const heroDelivery = {
  src: hostedImageUrl(desktop.url),
  srcSet: `${hostedImageUrl(mobile.url)} 480w, ${hostedImageUrl(desktop.url)} 800w`,
  // Cap selection at 800px while keeping the same uncropped photograph.
  sizes: "(max-width: 480px) 100vw, 800px",
  width: 1600,
  height: 1000,
};