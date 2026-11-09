# Multilingual SEO corrections

## What will change
- Give every public page and blog post eight matching language versions: English keeps its current path; other versions use `/el/`, `/de/`, `/es/`, `/fr/`, `/it/`, `/he/` and `/ar/`.
- Deliver translated page content in the initial HTML, including content currently delayed until scrolling. Keep the existing appearance, photos, music, consent controls and WhatsApp booking flow.
- Set translated titles, descriptions and social tags; one self-referencing canonical; reciprocal language links for all eight languages plus English `x-default`; correct document language and right-to-left direction for Hebrew and Arabic.
- Make language choices real links to the corresponding page and remove the duplicate English option. Keep internal navigation within the selected language.
- Expand the sitemap to all public language versions with language alternates; retain the robots sitemap reference and omit unsupported modification dates.

## Requested content corrections
- Replace public V-Class references with Mercedes Vito VIP or Mercedes VIP van, including headings, metadata and image descriptions; remove ceiling claims. Use the confirmed capacity of **7 passengers, excluding the driver**.
- Update the homepage heading and search metadata, add 300–500 words of practical service information and the requested section headings and internal links.
- Add a dedicated child-seats page using existing, owner-confirmed seat information and link it from the homepage.
- Rewrite Piraeus transfer content with at least 500 English words, translated counterparts and the requested FAQ. Avoid invented waiting-time guarantees or new prices. Link it from the homepage and relevant port articles.
- Update the sole shared business schema with the supplied name, address, Maps and YouTube links, and **5.0 from 63 reviews**. Keep one business entity and one aggregate rating per page; add LocalBusiness/TaxiService types to that entity instead of introducing duplicates.
- Rename these two articles and update all links:
  - `/blog/mercedes-v-class-chauffeur-service-athens` → `/blog/mercedes-vito-vip-chauffeur-service-athens`
  - `/blog/wedding-transfers-greece-mercedes-v-class` → `/blog/wedding-transfers-greece-mercedes-vito-vip`
- Link the Nafplio article from the tour page and blog index; check tour metadata, headings, related links and WhatsApp actions.

## Technical approach
- Extend the existing Vite static-generation approach rather than migrate the application. Generate the actual translated page layout and content, not a separate SEO-only copy. Keep lazy client loading and existing image optimization.
- Use a shared language/path mapping for generation, navigation, canonical tags, alternates and sitemap generation. Complete missing translations, including English content for articles whose base text is currently Greek.
- Cap static generation at 1,000 pages to prevent unbounded output growth. The expected total is approximately 232 public pages, finalized from the actual catalog.
- Preserve independent article performance while providing translated versions and consistent language navigation.
- Add permanent redirects for the existing Netlify deployment and matching development redirects. **Lovable hosting does not process Netlify redirect files:** provide client navigation fallbacks there, but do not describe those as HTTP 301 redirects; actual published-domain 301 behavior must be verified separately.
- Keep CI workflow configuration unchanged; update shared sitemap/SEO validation assumptions only where multilingual URLs require it.

## Validation and handoff
- Test canonical/hreflang reciprocity, sitemap coverage, path mapping, confirmed passenger capacity, 63-review schema and old/new article mappings.
- Check initial HTML without JavaScript for every public language version, including visible translated text, metadata, language/direction, one H1 and no duplicated business ratings.
- Verify desktop/mobile layout, language switching on a tour and blog post, and a real calculator-to-WhatsApp booking flow without sending a message.
- Provide a complete list of new and renamed URLs and the sitemap address for Search Console. Report any hosting-dependent redirect limitations explicitly.
- **Do not publish automatically.** Changes reach the live site only after an approved publication.