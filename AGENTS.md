# AGENTS.md

## Project Overview

This project contains data and JavaScript gadgets for rendering match results
for Twyford & Ruscombe Cricket Club (TRCC). It is a legacy browser-oriented
codebase with XML scorecards, JavaScript data-entry tools, rendering gadgets,
and shared utility modules.

## Repository Layout

- `pch-gadgets/TRCC/data/fixtures/<year>/`: XML match scorecards.
- `pch-gadgets/TRCC/data/players/`: generated and maintained player statistics XML.
- `pch-gadgets/TRCC/gadgets/`: XML gadget definitions for rendered reports.
- `pch-gadgets/TRCC/objects/`: JavaScript domain objects and statistics renderers.
- `pch-gadgets/TRCC/utils/`: TRCC-specific JavaScript utilities.
- `pch-gadgets/TRCC/data/DataInput/`: browser data-entry pages and controls.
- `pch-gadgets/utils/`: shared gadget, URL-loading, XML, and general JavaScript utilities.
- `.github/skills/`: on-demand cricket scorecard analysis workflows.

## Data Conventions

- Fixture scorecards use XML elements such as `CricketMatch`, `Innings`,
  `Batsman`, `Runs`, and `BowlerSummary`.
- Use numeric `<Runs value="..."/>` values for batting totals and numeric
  `wickets` attributes on `BowlerSummary` for bowling totals.
- Preserve player names exactly as recorded unless the task explicitly asks to
  merge aliases, initials, or spelling variants.
- Treat generated statistics as derived data. Do not edit generated player
  files manually unless the task specifically requires it.
- When analyzing scorecards, report malformed or skipped XML instead of
  silently dropping it.

## Working Practices

- Keep changes narrowly scoped and preserve the existing JavaScript and XML
  style.
- Do not introduce a framework, package manager, or build system for small
  data or gadget changes.
- Prefer structured XML parsing for scorecard analysis over regular expressions.
- Do not modify repository files when using an analysis skill.
- Check the diff and run a focused data or syntax validation after edits.

## Validation

There is no repository-wide build or test command currently defined. For
scorecard changes, validate the affected XML or JavaScript files with the
available local tools and run a focused query against representative fixture
data. For report skills, confirm the requested limit, year scope, sorting, and
the number of malformed or skipped files are reported.

## Skills

The cricket analysis skills under `.github/skills/` support:

- top-x Twyford batting performances;
- top-x Twyford bowling performances;
- top-x aggregate run scorers; and
- top-x aggregate wicket takers.

Their aggregation rules should not be conflated: performance skills return
individual scorecard entries, while aggregate skills total values by the exact
recorded player name.