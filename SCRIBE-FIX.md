# Scribe Data Format Fix

## Issue Identified
The Mission Control UI was showing "No active missions" and "No agent status data" because Scribe's EXECUTION-BOARD.md file did not match the format expected by the parser in `~/workspaces/mission-control/src/app/api/scribe/route.ts`.

## Parser Expectations
The API parser was looking for specific section headers and table formats in EXECUTION-BOARD.md:
1. `## Active Missions` - table format with columns: Mission, Owner, Status, Last Update, Blockers
2. `## Agent Status` - table format with columns: Agent, Current Task, Status, Last Signal  
3. `## Parked` - table format with: Item, Waiting For, Since
4. `## Ideas Queue` - bullet list format with dates: `- [YYYY-MM-DD] ...`

## Changes Made to EXECUTION-BOARD.md

1. **Agent Status Section**: Already properly formatted with `## Agent Status` heading and correct table columns

2. **Active Missions Section**: Changed from `## Section 2 — Active Projects` to `## Active Missions` and converted the project cards to the expected table format:
   - Converted project sections to a table with Mission, Owner, Status, Last Update, Blockers columns

3. **Ideas Queue Section**: Changed from `## Section 4 — Ideas Queue` to `## Ideas Queue` and converted from a table format to bullet list format with dates: `- [YYYY-MM-DD] ...`

4. **Parked Section**: Changed from `## Parked — Waiting on Pil` to `## Parked` and adjusted table column from "Waiting for" to "Waiting For" to match parser expectations

## Result
The Scribe parsing format now matches what the UI API endpoint expects, enabling it to properly display mission and agent status data on the Mission Control dashboard.

## Additional Data Considerations
- MEMORY.md and daily log files in the memory directory were already structured appropriately for the parser
- No parser code changes were necessary, as I chose to update the source data format to match the parser expectations