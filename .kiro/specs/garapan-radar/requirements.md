# Spec: Garapan Radar — Airdrop Safety Scanner

**Feature:** `garapan-radar` · **Status:** requirements (phase 1 of 3 — design and
tasks follow on Day 2–3) · **Owner:** Tokrus86 · **Hackathon:** Kiroween 2026,
Frankenstein category · **Created:** 2026-11-20 (Day 1)

## Introduction

Garapan Radar is a 100% static web app that scores the safety of a BSC token
contract before an airdrop hunter spends gas or attention on it. The user
pastes a contract address; the app fetches DexScreener market data and GoPlus
token-security data in parallel; a client-side rule engine produces a Safety
Score 0–100 with a verdict card (AMAN / WASPADA / BAHAYA) and a per-signal
explanation. A Garapan Ledger tracks airdrop tasks in localStorage, and a
one-click report can be copied and shared. No backend, no API key, no account.

## Glossary

- **Garapan:** Indonesian airdrop-hunting work (tasks, testnets, free mints).
- **Safety Score:** integer 0–100 computed from signals; higher is safer.
- **Verdict:** AMAN (score ≥ 70), WASPADA (40–69), BAHAYA (< 40 or any hard
  red flag).
- **Signal:** one observed fact with a label, a human-readable detail, a
  weight, and a point impact on the score.
- **Hard red flag:** honeypot, sell tax ≥ 50%, or zero liquidity — caps the
  score at 29 (BAHAYA) regardless of other signals.
- **Ledger task:** `{ id, title, link, chain, status, deadline, createdAt }`.

## Requirements

### Requirement 1 — Contract address input & validation

**User Story:** As a hunter, I want to paste a BSC contract address and get an
immediate verdict on whether it is a valid address, so I never waste a scan on
a typo.

#### Acceptance Criteria

1. WHEN the user enters a string that is not `0x` + 40 hex characters, THEN
   the app SHALL show an inline error naming the problem and SHALL NOT make
   any network call.
2. WHEN the user enters a valid address in any letter case, THEN the app SHALL
   normalize it to lowercase before any fetch.
3. WHEN the user presses Enter in the input or clicks Scan, THEN the scan
   SHALL start.

### Requirement 2 — Live data fetch (DexScreener + GoPlus)

**User Story:** As a hunter, I want market data and security data fetched
together, so one scan tells me both what the token is worth and whether it can
hurt me.

#### Acceptance Criteria

1. WHEN a scan starts, THEN the app SHALL request DexScreener
   (`/latest/dex/tokens/<address>`) and GoPlus (`/token_security/56`)
   in parallel with a 10-second timeout each.
2. WHEN one source fails or times out, THEN the app SHALL still show the
   other source's data and mark the missing signals "unavailable" — it SHALL
   NOT invent data and SHALL NOT block the whole scan.
3. WHEN both sources fail, THEN the app SHALL show a clear error with a retry
   button and SHALL NOT show any score.
4. WHEN the same address is scanned again within 5 minutes, THEN the app
   SHALL serve the cached result from sessionStorage instead of refetching.

### Requirement 3 — Safety Score & verdict

**User Story:** As a hunter, I want a single score and a plain verdict with the
reasons listed, so I can decide go/no-go in seconds.

#### Acceptance Criteria

1. WHEN data is available, THEN the app SHALL display an integer score 0–100
   and a verdict card AMAN (≥ 70), WASPADA (40–69), or BAHAYA (< 40).
2. WHEN any hard red flag is present (honeypot, sell tax ≥ 50%, zero
   liquidity), THEN the score SHALL be capped at 29 and the verdict SHALL be
   BAHAYA.
3. WHEN the score is shown, THEN every contributing signal SHALL be listed
   with its label, detail, and point impact, so the score is reproducible as
   a sum.
4. WHEN a token has no pair on DexScreener, THEN the app SHALL show
   "no market data" and SHALL NOT present a market-based score as if it had
   one.

### Requirement 4 — Garapan Ledger

**User Story:** As a hunter, I want to save a scanned token as a task with a
link, status, and deadline, so I can track which garapan I am working and
which I have dropped.

#### Acceptance Criteria

1. WHEN the user saves a scan to the ledger, THEN a task SHALL be created with
   title, link, chain (default BSC), status (default "todo"), and optional
   deadline.
2. WHEN the user edits a task's status or deadline, THEN the change SHALL
   persist in localStorage immediately.
3. WHEN the user deletes a task, THEN it SHALL be removed from localStorage
   and the list SHALL re-render without a page reload.
4. WHEN the user exports the ledger, THEN a `.json` file SHALL download; WHEN
   the user imports a `.json` file, THEN valid tasks SHALL be added and
   invalid entries SHALL be skipped with a count shown.

### Requirement 5 — Shareable report

**User Story:** As a hunter, I want to copy a text report of a scan, so I can
warn friends about a scam token or share a good find in a group chat.

#### Acceptance Criteria

1. WHEN the user clicks Copy Report, THEN a plain-text report SHALL be copied
   containing: token address, score, verdict, the top 5 signals, and links to
   DexScreener and GoPlus.
2. WHEN the copy succeeds, THEN the button SHALL confirm "Copied" for 2
   seconds.

### Requirement 6 — Static, keyless, phone-first

**User Story:** As a hunter on a phone, I want the app to open instantly with
no login and no cost, so I can scan a token the moment a lead appears.

#### Acceptance Criteria

1. WHEN the app is opened, THEN it SHALL work with no login, no API key, and
   no backend of any kind.
2. WHEN the app is opened on a 360px-wide phone screen, THEN the input, score,
   and verdict SHALL all be readable and tappable without horizontal scroll.
3. WHEN the app is served from GitHub Pages, THEN all functionality SHALL
   work (no server-side feature may be required).

## Non-Goals (v1)

- Other chains besides BSC (chain 56).
- Wallet connection, price alerts, or any transaction.
- Server-side storage, accounts, or analytics.
- Automated buying or selling.

## Open questions (to resolve in design.md)

- Exact signal list and point weights (draft in design; validated by PBT).
- Demo-token cache format for offline judging.
- Ledger task statuses: `todo / doing / done / dropped` — confirm in design.
