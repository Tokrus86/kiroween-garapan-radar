/* Garapan Radar — app.js (scaffold, Day 1).
 * Full scanner (fetch + rule engine + ledger + report) is built on Day 4-8
 * per .kiro/specs/garapan-radar/requirements.md. This file currently holds
 * only address validation + wiring, so the scaffold is testable. */
'use strict';

/** Validate a BSC contract address. Returns lowercase address or null. */
function validateAddress(addr) {
  if (typeof addr !== 'string') return null;
  const a = addr.trim();
  return /^0x[0-9a-fA-F]{40}$/.test(a) ? a.toLowerCase() : null;
}

document.getElementById('scan').addEventListener('click', () => {
  const input = document.getElementById('contract');
  const error = document.getElementById('error');
  const result = document.getElementById('result');
  const addr = validateAddress(input.value);
  if (!addr) {
    error.hidden = false;
    error.textContent = 'Invalid address — expected 0x followed by 40 hex characters.';
    result.hidden = true;
    return;
  }
  error.hidden = true;
  result.hidden = false;
  result.textContent = 'Scanner build lands Day 4-8. Valid address: ' + addr;
});

if (typeof module !== 'undefined') module.exports = { validateAddress };
