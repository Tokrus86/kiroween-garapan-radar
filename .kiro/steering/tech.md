---
inclusion: always
---

# Tech — Garapan Radar

## Stack

- **Static site, no framework, no bundler, no build step.** `index.html` +
  `styles.css` + `app.js`. Runs anywhere a browser runs; deploy is GitHub
  Pages (free).
- **Language:** vanilla JavaScript (ES2020+), semantic HTML, CSS custom
  properties. No dependencies at runtime.
- **Tests:** Node.js stdlib only (`node:test` + `node:assert`). No test
  framework dependency.
- **MCP server (dev-time only):** Node.js stdio, zero external dependencies,
  in `mcp-server/`. Wraps the same two public APIs so a Kiro agent can query
  token data during development. Never shipped to the browser.

## External APIs (public, keyless, CORS-open — verified live 20 Nov 2026)

| API | Endpoint | Use |
|---|---|---|
| DexScreener | `GET https://api.dexscreener.com/latest/dex/tokens/<address>` | Pairs, price USD, liquidity, volume, txns, pair age |
| GoPlus Token Security | `GET https://api.gopluslabs.io/api/v1/token_security/56?contract_addresses=<address>` | Honeypot, buy/sell tax, owner, mintable, proxy, holders |

Rules for calling them:

- **Parallel fetch** with a single timeout (10 s) and an `AbortController`.
- **Never send a secret.** There are no keys. If an API ever needs one, the
  feature is out of scope.
- **Cache in `sessionStorage`** keyed by lowercase contract address, TTL 5 min,
  so re-scans and judge re-tests do not hit rate limits.
- **Graceful failure:** if one API fails, show the partial result and mark the
  missing signals "unavailable" — never block the whole scan on one source,
  and never invent data for the missing side.
- **Validate the address first:** `0x` + 40 hex chars (case-insensitive).
  Reject anything else before any network call.

## Scoring rule engine (`app.js` — pure functions, no DOM inside)

- Input: normalized `{ dex: {...} | null, goplus: {...} | null }`.
- Output: `{ score: 0–100, verdict: "AMAN" | "WASPADA" | "BAHAYA", signals: [...] }`.
- Every signal: `{ id, label, detail, weight, impact }` — `impact` is the
  points added or removed, so the score is always explainable as a sum.
- Hard red flags (honeypot, sell tax ≥ 50%, no liquidity) cap the score
  regardless of other signals.
- The engine must be **deterministic and side-effect free** so property-based
  tests can run it thousands of times.

## Data & storage

- **Ledger:** `localStorage` key `garapan-radar-ledger-v1`, JSON array of tasks
  `{ id, title, link, chain, status, deadline, createdAt }`. Export/import as
  `.json`. No data leaves the browser.
- **Scan cache:** `sessionStorage` key `garapan-radar-scan-v1`, TTL 5 min.
- **No cookies, no analytics, no third-party scripts.**

## Conventions

- Files: kebab-case. Functions: camelCase. Constants: UPPER_SNAKE_CASE.
- All user-visible strings: English in the UI (Kiroween submissions must be
  English or include an English translation); Indonesian is used only in the
  demo video narration + subtitles.
- Every public function has a JSDoc comment stating input, output, and the
  edge cases it handles.
- No `eval`, no `innerHTML` with untrusted data (use `textContent` or a
  sanitizer for anything that came from an API or user input).
- Accessibility: labels on every input, buttons reachable by keyboard,
  sufficient contrast on the dark theme.
