(() => {
const REPEATS = [
['none', 'Once'], ['daily', 'Every day'], ['weekly', 'Every week'], ['monthly', 'Every month'],
['every3months', 'Every 3 months'], ['every6months', 'Every 6 months'], ['yearly', 'Every year'],
];
const RRULE = { daily: 'FREQ=DAILY', weekly: 'FREQ=WEEKLY', monthly: 'FREQ=MONTHLY', every3months: 'FREQ=MONTHLY;INTERVAL=3', every6months: 'FREQ=MONTHLY;INTERVAL=6', yearly: 'FREQ=YEARLY' };
const pad = (n) => String(n).padStart(2, '0');
const ymd = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const store = {
get(k, d) { try { return JSON.parse(localStorage.getItem(k)) ?? d; } catch { return d; } },
set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch {} },
};
function next(a, from = new Date()) {
if (!a || !a.date || !a.time) return null;
const [y, m, d] = a.date.split('-').map(Number), [hh, mm] = a.time.split(':').map(Number);
const t = new Date(y, m - 1, d, hh, mm);
if (isNaN(t)) return null;
if (t >= from) return t;
if (!RRULE[a.repeat]) return null; // a one-time reminder that has passed
const step = { daily: [0, 1], weekly: [0, 7], monthly: [1, 0], every3months: [3, 0], every6months: [6, 0], yearly: [12, 0] }[a.repeat];
for (let i = 1; i < 5000; i++) {
const c = new Date(y, m - 1 + step[0] * i, d + step[1] * i, hh, mm);
if (c >= from) return c;
}
return null;
}
const fmt = (t) => t ? t.toLocaleString(undefined, { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' }) : '';
const repeatLabel = (r) => (REPEATS.find(([k]) => k === r) || REPEATS[0])[1];
function fromRule(s, startDate) {
const d = startDate ? new Date(startDate + 'T00:00') : new Date();
d.setDate(d.getDate() + (Number(s.offsetDays) || 0));
return { date: ymd(d), time: /^\d{2}:\d{2}$/.test(s.time || '') ? s.time : '09:00', repeat: RRULE[s.repeat] ? s.repeat : 'none', label: s.label || '' };
}
function suggest(step, startDate) {
const s = (step.alerts || [])[0];
if (s) return fromRule(s, startDate);
const d = new Date(); d.setDate(d.getDate() + 1);
return { date: ymd(d), time: '09:00', repeat: 'none', label: '' };
}
const suggestAll = (step, startDate) => (step.alerts || []).map((s) => fromRule(s, startDate));
function ics(items, guideName) {
const esc = (s) => String(s || '').replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\r?\n/g, '\\n');
const fold = (line) => line.match(/.{1,73}/g).join('\r\n ');
const now = new Date(), stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(now.getUTCDate())}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}00Z`;
const ev = items.map((it) => {
const [y, m, d] = it.date.split('-'), [hh, mm] = it.time.split(':');
return ['BEGIN:VEVENT', `UID:aim-${it.page}-${it.i}-${it.k || 0}-${it.date.replace(/-/g, '')}@aimonehealth`, `DTSTAMP:${stamp}`,
`DTSTART:${y}${m}${d}T${hh}${mm}00`, 'DURATION:PT15M', fold(`SUMMARY:${esc(it.title)}`),
fold(`DESCRIPTION:${esc((it.label ? it.label + '\n\n' : '') + guideName + ' to-do, step ' + (it.i + 1) + '. Teaching guide, not medical advice.')}`),
...(RRULE[it.repeat] ? [`RRULE:${RRULE[it.repeat]}`] : []),
'BEGIN:VALARM', 'ACTION:DISPLAY', fold(`DESCRIPTION:${esc(it.title)}`), 'TRIGGER:PT0M', 'END:VALARM', 'END:VEVENT'].join('\r\n');
});
return ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//AiM One Health//To-do reminders//EN', 'CALSCALE:GREGORIAN', ...ev, 'END:VCALENDAR'].join('\r\n') + '\r\n';
}
function download(text, name) {
const url = URL.createObjectURL(new Blob([text], { type: 'text/calendar;charset=utf-8' }));
const a = Object.assign(document.createElement('a'), { href: url, download: name });
document.body.append(a); a.click(); a.remove();
setTimeout(() => URL.revokeObjectURL(url), 60000);
}
window.aimAlerts = {
REPEATS, next, fmt, repeatLabel, suggest, suggestAll, ics, download, ymd,
load(page) {
const raw = store.get('aim.alerts.' + page, {}) || {};
return Object.fromEntries(Object.entries(raw).map(([i, v]) => [i, Array.isArray(v) ? v : [v]]).filter(([, v]) => v.length));
},
save(page, guideName, all, steps) {
store.set('aim.alerts.' + page, all);
const items = Object.entries(all).flatMap(([i, list]) => list.map((a, k) => ({ i: Number(i), k, title: steps[i]?.title || 'To-do step', ...a })));
window.aimDesk?.alerts?.set({ page, guide: guideName, items }).catch(() => {});
},
startDate: (page) => store.get('aim.start.' + page, null),
setStartDate: (page, d) => store.set('aim.start.' + page, d),
};
})();