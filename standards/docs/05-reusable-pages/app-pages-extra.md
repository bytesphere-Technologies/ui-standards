# Interactive app pages

Four working pages that most business apps need. Showcase group "App pages".

| Page | Route | Interactions | Mobile behaviour |
|---|---|---|---|
| Calendar | `calendar` | Select a day, add an event (modal), switch Month and Agenda, Today | Dots instead of event chips; day list below the grid |
| Files | `files` | Search, list or grid, multi-select, bulk download and delete with message, upload dropzone | Size and date move under the name; grid becomes two columns |
| Team directory | `team` | Search, department filter, star favorites, profile modal | One column of cards; filter bar scrolls horizontally |
| Tasks | `tasks` | Add, complete, reorder, delete with Undo, Open/Done/All tabs | Reorder buttons and priority hide; title wraps fully |

## Rules

1. Each has a designed empty state that echoes the filter or search.
2. Destructive actions on collections use toast Undo rather than confirm (see `01-foundations/interaction.md`).
3. Bulk actions appear only when something is selected, with the count.
4. Date cells and numeric columns use tabular figures.
5. A calendar day always shows its event count to assistive tech (`aria-label="18 March, 3 events"`).
