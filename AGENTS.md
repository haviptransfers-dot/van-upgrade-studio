# Architecture rules

- Use the generated image manifest through OptimizedImage and DeferredBackground for responsive WebP delivery; this keeps intrinsic sizes and optimized variants consistent across pages. Resolve hosted image pointers through the stable published asset origin so direct local preview tests also render CDN photos.
- Keep non-homepage routes and non-English language resources dynamically imported; visitors should not download unrelated page or language content.
- Defer below-fold homepage modules until they approach the viewport and the assistant until interaction or a three-second delay; this protects the first paint while retaining all controls.
- Preserve the production Metricool snippet verbatim; postpone its execution with a separate scheduling wrapper rather than altering its tracking code.