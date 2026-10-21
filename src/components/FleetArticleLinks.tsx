import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { blogPosts, localizePost } from "@/data/blogPosts";

export default function FleetArticleLinks() {
  const { i18n } = useTranslation();
  const slugs = ["mercedes-v-class-chauffeur-service-athens", "child-car-seats-private-transfers-greece"];
  const posts = blogPosts.filter((post) => slugs.includes(post.slug));
  return <div className="mt-6 space-y-2">{posts.map((post) => {
    const localized = localizePost(post, i18n.language);
    return <p key={post.slug}><Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2 text-primary underline underline-offset-4 hover:text-primary/80 text-sm md:text-base">{localized.title}</Link></p>;
  })}</div>;
}