#!/usr/bin/env python3
"""Convert a Play-Cricket match result into TRCC's XML format.

Python port of playCricket2TRCC.php.
"""

import json
import os
import re
import urllib.parse
import urllib.request
from datetime import datetime
from xml.dom.minidom import Document

from zoneinfo import ZoneInfo

# Constants
SITE_ID = 9302
PLAY_CRICKET_RESULT_URL = (
    'https://www.play-cricket.com/api/v2/match_detail.json?api_token=%s&match_id=%s'
)
MATCHES_URL = 'https://www.play-cricket.com/api/v2/matches.json'
TRCC_PC_NAME = 'Twyford and Ruscombe CC'
TRCC_NAME = 'Twyford'
DEFAULT_TEAM_NAMES = ['1st XI', '2nd XI', 'Friendly XI']
IN_PROGRESS_RESULT = 'M'

COLOUR_YELLOW = '\033[93m'
COLOUR_GREEN = '\033[92m'
COLOUR_RED = '\033[91m'
COLOUR_RESET = '\033[0m'

TZ = ZoneInfo('Europe/London')

NO_WIN_RESULTS = {'D': 'Draw', 'C': 'Cancelled', 'A': 'Abandonned', 'T': 'Tie'}

HOW_OUT_MAP = {
    'lbw': 'LBW',
    'ct': 'Caught',
    'no': 'Not Out',
    'not out': 'Not Out',
    'retired not out': 'Not Not Out',
    'retired out': 'Retired Out',
    'b': 'Bowled',
    'did not bat': 'Did Not Bat',
    'ro': 'Run Out',
    'run out': 'Run Out',
    'st': 'Stumped',
    'hit wicket': 'Hit Wicket',
    'timed out': 'Timed Out',
    'absent': 'Absent'
}


def format_datetime(dt):
    # e.g. Mon Sep 28 2026 10:07:43 +01:00 (BST)
    offset = dt.strftime('%z')
    offset = offset[:3] + ':' + offset[3:]
    tzname = dt.tzname()
    return dt.strftime(f'%a %b %d %Y %H:%M:%S') + f' {offset} ({tzname})'


def clean_name(name):
    name = name.rstrip(' CC')
    name = name.replace(' & ', ' and ')
    name = name.replace('&', 'and')
    name = name.replace('/', '_')
    name = name.replace(',', '_')
    name = name.replace('__', '_')
    return name


def remove_duplicate_words(name):
    words = []
    seen_words = set()
    for word in name.split():
        normalized_word = word.casefold()
        if normalized_word not in seen_words:
            words.append(word)
            seen_words.add(normalized_word)
    return ' '.join(words)


def clean_filename_part(text):
    text = text.replace(' & ', ' and ')
    text = text.replace('&', 'and')
    text = text.replace(' ', '_')
    text = text.replace('/', '_')
    return text


def ordinal_day(day):
    if 11 <= day % 100 <= 13:
        suffix = 'th'
    else:
        suffix = {1: 'st', 2: 'nd', 3: 'rd'}.get(day % 10, 'th')
    return f'{day}{suffix}'


def strip_html(text):
    text = re.sub(r'<[^>]+>', '', text)
    text = text.replace('&nbsp;', ' ').replace('&amp;', '&')
    return re.sub(r'\s+', ' ', text).strip()


def fetch_json(url, params, api_token):
    query = urllib.parse.urlencode({**params, 'api_token': api_token})
    with urllib.request.urlopen(f'{url}?{query}') as response:
        return json.load(response)


def get_season_matches(season, team_names, api_token):
    """Fetch matches for a season via the Match Summary API, filtered to our team names.

    The Teams API (used to resolve team names to ids) returns 401 Unauthorized
    for this API token, so team names/ids are taken directly from the club's
    own match summary entries instead of a separate Teams API lookup.
    """
    params = {'site_id': SITE_ID, 'season': season}
    matches = fetch_json(MATCHES_URL, params, api_token)['matches']

    filtered = []
    for match in matches:
        our_team_name = (
            match['home_team_name']
            if str(match['home_club_id']) == str(SITE_ID)
            else match['away_team_name']
        )
        if our_team_name in team_names:
            filtered.append(match)

    return filtered


def convert_season(season, api_token, team_names=None, save_json=False):
    team_names = team_names or DEFAULT_TEAM_NAMES
    matches = get_season_matches(season, team_names, api_token)

    for match in matches:
        try:
            convert(match['id'], api_token=api_token, save_json=save_json)
        except ValueError as exc:
            print(f"{COLOUR_RED}Skipping match {match['id']}: {exc}{COLOUR_RESET}")
        except Exception as exc:
            # Fixtures without a result yet (or other bad data) shouldn't stop the batch
            print(f"{COLOUR_YELLOW}Skipping match {match['id']}: {exc}{COLOUR_RESET}")


def convert(match_id, api_token, json_source=None, save_json=False):
    if json_source is not None:
        with open(json_source, encoding='utf-8') as f:
            obj = json.load(f)
    else:
        url = PLAY_CRICKET_RESULT_URL % (api_token, match_id)
        with urllib.request.urlopen(url) as response:
            raw_json = response.read()
        obj = json.loads(raw_json)

        if save_json:
            # Save the fetched JSON so it can be replayed offline for testing
            with open(f'../PC_Results_{match_id}.json', 'wb') as f:
                f.write(raw_json)

    match = obj['match_details'][0]

    # Work out if TRCC are Home team or Away team
    home_or_away = 'Home' if match['home_club_name'] == TRCC_PC_NAME else 'Away'

    if home_or_away == 'Home':
        oppo = clean_name(match['away_club_name'])
        oppo = f"{oppo} {match['away_team_name']}"
        trcc_id = match['home_team_id']
        oppo_id = match['away_team_id']
    else:
        oppo = clean_name(match['home_club_name'])
        oppo = f"{oppo} {match['home_team_name']}"
        trcc_id = match['away_team_id']
        oppo_id = match['home_team_id']

    oppo = remove_duplicate_words(oppo)

    # Get match date
    match_time = match['match_time'] or '13:00'
    match_date = datetime.strptime(
        f"{match['match_date']} {match_time}", '%d/%m/%Y %H:%M'
    ).replace(tzinfo=TZ)

    if match['result'] == IN_PROGRESS_RESULT:
        message = 'Match in progress'
    elif not match['result']:
        message = 'No result entered'
    else:
        message = None

    if message:
        print(f"{COLOUR_YELLOW}{message} for match {match['id']}: "
              f"{oppo} on {match_date.strftime('%d/%m/%Y')}{COLOUR_RESET}")
        return

    # Create TRCC XML document
    dom = Document()

    month_name = match_date.strftime('%B')
    day_str = ordinal_day(match_date.day)
    xml_file_name = f'{month_name}_{day_str}_{oppo}.xml'.lower()
    xml_file_name = clean_filename_part(xml_file_name)

    # Add required comments
    current_date_time = datetime.now(TZ)

    dom.appendChild(
        dom.createComment(f'Generated on {format_datetime(current_date_time)}')
    )

    # Result
    result = match['result']

    if result in NO_WIN_RESULTS:
        trcc_result = NO_WIN_RESULTS[result]
        if result == 'C' and match['match_notes']:
            trcc_result = f"{trcc_result}: {strip_html(match['match_notes'])}"
    else:
        if match['result_applied_to'] == trcc_id:
            if result == 'W':
                trcc_result = 'Win'
            elif result == 'L':
                trcc_result = 'Lose'
            elif result == 'CON':
                trcc_result = f'{oppo} Conceded'
            else:
                raise ValueError(f'Unrecognised result code: {result!r}')
        else:
            if result == 'W':
                trcc_result = 'Lose'
            elif result == 'L':
                trcc_result = 'Win'
            elif result == 'CON':
                trcc_result = 'Twyford Conceded'
            else:
                raise ValueError(f'Unrecognised result code: {result!r}')

    dom.appendChild(dom.createComment(f'Result = {trcc_result}'))

    dom.appendChild(
        dom.createComment(
            f"XMLFilename = {match_date.strftime('%Y')}/{xml_file_name}"
        )
    )

    root = dom.createElement('CricketMatch')
    root.setAttribute('oppo', oppo)
    root.setAttribute('date', format_datetime(match_date))
    root.setAttribute('matchType', match['competition_type'])

    if home_or_away == 'Home':
        root.setAttribute('team', match['home_team_name'])
    else:
        root.setAttribute('team', match['away_team_name'])

    root.setAttribute('playCricketId', str(match['id']))

    root.appendChild(dom.createElement('MatchReport'))
    root.appendChild(dom.createElement('CountsToStats'))

    # Add innings actually present (cancelled/abandoned matches have none)
    for innings in match['innings']:
        innings_node = dom.createElement('Innings')

        # Find out who is batting in this innings
        batting_team = TRCC_NAME if innings['team_batting_id'] == trcc_id else oppo
        innings_node.setAttribute('batting', batting_team)

        if batting_team == TRCC_NAME:
            home_or_away_players = home_or_away
        else:
            home_or_away_players = 'Away' if home_or_away == 'Home' else 'Home'

        # Add each batsman
        for bat in innings['bat']:
            batsman_node = dom.createElement('Batsman')
            batsman_node.setAttribute('name', bat['batsman_name'])

            team_index = 0 if home_or_away_players == 'Home' else 1
            players = obj['match_details'][0]['players'][team_index][
                f'{home_or_away_players.lower()}_team'
            ]

            for player in players:
                if player['player_id'] == bat['batsman_id']:
                    if player['captain']:
                        batsman_node.setAttribute('captain', '1')
                    if player['wicket_keeper']:
                        batsman_node.setAttribute('keeper', '1')

            how_out_node = dom.createElement('HowOut')
            how_out_key = bat['how_out']

            if how_out_key not in HOW_OUT_MAP:
                raise ValueError(f'Unknown value for howOut: [{how_out_key}]')

            how_out = HOW_OUT_MAP[how_out_key]
            if how_out_key in ('ct', 'ro', 'run out', 'st'):
                fielder_name = bat['fielder_name']
                if fielder_name:
                    how_out = f'{how_out} {fielder_name}'

            how_out_node.setAttribute('how', how_out)
            batsman_node.appendChild(how_out_node)

            if bat['bowler_name']:
                bowler_node = dom.createElement('Bowler')
                bowler_node.setAttribute('name', bat['bowler_name'])
                batsman_node.appendChild(bowler_node)

            runs_node = dom.createElement('Runs')
            runs_node.setAttribute('value', bat['runs'] if bat['runs'] != '' else '0')
            batsman_node.appendChild(runs_node)

            innings_node.appendChild(batsman_node)

        # Add Extras
        extras_node = dom.createElement('Extras')
        extras_node.setAttribute('value', innings['total_extras'])
        innings_node.appendChild(extras_node)

        # Add Fall of Wickets
        for fow in innings['fow']:
            fall_of_wicket_node = dom.createElement('FallOfWicket')

            batsman_pos = None
            for bat in innings['bat']:
                if fow['batsman_out_id'] == bat['batsman_id']:
                    batsman_pos = bat['position']
                    break

            fall_of_wicket_node.setAttribute('batsman', batsman_pos)
            fall_of_wicket_node.setAttribute('score', fow['runs'])

            innings_node.appendChild(fall_of_wicket_node)

        # Add Bowling Summary
        for bowl in innings['bowl']:
            bowler_summary_node = dom.createElement('BowlerSummary')
            bowler_summary_node.setAttribute('name', bowl['bowler_name'])
            bowler_summary_node.setAttribute('overs', bowl['overs'])
            bowler_summary_node.setAttribute('maidens', bowl['maidens'])
            bowler_summary_node.setAttribute('runs', bowl['runs'])
            bowler_summary_node.setAttribute('wickets', bowl['wickets'])

            innings_node.appendChild(bowler_summary_node)

        root.appendChild(innings_node)

    dom.appendChild(root)

    output_dir = f"../data/fixtures/{match_date.strftime('%Y')}"
    os.makedirs(output_dir, exist_ok=True)
    output_path = f'{output_dir}/{xml_file_name}'
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(dom.toprettyxml(indent='  ', encoding='utf-8').decode('utf-8'))

    print(f"{COLOUR_GREEN}{match_date.strftime('%Y')}/{xml_file_name} has been successfully created{COLOUR_RESET}")


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser()
    parser.add_argument('--api-token', required=True,
                         help='Play-Cricket API token')
    parser.add_argument('json_source', nargs='?', default=None,
                         help='local match JSON file to convert offline '
                              '(cannot be combined with any other option)')
    parser.add_argument('--match-id', type=int,
                         help='fetch and convert a single match by id')
    parser.add_argument('--season',
                         help='fetch and convert every match for this season (year), e.g. 2020')
    parser.add_argument('--team',
                         help='restrict --season fetch to this team name '
                              '(default: 1st XI, 2nd XI, Friendly XI)')
    parser.add_argument('--save-json', action='store_true',
                         help='save the JSON fetched from the API for later offline testing')
    args = parser.parse_args()

    other_options_used = args.match_id or args.season or args.team or args.save_json
    if args.json_source and other_options_used:
        parser.error('json_source cannot be combined with --match-id, --season, --team or --save-json')

    if args.match_id and args.season:
        parser.error('--match-id and --season cannot be used together')

    if args.team and not args.season:
        parser.error('--team requires --season')

    if args.season:
        team_names = [args.team] if args.team else None
        convert_season(args.season, args.api_token, team_names=team_names,
                       save_json=args.save_json)
    elif args.match_id:
        convert(args.match_id, args.api_token, save_json=args.save_json)
    elif args.json_source:
        convert(None, args.api_token, json_source=args.json_source)
    else:
        parser.error('specify json_source, --match-id, or --season')
