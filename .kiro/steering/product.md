---
inclusion: always
---

# Product — Garapan Radar

## What it is

Garapan Radar is an **Airdrop Safety Scanner** for the Kiroween 2026 hackathon
(Frankenstein category). A hunter pastes a BSC token contract address and gets
a **Safety Score 0–100** plus a clear verdict card (**AMAN / WASPADA / BAHAYA**),
computed from live market data (DexScreener) and live token-security data
(GoPlus). A **Garapan Ledger** tracks airdrop tasks locally, and a one-click
report can be copied and shared.

## Who it is for

- Indonesian airdrop hunters ("garapan" community) who check new tokens daily
  from their phones and need a fast go/no-go signal before spending gas or
  attention on a project.
- Anyone who has been burned by a honeypot or a 90% sell-tax token and wants
  data instead of hype.

## The problem it solves

Scam and dead tokens cost real money: honeypots that cannot be sold, sell tax
near 90%, owner-controlled minting, zero liquidity. The signals that expose
them are public — but scattered across two different APIs and unreadable to a
non-technical hunter. Garapan Radar joins them into one explained score.

## Product principles

1. **Data over promises.** Every verdict shows the signals behind it, with a
   reason and a weight. No signal, no claim.
2. **Zero cost, zero account.** 100% static site. No backend, no API key, no
   login, no tracking. If an API is down, say so plainly — never fake a score.
3. **Phone-first.** The primary user checks tokens from a phone. The scanner
   must work on a small screen with one thumb.
4. **Honest uncertainty.** A token with no pair, no liquidity, or an API
   failure gets "no data" treatment, not a made-up middle score.
5. **Local-first ledger.** Task data lives in the user's own browser
   (localStorage). Nothing leaves the device except the two public API calls
   the user explicitly triggers by scanning.

## Scope (v1)

- IN: BSC (chain 56) contract scan; DexScreener + GoPlus fetch; rule-engine
  score 0–100; verdict card; per-signal breakdown; Garapan Ledger
  (add/edit/delete/filter, export/import JSON); shareable text report;
  demo-token cache for offline judging.
- OUT: other chains; wallet connection; price alerts; server-side anything;
  automated trading or buying; any feature that needs a secret or a key.

## Success criteria

- A hunter can paste an address and read a verdict in under 10 seconds on a
  phone.
- Every score is reproducible from the signals shown next to it.
- The app works with zero setup: open the GitHub Pages URL and scan.
