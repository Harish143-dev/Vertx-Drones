# VertX SEO Audit

Production domain: `https://vertxdroneshow.in/`

## Completed Fixes

| Issue | Impact | Affected files | Fix status |
| --- | --- | --- | --- |
| Shared SEO default image pointed to missing `/og-image.jpg`. | Social previews could fail or show no usable image when a page does not pass a custom image. | `src/components/SEO.tsx` | Fixed: default image now uses existing `/512.png`. |
| Shared SEO component always emitted `index, follow`. | Utility/error routes such as 404 could be indexed. | `src/components/SEO.tsx`, `src/pages/not-found.tsx` | Fixed: `SEO` now accepts a `robots` prop and 404 uses `noindex, nofollow`. |
| Portfolio JSON-LD used stale `https://vertx-drones.com` URLs. | Structured data pointed crawlers to the wrong domain and a missing thumbnail. | `src/pages/Portfolio.tsx` | Fixed: schema now uses `https://vertxdroneshow.in/portfolio` and `/512.png`. |
| Portfolio JSON-LD rendered as a raw page script instead of the shared schema component. | Page-level structured data was inconsistent with the rest of the app's Helmet-based SEO flow. | `src/pages/Portfolio.tsx`, `src/components/Schema.tsx` | Fixed: portfolio schema now renders through `Schema`. |

## Verified Existing SEO Assets

| Asset | Status |
| --- | --- |
| Canonical production domain | Uses `https://vertxdroneshow.in`. |
| Robots file | `public/robots.txt` points to `https://vertxdroneshow.in/sitemap.xml`. |
| Sitemap | `public/sitemap.xml` includes all current static routes and blog slugs. |
| Static homepage fallback metadata | `index.html` uses the real domain and existing `/512.png` social image. |

## Future SEO Improvement

The site is a Vite React single-page app. Route metadata is updated with `react-helmet-async` after JavaScript runs, so non-JavaScript crawlers and some social scrapers may initially see the homepage metadata from `index.html` on deep routes. The long-term fix is prerendering or SSR for public pages, but that is intentionally outside this cleanup pass.

## Verification

Completed on 2026-06-08:

- `npm.cmd run typecheck` passed.
- `npm.cmd run build` passed and regenerated `public/sitemap.xml` plus `dist/sitemap.xml`.
- No active source/build files contain `https://vertx-drones.com`.
- No active source/build files contain `/og-image.jpg`.
- Built 404 route contains `noindex, nofollow`.
