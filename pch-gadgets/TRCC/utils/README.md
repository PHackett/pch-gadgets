# Result Converter

Converts Play-Cricket match results into TRCC's XML scorecard format.

## Requirements

- Python 3.10+ (no third-party packages required)

## Usage

Run the script from the `src` directory:

```bash
cd src
export PLAY_CRICKET_API_TOKEN='your-api-token'
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" json_source
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --match-id MATCH_ID [--save-json]
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --season SEASON [--team TEAM] [--save-json]
```

`--api-token` is required for every invocation. Set it in your shell rather
than saving the token in the repository. Exactly one of `json_source`,
`--match-id`, or `--season` must be given. `json_source` cannot be combined
with any other option.

The legacy PHP script also requires the token as its first command-line
argument: `php playCricket2TRCC.php "$PLAY_CRICKET_API_TOKEN"`.

### Convert a single match

```bash
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --match-id 1234567
```

The match id can be found in the Play-Cricket results URL, e.g.
`https://twyfordandruscombe.play-cricket.com/website/results/7251793` has match
id `7251793`.

To convert a previously saved JSON file offline (no API call is made):

```bash
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" ../PC_Results_1234567.json
```

### Convert every match in a season

```bash
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --season 2020
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --season 2020 --team "2nd XI"
```

- `--season` fetches every match for the club (site id `9302`) in that year.
- `--team` restricts the fetch to a single team name. If omitted, matches for
  `1st XI`, `2nd XI`, and `Friendly XI` are all converted. `--team` requires
  `--season`.
- Matches that fail to convert (e.g. no result entered yet, or an unrecognised
  dismissal type) are skipped with a message rather than stopping the whole run.

### Save the fetched JSON for offline testing

```bash
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --match-id 1234567 --save-json
python3 playCricket2TRCC.py --api-token "$PLAY_CRICKET_API_TOKEN" --season 2020 --save-json
```

Saves the raw API response to `../PC_Results_<match_id>.json`, which can later be
passed back in as `json_source` to replay the conversion without hitting the API.

## Output

Generated XML files are written to `output/<year>/<filename>.xml`, matching the
match's year (not the year the script was run).

## Console message colours

- Green: file successfully created.
- Yellow: match skipped (e.g. no result entered, or another recoverable issue).
- Red: match skipped due to a `ValueError` (e.g. an unrecognised `how_out` value
  that needs adding to `HOW_OUT_MAP`).
