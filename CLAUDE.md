# Alice Tudurii Ballet Academy — website

React 19 + TypeScript + Vite. Source lives in `scoala_balet_alice/`.

## Content rules

**No eyebrow/kicker labels above headings.** Do not add small tracked-caps labels
that just restate the section, e.g.:

```jsx
<p className="courses__label">Cursuri</p>   // don't
```

They add nothing the heading doesn't already say.

**No filler copy.** Write only what the section actually needs.

**Each section carries only its own content.** Don't leak one section's material
into another. Both of these were caught and removed:

- introducing the teachers inside the courses section
- a phone number and an enrolment note at the foot of the courses section

Contact details belong in the contact section, and nowhere else. When adding or
rewriting a section, re-read what is already in it and delete anything that
belongs elsewhere — don't just append.

**Use the client's own words.** Course names, schedules and descriptions come
from Alice's Instagram posts (@tuduriialiceballet). Don't invent marketing copy
or business facts (prices, availability, class details). If something is needed
and no source text exists, flag it rather than making it up.

Copy is Romanian. Keep the warm, friendly tone of the academy's own posts.

## Design direction

On 2026-11-09 the user restyled the site after https://essenceacademy.ro/
("take what's most beautiful from it and adapt it for ballet"): bright and
airy, bold modern sans headings, soft rounded cards, a watercolour bloom in the
hero. Content stayed exactly as it was — the redesign is visual only.

## Typography

Two faces:

- `--sans` Poppins — everything: headings (600–700), body (300), UI
- `--script` Great Vibes — accents only: the hero motto and "Ballet Academy"
  under the name in the header and footer

Section titles use `.section__title`: bold sans, centred, with a short rose
rule underneath (`::after`). `.section__title--left` aligns title and rule
left, used where a title sits beside a photo. Intros use `.section__intro`.

**No tiny tracked caps.** Don't style text as small, wide-letter-spaced
uppercase (e.g. `font-size: 10px; letter-spacing: 0.26em; text-transform:
uppercase`). The user dislikes it — the reference site's tracked-caps eyebrows
and button labels were deliberately not copied. Small labels are normal-case
sans, in `--muted` or `--accent-deep`.

**Verify Romanian diacritics (ș ț î ă â) before adopting any new font.** Several
otherwise-good faces lack ș/ț and fall back silently mid-word — Parisienne and
Marcellus both fail. Poppins and Great Vibes pass. Probe in the browser before
committing to one.

## Layout

Full-bleed section backgrounds; content is held to `--stage` (max-width) by
`--gutter`. Sections are `<section class="section">` (full-bleed, carries the
background) wrapping `<div class="section__inner">`. Backgrounds go white
(`--bg`) / blush (`--bg-alt`, `.section--alt`) down the page, with one dark
`--velvet` band (`.section--velvet`) on the results section, plus the footer.
Keep it to that one band.

Every section uses `padding-block: var(--section-y)`.

**Palette:** white, blush, and rose/velvet. `--accent` (rose) and
`--accent-deep` for marks, numerals and highlights; `--tint` (pale rose) for
pills, the timetable header row and icon discs. The hero watercolour also
uses lilac and peach, but only inside the bloom. Don't add new hues elsewhere.

**Shapes:** soft rounded cards (`--radius`) with a rose-tinted shadow
(`rgba(var(--shadow), …)`), never hard borders. Feature photos use the "leaf"
corner (`--leaf`: two opposite corners rounded, two square). The one button
style is `.button`, a rose gradient pill with a soft glow.

**Header** (`Header.tsx`) is sticky: transparent over the hero, white blur once
scrolled. Contact is the pill on the right rather than an inline link. Phones
get a burger and a full-screen menu.

**Hero:** name + motto + button on the left; on the right an SVG watercolour
bloom (feTurbulence displacement, edge-darkened) with the two transparent-PNG
cutouts from `src/assets/cutouts/` layered over it at different scales, each
with its own drop shadow.

**Courses:** the schedule is a weekly timetable (days across, start times
down) of white tiles on the blush band, classes as age pills. No ruled lines.
Phones get a list by day instead.

**Results:** one pale-rose card per placement on the velvet band.

**Gallery:** a single-row carousel of rounded portrait photos, alternate ones
staggered lower, no title. A multi-row collage made the page feel crowded and
its heading added nothing.

Scroll-in motion uses `.reveal` (CSS scroll-driven animation, so elements
below the fold start hidden; disable it when taking full-page screenshots).
