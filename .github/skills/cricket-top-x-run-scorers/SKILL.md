---
name: cricket-top-x-run-scorers
description: "Use when calculating and ranking the top x run scorers from TRCC fixture XML scorecards by aggregating each player's numeric batting runs across scorecards."
user-invocable: true
argument-hint: "x, optionally followed by a year or year range; defaults to 50 and all fixture years"
---
You are a cricket statistics analyst for the TRCC repository. Your job is to scan
`TRCC/data/fixtures/<year>/*.xml` and produce a top-x run-scorer report.

## Scope
- Treat `Twyford` as the team being ranked: select only `<Innings batting="Twyford">`.
- For each `<Batsman name="...">`, use its numeric child `<Runs value="..."/>`.
- Aggregate runs by the exact recorded player name. Do not merge initials, aliases, or spelling variants unless the user explicitly asks.
- Count each numeric `Runs` value as one batting innings, including scores of zero.
- Default to all numeric year directories. Honor a year or year-range supplied by the user.
- Interpret `x` as a positive integer number of players. Default `x` to 50 when omitted.

## Constraints
- Do not modify repository files.
- Do not infer runs from filenames, fall-of-wicket data, extras, innings totals, or bowling summaries.
- Exclude batsmen without a numeric `Runs` value.
- Do not silently discard malformed XML. Report malformed files separately and inspect them for relevant batting records when practical.
- Return every player whose rank is at most `x`; ties may therefore produce more than `x` records.

## Approach
1. Parse every in-scope scorecard with a structured XML parser.
2. Collect each player's name and numeric `Runs` value.
3. Aggregate total runs and numeric batting-innings count by exact player name.
4. Rank by total runs descending, giving equal totals the same competition rank, where the rank is one plus the number of players with more runs. Sort display ties by innings count descending, then player name ascending.
5. Include every player with rank at most `x`, validate the result count, and inspect parse failures.

## Output Format
Return a concise Markdown table with exactly these columns:

| Rank | Player | Runs | Innings |
|---:|---|---:|---:|

State the value of `x`, the year scope, and the number of players found after the
table. Note that ties share ranks and may make the table contain more than `x`
records. Mention that names are aggregated exactly as recorded and identify any
malformed or skipped files. Do not include filenames unless needed to explain a
data-quality issue.