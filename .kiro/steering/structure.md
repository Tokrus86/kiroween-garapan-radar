---
inclusion: always
---

# Structure — Garapan Radar

## Repository layout

```text
kiroween-garapan-radar/
├── index.html                  # App shell (scanner UI, verdict card, ledger)
├── styles.css                  # Dark "haunted" theme, mobile-first
├── app.js                      # Fetch + rule engine + ledger + report (no framework)
├── tests/
│   ├── score.test.js           # Unit tests for the rule engine (node:test)
│   └── score.property.test.js  # Property-based tests for the score function
├── mcp-server/
│   ├── server.js               # Local MCP server (stdio, zero deps): get_pair_info, get_token_security
│   └── README.md
├── .kiro/
│   ├── steering/               # product.md, tech.md, structure.md (this file)
│   ├── specs/garapan-radar/    # requirements.md → design.md → tasks.md
│   ├── hooks/                  # lint-on-save, test-on-save (JSON v1)
│   └── agents/
│       └── security-reviewer.md
├── docs/
│   └── demo-tokens.md          # Cached demo-token examples for offline judging
└── LICENSE                     # MIT
```

## File responsibilities

| File | Owns | Must never |
|---|---|---|
| `index.html` | Markup, labels, ARIA | Inline business logic, API URLs |
| `styles.css` | All visuals, theme, responsive rules | Colors hard-coded per component (use CSS vars) |
| `app.js` | API fetch, normalization, rule engine, ledger CRUD, report text | DOM access inside the pure score function |
| `tests/*.test.js` | Executable spec for the rule engine | Network calls (all fixtures are local) |
| `mcp-server/server.js` | Dev-time token data for the agent | Any secret, any write to the repo |

## Module boundaries inside `app.js`

1. `validateAddress(addr)` → normalized lowercase address or `null`.
2. `fetchTokenData(addr)` → `{ dex, goplus }` (either side may be `null`).
3. `scoreToken(data)` → pure `{ score, verdict, signals }`.
4. `renderResult(result)` → DOM only.
5. Ledger functions (`loadLedger`, `saveLedger`, `addTask`, ...) → localStorage only.
6. `buildReport(result)` → plain-text shareable report.

## Naming

- Specs live in `.kiro/specs/garapan-radar/` — one folder per feature, named
  after the feature, never after a person or a date.
- Test files mirror the module they test: `score.test.js` tests the score
  function in `app.js`.
- The `/.kiro` folder is **never** added to `.gitignore` (Kiroween rule).

## Workflow (Kiro spec-driven)

1. `requirements.md` — user stories + acceptance criteria (this spec).
2. `design.md` — architecture, data flow, error handling, test strategy.
3. `tasks.md` — discrete tasks with dependencies, executed in waves.
4. Hooks enforce `lint` + `test` on save; a task is done only when its tests
   pass and the demo flow works in a clean browser.
