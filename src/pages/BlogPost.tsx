import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, MessageCircle, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts, localizePost, WHATSAPP_URL } from "@/data/blogPosts";
import logoImg from "@/assets/logo.webp";

/** Renders plain text with optional [label](url) markdown links as real anchors. */
function LinkedText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={key++}>{text.slice(lastIndex, match.index)}</span>);
    }
    parts.push(
      <a
        key={key++}
        href={match[2]}
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary underline underline-offset-2 hover:text-primary/80"
      >
        {match[1]}
      </a>
    );
    lastIndex = regex.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(<span key={key++}>{text.slice(lastIndex)}</span>);
  }
  return <>{parts}</>;
}


const SITE_URL = "https://haviptransfers.gr";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  const found = blogPosts.find((p) => p.slug === slug);
  const post = found ? localizePost(found, i18n.language) : undefined;

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-4 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">{t("blog.notFound")}</h1>
        <Link to="/blog" className="text-primary hover:underline">
          {t("blog.backToBlog")}
        </Link>
      </div>
    );
  }

  const url = `${SITE_URL}/blog/${post.slug}`;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <html lang={i18n.language} />
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={post.metaTitle} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="article" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: post.title,
            description: post.metaDescription,
            datePublished: post.date,
            image: post.image,
            author: { "@type": "Organization", name: "H&A VIP Transfers" },
          })}
        </script>
      </Helmet>

      {/* Header */}
      <header className="border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <Link to="/" className="flex items-center gap-2">
            <img src={logoImg} alt="H&A Tours" className="h-9 w-9 object-contain" width={36} height={36} />
            <span className="font-display text-base font-bold text-primary">H&A TOURS</span>
          </Link>
          <Link to="/blog" className="flex items-center gap-2 text-sm text-foreground/70 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" />
            {t("blog.backToBlog")}
          </Link>
        </div>
      </header>

      <main className="container mx-auto max-w-3xl px-4 py-12 md:py-16">
        <p className="text-primary uppercase tracking-[0.2em] text-xs mb-3">
          {new Date(post.date).toLocaleDateString(i18n.language, { year: "numeric", month: "long", day: "numeric" })}
        </p>
        <h1 className="font-display text-3xl md:text-5xl font-bold mb-8 leading-tight">{post.title}</h1>
        <img
          src={post.image}
          alt={post.imageAlt}
          className="w-full rounded-lg shadow-2xl mb-10 aspect-[16/9] object-cover"
          fetchPriority="high"
          decoding="async"
        />

        <article className="space-y-10">
          {post.sections.map((section, i) => (
            <section key={i}>
              {section.heading && (
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4 text-primary">{section.heading}</h2>
              )}
              {section.subheading && (
                <h3 className="font-display text-xl font-semibold mb-3">{section.subheading}</h3>
              )}
              {section.paragraphs?.map((p, j) => (
                <p key={j} className="text-foreground/80 leading-relaxed mb-4">
                  <LinkedText text={p} />
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-3 mt-4">
                  {section.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-foreground/80">
                      <Star className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span><LinkedText text={b} /></span>
                    </li>
                  ))}
                </ul>
              )}
              {section.image && (
                <img
                  src={section.image}
                  alt={section.imageAlt ?? ""}
                  loading="lazy"
                  decoding="async"
                  className="w-full rounded-lg shadow-xl mt-6 border border-border"
                />
              )}
            </section>
          ))}
        </article>

        {/* WhatsApp CTA */}
        <div className="mt-14 bg-card border border-primary/20 rounded-lg p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-3">{t("blog.ctaTitle")}</h2>
          <p className="text-muted-foreground mb-6">{t("blog.ctaDesc")}</p>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="text-base px-8 gap-2 bg-primary text-primary-foreground hover:bg-primary/80">
              <MessageCircle className="w-5 h-5" />
              {t("blog.ctaWhatsapp")}
            </Button>
          </a>
        </div>

        {/* Google Preferred Sources — big button */}
        <div className="mt-8 bg-card border border-primary/20 rounded-lg p-8 md:p-10 text-center">
          <h2 className="font-display text-2xl font-bold mb-3">{t("preferredSources.blogTitle")}</h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">{t("preferredSources.blogText")}</p>
          <div
            google-add-preferred-source-btn
            data-theme="dark"
            data-lang={i18n.language === "en" ? "en" : i18n.language === "el" ? "el" : "en"}
            className="min-h-[44px] flex items-center justify-center"
          />
          <a
            href="https://www.google.com/preferences/source?q=haviptransfers.gr"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 mt-4 px-8 py-3 rounded-md bg-primary text-primary-foreground font-medium hover:bg-primary/80 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t("preferredSources.button")}
          </a>
        </div>
      </main>

      <footer className="border-t border-border py-8 px-4">
        <div className="container mx-auto max-w-6xl flex items-center justify-center gap-2">
          <img src={logoImg} alt="H&A Tours" className="h-8 w-8 object-contain" loading="lazy" />
          <span className="font-display text-sm font-bold text-primary">H&A TOURS</span>
        </div>
      </footer>
    </div>
  );
};

export default BlogPost;
