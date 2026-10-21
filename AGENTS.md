# Architecture rules

- Use the generated image manifest through OptimizedImage and DeferredBackground for responsive WebP delivery; this keeps intrinsic sizes and optimized variants consistent across pages. Resolve hosted image pointers through the stable published asset origin so direct local preview tests also render CDN photos.
- Keep non-homepage routes and non-English language resources dynamically imported; visitors should not download unrelated page or language content.
- Defer below-fold homepage modules until they approach the viewport; load chat only through the click-to-chat boundary and reveal the floating WhatsApp link after the hero load and two paint frames, so unrelated interactions cannot load chat or interrupt the hero.
- Store the three review-card snapshots as lazy hosted images with full review text alternatives; this removes runtime review-card animation without losing readable review content.
- Preserve the production Metricool snippet verbatim; postpone its execution with a separate scheduling wrapper rather than altering its tracking code.