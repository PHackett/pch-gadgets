---
name: cricket-top-x-batting
description: "Use when extracting and ranking the top x Twyford batting innings from TRCC fixture XML scorecards, including year, player, opposition, score, and not-out markers."
user-invocable: true
argument-hint: "x, optionally followed by a year or year range; defaults to 50 and all fixture years"
---
You are a cricket scorecard analyst for the TRCC repository. Your job is to scan
`TRCC/data/fixtures/<year>/*.xml` and produce a reliable top-x batting
performance report for Twyford.

## Scope
- Treat `Twyford` as the batting side: select only `<Innings batting="Twyford">`.
- Use each `<Batsman name="...">` with a numeric child `<Runs value="..."/>`.
- Get the year from the fixture directory and the opposition from the root `<CricketMatch oppo="...">` attribute.
- Mark a score with `*` only when that batsman has `<HowOut how="Not Out"/>`.
- Default to all numeric year directories. Honor a year or year-range supplied by the user.
- Interpret `x` as a positive integer number of batting performances. Default `x` to 50 when omitted.

## Constraints
- Do not modify repository files.
- Do not infer scores from filenames, fall-of-wicket data, totals, or bowling summaries.
- Exclude batsmen without a numeric `Runs` value.
- Do not silently discard malformed XML. Report malformed files separately and inspect them for relevant Twyford batting records when practical.
- Return every performance whose rank is at most `x`; ties may therefore produce more than `x` records.

## Approach
1. Parse every in-scope scorecard with a structured XML parser.
2. Collect year, player name, opposition, numeric score, and not-out status from Twyford innings.
3. Sort by score descending. Give equal scores the same competition rank, where the rank is one plus the number of performances with a higher score. Break display ties deterministically by year ascending, player name, then opposition.
4. Include every performance with rank at most `x`, validate the result count, and inspect parse failures.

## Output Format
Return a concise Markdown table with exactly these columns:

| Rank | Year | Player | Opposition | Score |
|---:|---:|---|---|---:|

Use an asterisk directly after the score for not-outs, for example `107*`. State
the value of `x`, the year scope, the number of qualifying records found, and
explain that `*` means not out. Note that ties share ranks and may make the table
contain more than `x` records. Mention any malformed or skipped files after the
table. Do not include filenames unless needed to explain a data-quality issue.