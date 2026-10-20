// Slots are stored as Toronto wall-clock strings ("2026-10-20T10:00") and formatted as UTC so no TZ math is needed.
export const fmt = (s, o) => new Date(s + 'Z').toLocaleString('en-US', { timeZone: 'UTC', ...o })
export const when = (slot) => `${fmt(slot, { weekday: 'long', month: 'long', day: 'numeric' })} at ${fmt(slot, { hour: 'numeric', minute: '2-digit' })} (Toronto time)`
export const ymd = (d) => new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Toronto' }).format(d)
