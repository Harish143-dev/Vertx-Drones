# Vertx Full Website QA Audit Report

Date: 2026-05-12  
Scope: UI, styling, responsiveness, animation, interaction, form behavior, route behavior, and build/runtime risks.

## Executive Summary

The main marketing routes render and the production build can complete, but the site has several visible launch-quality issues. The biggest risks are mobile hero text clipping, very low contrast on the Contact page, placeholder secondary pages, and production-facing placeholder contact/WhatsApp behavior.

The strongest pages visually are Portfolio, Corporate, Weddings, and Show Builder. The weakest surfaces are Contact, About, Blog, Partner Program, and the 404 page.

## Verification Commands

| Check | Result | Notes |
|---|---:|---|
| `npm.cmd run typecheck` | Passed | TypeScript completed with no errors. |
| `npm.cmd run build` | Blocked in sandbox | Failed with Windows/esbuild `spawn EPERM`. |
| `$env:NODE_OPTIONS='--max-old-space-size=4096'; npm.cmd run build` | Passed | Completed after escalation; emitted large chunk warning. |
| Live route HTTP check | Passed | All tested SPA routes returned dev-server HTML. |
| Headless Chrome screenshots | Completed | Captured desktop/tablet/mobile screenshots for primary routes, and desktop/mobile for placeholder/404 routes. |

## Findings Table

| Priority | Page / Route | Category | Issue | Impact | Suggested Fix |
|---|---|---|---|---|---|
| P1 | `/contact` | UI / readability | Main content and form are almost invisible on desktop and mobile because text and glass panel contrast are too low against the black background. | Users may not be able to read or complete the main inquiry flow. | Raise text opacity, strengthen form panel contrast, and verify at mobile and desktop. |
| P1 | `/` mobile | Responsive UI | Home hero headline clips horizontally on mobile; only part of the line is visible. | First impression breaks on mobile and hides the core message. | Reduce mobile heading size/letter spacing or constrain/wrap the animated word spans. |
| P1 | `/contact` | Functional / form | Contact form only calls `setSubmitted(true)` locally; no payload is sent anywhere. | Users can receive a success state without the business receiving the inquiry. | Connect submit to real backend/webhook/email flow or clearly mark as demo until wired. |
| P1 | Global | Functional / CTA | WhatsApp sticky uses placeholder number `919999999999`. | Production users will be sent to the wrong WhatsApp destination. | Replace with the real business WhatsApp number or hide until configured. |
| P2 | `/about`, `/blog`, `/partner-program` | Page completeness | These routes are placeholder pages without the site Navbar/Footer and with minimal content. | Navigation feels broken and the pages do not match the premium Vertx site quality. | Build proper branded pages or remove links until ready. |
| P2 | `/missing-route` | 404 UX | Not found page uses a light default card, debug copy, and no Vertx nav/footer styling. | Broken-route experience feels like a template error rather than a polished site. | Rebuild 404 as a branded dark Vertx page with a clear route back home/contact. |
| P2 | `/simulator` mobile | Responsive UI | Show Builder hero heading and body copy clip at the right edge on mobile. | Mobile users lose the core simulator message before reaching the builder. | Apply mobile-safe heading width, wrapping, and smaller letter spacing. |
| P2 | `/corporate`, `/weddings` mobile | Responsive UI | Hero headings sit close to the right edge and visually crop/feel constrained on narrow screens. | Key money-page headlines are harder to read on mobile. | Tighten mobile type scale and add stronger max-width/word wrapping. |
| P2 | `/portfolio` / homepage portfolio sections | Media / content | Several portfolio video previews reuse the generic `/mp_.mp4` sample instead of project-specific footage. | Case studies feel less trustworthy because different projects show the same video asset. | Map each project/highlight to real matching media or use still-image previews until footage exists. |
| P2 | Global | Performance | Build emits a large JS chunk warning around 1.6 MB and ships multiple large image/video assets. | Initial load and animation smoothness may suffer on mobile networks/devices. | Add route-level code splitting and audit media compression/lazy loading. |
| P3 | Global desktop | Interaction / accessibility | `CustomCursor` hides the native cursor globally on desktop and animates continuously with no reduced-motion handling. | Can reduce accessibility and make forms/interactions feel less predictable for some users. | Respect `prefers-reduced-motion`, keep native cursor for form fields, or make the custom cursor opt-in. |
| P3 | `/` / hero | Visual timing | Desktop headless capture initially showed a very dark hero frame with little visible video detail. | First paint may look empty or underwhelming before the video becomes clear. | Add a poster image or stronger fallback visual behind the video. |

## UI / Style Bugs

### P1 - Contact Page Contrast

Evidence: desktop and mobile screenshots show the heading, paragraph, contact details, and form panel blending into the background. The form is technically present, but it is too dark to be usable.

Suggested fix:
- Increase body text from `text-white/50` style levels to a more readable value.
- Make the form panel background/border visible enough against `#0a0a0a`.
- Re-test at `1440x900` and `390x844`.

### P1 - Mobile Hero Text Clipping

Evidence: the home mobile screenshot clips the headline horizontally. Similar symptoms appear on Show Builder mobile and weaker versions appear on Corporate/Weddings mobile.

Likely cause:
- Large uppercase display font plus global heading letter spacing.
- Some headings/animated spans are not constrained for mobile wrapping.

Suggested fix:
- Use smaller mobile heading sizes for display-font pages.
- Reduce mobile letter spacing.
- Add `break-words`, tighter max-widths, or avoid per-word inline animation where it prevents wrapping.

### P2 - Placeholder Secondary Pages

Routes affected:
- `/about`
- `/blog`
- `/partner-program`

Evidence: screenshots show simple placeholder content without the global Navbar/Footer. These pages do not match the polished sections on the rest of the site.

Suggested fix:
- Add Navbar/Footer wrappers.
- Build real page sections or temporarily remove these routes from navigation/footer until complete.

### P2 - 404 Page Is Off-Brand

Evidence: `/missing-route` renders a light gray/default UI card with debug-style copy: "Did you forget to add the page to the router?"

Suggested fix:
- Use the same dark Vertx visual system.
- Replace debug copy with visitor-friendly copy.
- Add links back to Home and Contact.

## Animation / Interaction Bugs

### P2 - Portfolio Media Reuse

Homepage portfolio hover previews use the same `/mp_.mp4` sample for multiple different project cards. This weakens the case-study illusion and makes the site feel less real once users interact with cards.

Suggested fix:
- Use real per-project video clips where available.
- If real clips are not ready, disable hover-video transition and keep strong stills.

### P3 - Custom Cursor Accessibility

The custom cursor globally hides the native cursor on desktop and runs an animation loop. It is visually thematic, but it should respect reduced-motion preferences and avoid interfering with text inputs/selects.

Suggested fix:
- Check `prefers-reduced-motion`.
- Keep native cursor on form controls.
- Consider disabling custom cursor below larger desktop breakpoints.

## Responsive / Mobile Bugs

### P1 - Home Mobile Hero

The homepage headline is cut off on the right side at `390x844`. This is a high-priority mobile bug because it affects the first viewport of the homepage.

### P2 - Show Builder Mobile Hero

The Show Builder heading and intro copy clip on the right edge at `390x844`. The 3D drone preview below still renders, but the text area needs mobile wrapping cleanup.

### P2 - Corporate and Weddings Mobile Heroes

The Corporate and Weddings pages are visually close, but mobile headings are constrained by the display font and spacing. They need a safer mobile heading style before launch.

## Build / Runtime Bugs

### Build Status

The production build succeeds with:

```powershell
$env:NODE_OPTIONS='--max-old-space-size=4096'; npm.cmd run build
```

The normal sandbox build fails with `spawn EPERM`, which is consistent with Windows/esbuild restrictions in this environment. The successful build still warns that some chunks are larger than 500 kB.

### Performance Risk

The generated JS bundle is approximately 1.6 MB before gzip, and the app includes several 900 KB to 1 MB images plus multi-MB videos. This is not a functional blocker, but it is a real mobile performance risk.

Suggested fix:
- Lazy-load heavy route sections.
- Split Three.js/show-builder code away from general routes.
- Compress and right-size images/videos.

## Forms / CTA Bugs

### P1 - Contact Form Does Not Submit Externally

The contact form prevents default submit and only shows a local success message. This should be treated as a production blocker unless the site is intentionally static/demo-only.

### P1 - WhatsApp Number Placeholder

The sticky WhatsApp button links to:

```text
https://wa.me/919999999999
```

This should be replaced before launch.

## Route-by-Route Notes

### `/`

- Desktop hero can appear nearly empty/dark while video detail is not yet visible.
- Mobile hero headline clips horizontally.
- Portfolio hover videos reuse the same sample asset.

### `/portfolio`

- Strong visual direction overall.
- Mobile first viewport is readable, but the display font is close to the safe edge.
- Verify modal/lightbox after media assets are finalized.

### `/corporate`

- Good page direction for high-budget clients.
- Mobile hero needs safer heading width and copy visibility.

### `/weddings`

- Strong imagery and mood.
- Mobile heading needs tighter responsive handling.

### `/simulator`

- Desktop hero and 3D drone render successfully.
- Mobile hero text clips at the right edge.
- Show Builder route should be performance-tested after the recent 3D formation detail increases.

### `/about`

- Placeholder page.
- Missing Navbar/Footer.
- Not production-ready.

### `/partner-program`

- Placeholder page.
- Missing Navbar/Footer.
- Not production-ready.

### `/blog`

- Placeholder page.
- Missing Navbar/Footer.
- Not production-ready.

### `/contact`

- Main content and form contrast are too low.
- Form does not submit externally.
- Needs highest attention before launch.

### Missing Route / 404

- Off-brand default style.
- Contains developer-facing copy.
- Needs branded 404 treatment.

## Recommended Fix Order

1. Fix Contact page contrast and wire the form to a real destination.
2. Replace the WhatsApp placeholder number.
3. Fix mobile heading clipping on Home and Show Builder.
4. Bring About, Blog, Partner Program, and 404 into the Vertx layout system.
5. Replace reused sample videos or disable misleading hover video previews.
6. Split/lazy-load heavy 3D/media routes to reduce bundle weight.

