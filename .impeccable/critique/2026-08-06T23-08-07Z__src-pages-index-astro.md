---
target: src/pages/index.astro
total_score: 25
max_score: 32
na_heuristics: 7,10
p0_count: 2
p1_count: 1
timestamp: 2026-08-06T23-08-07Z
slug: src-pages-index-astro
---
# Critique — Legion Lunari (home + quiz)

Method: dual-agent (A: design review · B: detector + evidence)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Quiz progress excellent, but fill bar is off-by-one (`scaleX(step/length)`) |
| 2 | Match System / Real World | 4 | On-theme, in-audience Spanish + LoL slang; metaphors map cleanly |
| 3 | User Control and Freedom | 3 | Back/retry present; no skip for 265svh hero or 600svh reveal scroll-jack |
| 4 | Consistency and Standards | 3 | Strong tokens; dead `.quiz-result` CSS parallels live `.reveal__*`; unrendered pillar phase glyphs |
| 5 | Error Prevention | 3 | Ko-fi `href="#"` ships; nav `display:nonenav__brand` invalid value |
| 6 | Recognition Rather Than Recall | 4 | Options always visible; selection persists on back-nav |
| 7 | Flexibility and Efficiency | n/a | Persuade + linear ritual; no power-user path expected |
| 8 | Aesthetic and Minimalist Design | 3 | Beautiful palette; homepage "minimalism" is accidental (filler); `?tune` panel ships to prod |
| 9 | Error Recovery | 2 | Model-load failure degrades to text; no fallback if scroll range is zero or 3D fails silently |
| 10 | Help and Documentation | n/a | Self-explanatory landing + quiz |
| **Total** | | **25/32 (78%)** | **Good** |

Applicable max 32 (H7, H10 n/a). Blended score: quiz alone ~88%; homepage alone would fall to Poor on H1/H5/H8.

## Design Specificity Verdict

**LLM assessment — split personality.** The homepage *chassis* is bespoke (Three.js Mount Targon descent, Vanta fog behind the title, scroll-staged captions, a disciplined token system, custom "Lunari Display" brand face, moon-phase eyebrow glyphs, film grain) — but the *content it frames is entirely Lorem ipsum*, which is the most category-interchangeable thing a page can contain. Shell = authored (9/10); surface = placeholder (3/10). The **quiz**, by contrast, is strongly authored for this product and unswappable: 13 LoL-specific questions, 4 Titaness houses (Febe/Rea/Dione/Jano) with epithet + lema + 3-paragraph mythology + color token, a 3D ascent synced per question, and a scroll-narrated reveal that re-tints the whole scene to the winning house. The finished experience (quiz) is buried behind the placeholder one (home).

**Deterministic scan.** Detector exit code 2 — one finding: `layout-transition` at `SiteNav.astro:100` (`.nav__link::after` animates `width` on hover). Evidence sweep confirmed: the broken value `display: nonenav__brand` at `SiteNav.astro:148` (mobile nav-hide silently fails); 11 Lorem-ipsum copy locations in `index.astro`; 1 TODO (Ko-fi `href="#"`, `SocialBubble.astro:8-9`); 5 always-on `will-change` base rules (`global.css:197`, `index.astro:278`, `quiz:890`, `Aurora:35`, `TargonClimb:72`); ~11 themeable hard-coded colors in CSS (mostly `rgba()` shadows); 2 sub-44px interactive targets (`.nav__toggle` 42×42; `.tune__nav` 34×34, debug-only); **Vanta FOG in the quiz is NOT gated behind reduced-motion** (only a `?tune` debug flag).

**Visual overlays.** Browser visualization not performed this run (no live server); fallback = static detector scan only.

**Where A and B agree:** the nav `display` bug, the Ko-fi dead link, and the Lorem-ipsum vacuum surface in both the human review and the deterministic sweep — high-confidence findings. **B caught what A didn't:** the quiz Vanta fog missing its reduced-motion guard (a real a11y gap A credited as fully handled), and the always-on `will-change` rules. **No false positives** in the detector's single finding, though the underline width transition is low-impact (tiny element).

## Overall Impression

Two products in one repo. The quiz is emotionally well-structured and nearly ship-quality; the homepage is a world-class shell around placeholder content, fronting an empty About page and a dead support link. On a Persuade surface that inverts the ideal — the product opens weak and peaks late.

## What's Working

1. **A bespoke, coherent design system.** Semantic token layer over a named palette, fluid type, `color-mix` glow recipes, moon-phase glyphs, custom brand face — one authored world, the reason even the filler homepage looks premium.
2. **The quiz's identity payoff.** Content + scoring + 3D ascent + color-propagating reveal converge on a personalized, belonging-driven CTA ("Unirme a mi casa en Discord"). Peak-end rule done right.
3. **Conscientious motion/perf.** `prefers-reduced-motion` respected in most places, Targon renderer sleeps off-screen and at rest, lazy Three import, graceful load-failure text.

## Priority Issues

**[P0] Homepage ships entirely on Lorem ipsum.** Every heading, pillar, and CTA on `index.astro` is filler. A Persuade surface whose one job is to earn the join earns nothing; the beautiful shell raises expectations the content fails. Fix: real in-voice copy (the footer proves the voice exists). → `/impeccable clarify`

**[P0] "Nosotras" (`/about`) is an empty, `aria-hidden` void.** Linked from nav *and* footer; a screen reader is told there's nothing. For a community selling belonging, an empty "who we are" is the sharpest brand contradiction — and the trust page this cautious audience most needs. Fix: build it (staff, story, safety/moderation) or remove the links until it exists. → `/impeccable onboard`

**[P1] Dead/placeholder outbound actions ship live.** Ko-fi bubble `href="#"` (persistent support CTA that does nothing on every page) + `SiteNav.astro:148` `display: nonenav__brand` (invalid value → desktop links/CTA not hidden ≤820px, colliding with hamburger). Both one-line fixes, outsized impact. → `/impeccable harden` (+ `/impeccable adapt` for the nav)

**[P2] Un-skippable scroll-jacking.** Hero `.is-journey` = 265svh, reveal = 600svh, both scroll-driven with no bypass. Magic for the enchanted, a toll for the distracted/mobile user; delays the home CTA ~2.6 screens. Fix: add skip affordances, shorten the hero. → `/impeccable optimize`

**[P2] Quiz Vanta fog ignores reduced-motion.** `quiz-de-casas.astro:372` gates only on the `?tune` debug flag; motion-sensitive users get full animation. Inconsistent with the home hero fog. Fix: reuse the `reduced` check. → `/impeccable animate`

**[P3] Low-affordance quiz options + off-by-one progress.** Options are bare text that only glow on hover (no touch-visible affordance); progress bar lags one step. Fix: resting affordance + consistent progress math. → `/impeccable polish`

## Persona Red Flags

**Jordan (first-timer, lands on home cold):** scrolls into 3 sections of Lorem ipsum and can't learn what the community offers (`.intro__title`, three `.pilar` cards, `.comunidad`, `.cta-final__title`); clicks "Nosotras" to vet → empty page; reaches "Consectetur adipiscing elit?" above the join button — asked to commit having been told nothing.

**Casey (distracted mobile):** hits the nav CSS bug (desktop links may collide with hamburger ≤820px); faces 265svh + 600svh of scroll-jack with a heavy Three.js/Vanta payload; quiz options have no touch-visible affordance so may not read as tappable.

**Sam (a11y / SR / keyboard / reduced-motion):** reduced-motion is genuinely well-served (credit) — but in static/reduced mode the two middle narrative captions (`[data-narr]`) are `display:none`, so SR users **lose those beats**; `/about` is `aria-hidden` empty (announced as nothing); the reveal is `scrollY`-driven with no keyboard/skip control, risking the final "Unirme a mi casa" CTA being unreachable without mouse scroll; Ko-fi `#` sends focus to top with no feedback.

## Minor Observations

- The dev `?tune` panel + editor logic (~150 lines JS + `.tune` CSS) ship in the production quiz bundle — gate it out of prod.
- Two parallel result-styling systems: `.quiz-result__*` (styled, ~716–796) appears dead vs the live `.reveal__*`. Delete one.
- Pillar `phase` moon glyphs (`🌒🌓🌔`) are in the data but never rendered — rendering them would restore pillar hierarchy for free.
- Reveal is hardcoded `600svh /* 6 pasos */`; confirm it matches `revealPoses.length`.
- Footer tagline ("Un refugio nocturno para invocadoras. Honestas, unidas, brillantes.") is real, on-voice — proof the home copy vacuum is a completion gap, not a capability gap.

## Questions to Consider

1. Why does the finished product (quiz) hide behind the unfinished one (home)? Should the hero's primary CTA be "Descubre tu casa" rather than the cold "Unirse al Discord"?
2. Can someone decide to join a women's-only community from a site whose About page is empty? What's the minimum trust content (moderation, safety, who runs it)?
3. Is 865svh of combined scroll-jack a moat or a wall? Where's the skip door?
4. Is the beauty of the shell masking how much persuasive substance is still missing?
