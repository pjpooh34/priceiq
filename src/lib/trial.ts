const KEY = 'priceiq_trial_credits';
const DEFAULT_CREDITS = 2;

export function getTrialCredits(): number {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw == null) {
      localStorage.setItem(KEY, String(DEFAULT_CREDITS));
      return DEFAULT_CREDITS;
    }
    const n = parseInt(raw, 10);
    return Number.isFinite(n) ? n : DEFAULT_CREDITS;
  } catch {
    return 0;
  }
}

export function consumeTrialCredit(): number {
  const left = Math.max(0, getTrialCredits() - 1);
  try {
    localStorage.setItem(KEY, String(left));
  } catch {}
  return left;
}

export function hasTrialCredits(): boolean {
  return getTrialCredits() > 0;
}

export function resetTrialCredits(n: number = DEFAULT_CREDITS) {
  try { localStorage.setItem(KEY, String(n)); } catch {}
}

