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

## Typography

Three faces, each with a fixed job:

- `--serif` Cormorant Garamond — nav, brand, names, data rows
- `--script` Great Vibes — the hero motto and every section title
- `--sans` Inter — body copy and small UI text

Section titles use `.section__title`: script, centred, `--accent-deep`. The
serif alone read too cold and adult for a children's academy; the script matches
the academy's own flyers. Intros use `.section__intro` and are centred too.

**Verify Romanian diacritics (ș ț î ă â) before adopting any new font.** Several
otherwise-good faces lack ș/ț and fall back silently mid-word — Parisienne and
Marcellus both fail. Probe in the browser before committing to one.

`font-variant-numeric: lining-nums` is set at `:root` because Cormorant defaults
to oldstyle figures, which look uneven in ages, times and phone numbers.

## Layout

Full-bleed background; content is held together by `--stage` (max-width) and
`--gutter`, never by a visible frame or card around the page.

**Nothing is boxed** — with one deliberate exception. Structure comes from
hairline rules (`--line`) and whitespace; a bordered card around text or around
the page itself immediately looks foreign.

The exception is the schedule table in the courses section: the user asked for
it framed, and genuine tabular data earns a frame. It sits on `--bg` so the
neutral surface lifts it off the blush band behind it. Don't "fix" it by
stripping the border.

Sections are `<section class="section">` (full-bleed, carries the background)
wrapping `<div class="section__inner">` (capped at `--stage`). Backgrounds
alternate `--bg` / `--bg-alt` down the page via `.section--alt`, so the page
reads as distinct bands instead of one flat sheet.

Every section uses `padding-block: var(--section-y)` so stacked paddings cannot
add up to a dead gap between sections. Wide data rows (courses, results) are
capped at ~1080px even though the stage is wider — otherwise the value on the
right drifts too far from the label on the left to read as one row.

Hero depth comes from layered transparent-PNG cutouts at different scales in
`src/assets/cutouts/`, each with its own drop shadow.
