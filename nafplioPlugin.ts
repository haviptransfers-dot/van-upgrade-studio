import type { Plugin } from "vite";
import { readFileSync } from "node:fs";
import path from "node:path";
import { marked } from "marked";
import { nafplioPost as post, nafplioFaq } from "./src/data/nafplio";
import montserrat from "./src/assets/fonts/montserrat-latin.woff2.asset.json";
import playfair from "./src/assets/fonts/playfair-display-latin.woff2.asset.json";

export const nafplioPath = `/blog/${post.slug}`;
const canonical = `https://haviptransfers.gr${nafplioPath}`;
const esc = (value: string) => value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function renderNafplio() {
  const root = readFileSync(path.resolve("src/index.css"), "utf8").match(/:root\s*\{([\s\S]*?)\}/)?.[1] ?? "";
  const markdown = readFileSync(path.resolve("src/data/nafplio-article.md"), "utf8");
  const body = marked.parse(markdown, { async: false }).replace(/href="https:\/\/haviptransfers\.gr\//g, 'href="/');
  const faqSchema = {
    "@context": "https://schema.org", "@type": "FAQPage",
    mainEntity: nafplioFaq.map(({ question, answer }) => ({ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } })),
  };
  const articleSchema = { "@context": "https://schema.org", "@type": "BlogPosting", headline: post.title, description: post.metaDescription, image: post.image, datePublished: post.date, mainEntityOfPage: canonical, author: { "@type": "Organization", name: "H&A VIP Tours" } };
  return `<!doctype html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(post.metaTitle)}</title><meta name="description" content="${esc(post.metaDescription)}"><meta name="keywords" content="${esc(post.keywords)}">
<link rel="canonical" href="${canonical}"><meta property="og:title" content="${esc(post.metaTitle)}"><meta property="og:description" content="${esc(post.metaDescription)}"><meta property="og:type" content="article"><meta property="og:url" content="${canonical}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(post.metaTitle)}"><meta name="twitter:description" content="${esc(post.metaDescription)}">
<link rel="preconnect" href="https://van-move-boost.lovable.app" crossorigin><link rel="preload" as="image" href="${post.image}" type="image/webp" fetchpriority="high">
<style>
:root {${root}}
@font-face{font-family:Montserrat;font-style:normal;font-weight:400 700;font-display:swap;src:url(https://van-move-boost.lovable.app${montserrat.url}) format('woff2')}
@font-face{font-family:'Playfair Display';font-style:normal;font-weight:400 700;font-display:swap;src:url(https://van-move-boost.lovable.app${playfair.url}) format('woff2')}
*{box-sizing:border-box}body{margin:0;background:hsl(var(--background));color:hsl(var(--foreground));font-family:Montserrat,sans-serif;letter-spacing:0}a{color:hsl(var(--primary));text-underline-offset:4px}header{border-bottom:1px solid hsl(var(--border));background:hsl(var(--background));position:sticky;top:0;z-index:2}nav{max-width:1280px;margin:auto;padding:18px 24px;display:flex;justify-content:space-between;gap:20px}nav a{text-decoration:none}nav .brand,h1,h2,h3{font-family:'Playfair Display',serif}.brand{font-weight:700}main{max-width:848px;margin:auto;padding:56px 24px 64px}h1{font-size:44px;line-height:1.2;margin:24px 0 32px}h2{font-size:28px;line-height:1.35;margin:44px 0 20px}h3{font-size:22px;line-height:1.4;margin:28px 0 16px}p{font-size:16px;line-height:1.9;color:hsl(var(--muted-foreground));margin:0 0 24px}img{display:block;width:100%;height:auto;border-radius:8px;margin:0 0 36px}.article-map{margin-top:40px}.booking{margin:40px 0;border-top:1px solid hsl(var(--border));padding-top:24px}.booking a{display:inline-block;background:hsl(var(--primary));color:hsl(var(--primary-foreground));padding:14px 24px;border-radius:6px;font-weight:600;text-decoration:none}footer{border-top:1px solid hsl(var(--border));padding:28px 24px;text-align:center}a:focus-visible{outline:2px solid hsl(var(--ring));outline-offset:5px}@media(max-width:640px){main{padding-top:36px}h1{font-size:32px}h2{font-size:25px}nav{padding:16px}nav a{font-size:14px}}
</style></head><body><header><nav aria-label="Main navigation"><a class="brand" href="/">H&A TOURS</a><a href="/blog">← Back to Blog</a></nav></header>
<main><a href="/blog">← Blog</a><h1>${esc(post.title)}</h1><img src="${post.image}" alt="${esc(post.imageAlt)}" width="800" height="533" loading="eager" decoding="async" fetchpriority="high">
<article>${body}<img class="article-map" src="${post.map}" alt="${esc(post.mapAlt)}" width="800" height="533" loading="lazy" decoding="async">
<section aria-labelledby="faq"><h2 id="faq">Frequently Asked Questions</h2>${nafplioFaq.map(({ question, answer }) => `<h3>${esc(question)}</h3><p>${esc(answer)}</p>`).join("")}</section>
<div class="booking"><a href="https://wa.me/306949393700" target="_blank" rel="noopener noreferrer">Book your Nafplio tour on WhatsApp</a></div></article></main><footer><a class="brand" href="/">H&A TOURS</a></footer>
<script type="application/ld+json">${JSON.stringify(articleSchema)}</script><script type="application/ld+json">${JSON.stringify(faqSchema)}</script></body></html>`;
}

export function nafplioPlugin(): Plugin {
  return {
    name: "static-nafplio-article",
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        const pathname = req.url?.split("?")[0];
        if (pathname !== nafplioPath && pathname !== `${nafplioPath}/` && pathname !== `${nafplioPath}/index.html`) return next();
        res.setHeader("Content-Type", "text/html; charset=utf-8");
        res.end(renderNafplio());
      });
    },
    generateBundle() { this.emitFile({ type: "asset", fileName: `blog/${post.slug}/index.html`, source: renderNafplio() }); },
  };
}