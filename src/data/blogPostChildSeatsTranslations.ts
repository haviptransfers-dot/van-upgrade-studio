import article from "./childSeatArticle.json";
import type { BlogPostTranslation } from "./blogPostTranslations";

export const childSeatsTranslations: Record<string, BlogPostTranslation> = Object.fromEntries(
  Object.entries(article).filter(([language]) => language !== "en"),
);
