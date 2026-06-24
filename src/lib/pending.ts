import type { CerveauUser } from "@/context/UserContext"

/** Анкета без типа восприятия — заполняется до прохождения теста. */
export type PendingProfile = Omit<CerveauUser, "perceptionType">

const KEY = "cerveau:pending"

export function setPending(profile: PendingProfile) {
  try {
    localStorage.setItem(KEY, JSON.stringify(profile))
  } catch {
    /* noop */
  }
}

export function getPending(): PendingProfile | null {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const p = JSON.parse(raw) as PendingProfile
    return p?.firstName ? p : null
  } catch {
    return null
  }
}

export function clearPending() {
  try {
    localStorage.removeItem(KEY)
  } catch {
    /* noop */
  }
}
