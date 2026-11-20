# Garapan Radar — Airdrop Safety Scanner

**Kiroween 2026 — Frankenstein category.** Scan a BSC token contract before you ape in: paste the contract address, get a 0–100 Safety Score with a clear verdict, built from live DexScreener market data + GoPlus token-security data. Track your airdrop tasks in a local Garapan Ledger. Share the report in one click.

- **100% static** — no backend, no API keys, no account, no cost. Runs on GitHub Pages.
- **Live demo:** https://tokrus86.github.io/kiroween-garapan-radar/ *(deploying)*
- **Built with Kiro** — spec-driven development, steering docs, agent hooks, a local MCP server, and property-based tests. See [`.kiro/`](.kiro/) for the full spec trail.

## Why this exists

Airdrop hunters in Indonesia lose money to honeypots and 90% sell-tax tokens every day. The author proved it the hard way: OOJU (unsellable — thin pools only), IAO (~90% sell tax), SAFU (no real pair). Garapan Radar answers with data, not promises.

## How it works

1. Paste a BSC (BNB Smart Chain) contract address.
2. The app fetches in parallel:
   - **DexScreener** — pairs, price, liquidity, volume, pair age.
   - **GoPlus Token Security** — honeypot, buy/sell tax, owner, mintable, proxy, holders.
3. A client-side rule engine scores every signal and produces:
   - **Safety Score 0–100** + verdict card: **AMAN / WASPADA / BAHAYA**
   - A per-signal breakdown with the reason and weight behind each signal.
4. Save the scan to your **Garapan Ledger** (localStorage): task, link, chain, status, deadline.
5. Copy a shareable text report.

## Run locally

```bash
# No build step — plain HTML/CSS/JS, Node stdlib only for tests.
python3 -m http.server 8000
# open http://localhost:8000
```

Tests:

```bash
node --test tests/
```

## Tech

- Static site: `index.html` + `app.js` + `styles.css` (no framework, no bundler).
- Data: DexScreener API + GoPlus Token Security API (public, keyless, CORS-open).
- Storage: `localStorage` (ledger) + `sessionStorage` (scan cache).
- Kiro: specs in `.kiro/specs/garapan-radar/`, steering in `.kiro/steering/`, hooks in `.kiro/hooks/`, MCP server in `mcp-server/`.

## License

MIT — see [LICENSE](LICENSE).
