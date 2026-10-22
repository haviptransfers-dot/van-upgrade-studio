# Nafplio Blog article without homepage overhead

- Add the supplied article at `/blog/athens-to-nafplio-private-tour`, preserving its headings and linking to existing Blog articles.
- Use only the two uploaded WebP photos at their existing 800×533 dimensions; prioritize the first and lazy-load the map.
- Add the exact title, description, keywords and requested FAQ answers with structured data.
- Add the article to the Blog listing and existing automatically generated RSS feed, not the homepage hero.

## Technical approach

- Generate a standalone static HTML article at build time, with no React or article JavaScript. Serve the same HTML in local preview.
- Keep its styling and existing hosted fonts isolated from the homepage; Blog links to this article will navigate to its static document.
- Existing language imports remain unchanged. The article uses the supplied English text; translations are not supplied.
- Test FAQ facts, static delivery, Blog navigation, image rendering and no article JavaScript requests. Existing published PageSpeed scores can only be confirmed after publication and retesting.