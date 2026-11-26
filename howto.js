(() => {
const W = 480, H = 270;
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const d = (s) => `style="animation-delay:${s}s"`;
const at = (tr, cls, dl, inner) => `<g transform="${tr}"><g class="${cls}" ${d(dl)}>${inner}</g></g>`;
const meter = (x, y, val, unit = 'mg/dL', delay = 0) => `<g transform="translate(${x} ${y})">
<rect class="ln fl" x="0" y="0" width="92" height="132" rx="20"/>
<rect class="ln" x="12" y="14" width="68" height="50" rx="8" fill="var(--ht-screen)"/>
<text class="num" x="46" y="45" text-anchor="middle" data-count="${val}" data-delay="${delay}">${val}</text>
<text class="unit" x="46" y="58" text-anchor="middle">${unit}</text>
<circle class="ln" cx="46" cy="96" r="13"/><path class="ln" d="M30 132 v14 h32 v-14"/></g>`;
const strip = (x, y, cls = '', dl = 0) => at(`translate(${x} ${y})`, cls, dl, `<rect class="ln" x="0" y="0" width="20" height="58" rx="3" fill="var(--ht-paper)"/><rect x="6" y="6" width="8" height="10" rx="2" fill="var(--ht-brand)" opacity=".5"/>`);
const drop = (x, y, s = 1, cls = '', dl = 0, color = 'var(--ht-red)') => at(`translate(${x} ${y}) scale(${s})`, cls, dl, `<path d="M0,-18 C6,-8 11,-2 11,5 A11,11 0 0 1 -11,5 C-11,-2 -6,-8 0,-18Z" fill="${color}"/><path d="M-5 3 a6 6 0 0 0 4 6" stroke="#fff" stroke-width="2" fill="none" opacity=".7" stroke-linecap="round"/>`);
const finger = (x, y, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot})"><path class="ln fl" d="M0 110 V34 a26 26 0 0 1 52 0 V110"/><path class="ln" d="M14 24 a12 12 0 0 1 24 0 v8 h-24z" opacity=".6"/><path class="ln" d="M6 70 h40 M6 92 h40" opacity=".35"/></g>`;
const hand = (x, y, flip = 1) => `<g transform="translate(${x} ${y}) scale(${flip} 1)"><path class="ln fl" d="M0 120 V58 a10 10 0 0 1 20 0 V22 a10 10 0 0 1 20 0 V54 V14 a10 10 0 0 1 20 0 V54 V22 a10 10 0 0 1 20 0 V64 l12 -16 a10 10 0 0 1 16 12 L84 120 Z"/></g>`;
const clock = (x, y, r, label, dl = 0) => `<g transform="translate(${x} ${y})"><circle class="ln fl" r="${r}"/><circle r="3" fill="var(--ht-ink)"/>
${[0, 1, 2, 3].map((i) => `<path class="ln" d="M0 ${-r + 6} v8" transform="rotate(${i * 90})" opacity=".5"/>`).join('')}
<path class="ln a-spin" ${d(dl)} d="M0 0 V${-r * 0.7}" stroke="var(--ht-brand)"/>
<path class="ln" d="M0 0 L${r * 0.4} 0"/>${label ? `<text class="lbl" y="${r + 26}" text-anchor="middle">${label}</text>` : ''}</g>`;
const check = (x, y, s = 1, dl = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="a-pop" ${d(dl)} r="22" fill="var(--ht-green)"/><path class="a-draw" ${d(dl + 0.25)} d="M-10 0 l7 7 l13 -14" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
const cross = (x, y, s = 1, dl = 0) => `<g transform="translate(${x} ${y}) scale(${s})"><circle class="a-pop" ${d(dl)} r="22" fill="var(--ht-red)"/><path class="a-draw" ${d(dl + 0.25)} d="M-8 -8 l16 16 M8 -8 l-16 16" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
const phone = (x, y, dl = 0) => `<g transform="translate(${x} ${y})"><rect class="ln fl" x="-34" y="-62" width="68" height="124" rx="14"/><path class="ln" d="M-10 50 h20"/>
<g class="a-ring" ${d(dl)}><path d="M-14 -20 c-4 4 -4 14 6 24 s20 10 24 6 l4 -4 -10 -10 -6 6 c-4 -2 -8 -6 -10 -10 l6 -6 -10 -10z" fill="var(--ht-brand)"/></g>
<path class="ln a-wave" ${d(dl)} d="M18 -34 a14 14 0 0 1 10 10 M22 -46 a26 26 0 0 1 18 18" stroke="var(--ht-brand)"/></g>`;
const pill = (x, y, dl) => at(`translate(${x} ${y})`, 'a-pop', dl, `<circle r="17" fill="var(--ht-paper)" stroke="var(--ht-ink)" stroke-width="3"/><path d="M-9 0 h18" stroke="var(--ht-ink)" stroke-width="2" opacity=".4"/>`);
const loop = (x, y, r, dl = 0) => at(`translate(${x} ${y})`, 'a-spin-slow', dl, `<path d="M${r} 0 A${r} ${r} 0 1 1 0 ${-r}" class="ln" stroke="var(--ht-brand)"/><path d="M-8 ${-r - 8} L0 ${-r} L-8 ${-r + 8}" class="ln" stroke="var(--ht-brand)"/>`);
const foot = (x, y, s = 1, flip = 1) => `<g transform="translate(${x} ${y}) scale(${s * flip} ${s})"><path class="ln fl" d="M0 0 C-34 0 -42 -52 -38 -96 C-34 -140 -6 -158 14 -152 C40 -146 42 -104 34 -66 C28 -36 30 0 0 0 Z"/>
<circle class="ln fl" cx="-24" cy="-170" r="11"/><circle class="ln fl" cx="-2" cy="-176" r="8"/><circle class="ln fl" cx="16" cy="-172" r="7"/><circle class="ln fl" cx="31" cy="-162" r="6"/><circle class="ln fl" cx="42" cy="-148" r="5"/></g>`;
const shoe = (x, y) => `<g transform="translate(${x} ${y})"><path class="ln fl" d="M0 0 H170 C176 -22 160 -34 130 -40 L92 -50 C80 -54 74 -70 70 -84 H20 C18 -60 6 -40 0 -24 Z"/><path class="ln" d="M70 -84 C60 -60 40 -54 20 -56" opacity=".4"/><path class="ln" d="M0 -10 H170" opacity=".4"/></g>`;
const bar = (x, y, w, h, color, dl, label) => `<g transform="translate(${x} ${y})"><rect x="0" y="${-h}" width="${w}" height="${h}" rx="6" fill="${color}" class="a-grow" ${d(dl)}/><text class="lbl s" x="${w / 2}" y="22" text-anchor="middle">${label}</text></g>`;
const glass = (x, y, dl) => `<g transform="translate(${x} ${y})"><clipPath id="gl${x}"><path d="M-30 -80 L-24 0 H24 L30 -80 Z"/></clipPath><g clip-path="url(#gl${x})"><rect x="-32" y="-80" width="64" height="82" fill="var(--ht-water)" class="a-grow" ${d(dl)}/></g><path class="ln" d="M-30 -80 L-24 0 H24 L30 -80"/></g>`;
const dumbbell = (x, y, dl) => `<g transform="translate(${x} ${y})"><g class="a-lift" ${d(dl)}><rect class="ln fl" x="-60" y="-26" width="18" height="52" rx="5"/><rect class="ln fl" x="42" y="-26" width="18" height="52" rx="5"/><rect class="ln fl" x="-76" y="-16" width="14" height="32" rx="4"/><rect class="ln fl" x="62" y="-16" width="14" height="32" rx="4"/><path class="ln" d="M-42 0 H42" stroke-width="6"/></g></g>`;
const plateBase = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r + 14}" fill="var(--ht-paper)" class="ln"/><circle cx="${cx}" cy="${cy}" r="${r}" class="ln" opacity=".45"/>`;
const wedge = (cx, cy, r, a0, a1, color, dl) => {
const p = (a) => [cx + r * Math.cos((a - 90) * Math.PI / 180), cy + r * Math.sin((a - 90) * Math.PI / 180)];
const [x0, y0] = p(a0), [x1, y1] = p(a1);
return `<path class="a-pop" ${d(dl)} d="M${cx} ${cy} L${x0.toFixed(1)} ${y0.toFixed(1)} A${r} ${r} 0 ${a1 - a0 > 180 ? 1 : 0} 1 ${x1.toFixed(1)} ${y1.toFixed(1)} Z" fill="${color}" stroke="var(--ht-paper)" stroke-width="4"/>`;
};
const arm = (x, y) => `<g transform="translate(${x} ${y})"><path class="ln fl" d="M0 0 H250 a22 22 0 0 1 22 22 V28 a22 22 0 0 1 -22 22 H0"/><path class="ln" d="M272 14 h24 a10 10 0 0 1 0 20 h-24" /></g>`;
const cuff = (x, y, dl) => `<g transform="translate(${x} ${y})"><rect class="a-squeeze" ${d(dl)} x="0" y="-8" width="74" height="66" rx="12" fill="var(--ht-brand)" opacity=".85"/><path d="M37 58 C37 90 70 96 96 96" class="ln" stroke-width="3"/></g>`;
const monitor = (x, y, top, bottom, dl) => `<g transform="translate(${x} ${y})"><rect class="ln fl" x="0" y="0" width="110" height="84" rx="14"/><rect class="ln" x="12" y="12" width="86" height="42" rx="6" fill="var(--ht-screen)"/>
<text class="num s" x="55" y="40" text-anchor="middle"><tspan data-count="${top}" data-delay="${dl}">${top}</tspan>/<tspan data-count="${bottom}" data-delay="${dl}">${bottom}</tspan></text><circle class="ln" cx="55" cy="68" r="7"/></g>`;
const chair = (x, y) => `<g transform="translate(${x} ${y})"><path class="ln" d="M0 -110 V0 M0 -40 H70 V0 M10 -40 V0" /></g>`;
const person = (x, y) => `<g transform="translate(${x} ${y})"><circle class="ln fl" cx="16" cy="-150" r="16"/><path class="ln fl" d="M4 -128 h24 a8 8 0 0 1 8 8 v74 h-40 v-74 a8 8 0 0 1 8 -8z"/><path class="ln" d="M-4 -46 H54 V0 M36 -100 l30 26 h24"/></g>`;
const calendar = (x, y, mins, dl) => {
const days = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
return `<g transform="translate(${x} ${y})">${days.map((n, i) => bar(i * 44, 0, 30, mins[i] * 3.2 || 2, mins[i] ? 'var(--ht-green)' : 'var(--ht-line)', dl + i * 0.18, n)).join('')}</g>`;
};
const tag = (x, y, t, color = 'var(--ht-brand)', dl = 0) => at(`translate(${x} ${y})`, 'a-pop', dl, `<rect x="${-t.length * 4.7 - 14}" y="-17" width="${t.length * 9.4 + 28}" height="34" rx="17" fill="${color}"/><text class="tag" text-anchor="middle" y="6">${esc(t)}</text>`);
const marker = (x, y, dl) => at(`translate(${x} ${y})`, 'a-pop', dl, `<circle r="15" fill="none" stroke="var(--ht-red)" stroke-width="3"/><circle r="5" fill="var(--ht-red)"/>`);
const ANIMS = {
glucose: {
title: 'How to check your blood sugar with a meter',
scenes: [
{ say: 'Wash your hands with soap and warm water, then dry them well.', art: `<rect class="ln fl" x="150" y="40" width="26" height="26" rx="6"/><path class="ln" d="M176 52 H250 Q272 52 272 74 V84"/>
<path class="a-flow" d="M272 92 V150" stroke="var(--ht-water)" stroke-width="10" stroke-linecap="round" stroke-dasharray="10 14"/>
${hand(196, 140)}${hand(352, 140, -1)}
${[0, 1, 2, 3, 4].map((i) => `<circle class="a-bubble" ${d(i * 0.35)} cx="${230 + i * 18}" cy="${150 - (i % 2) * 14}" r="${6 + (i % 3) * 2}" fill="none" stroke="var(--ht-water)" stroke-width="2.5"/>`).join('')}` },
{ say: 'Put a new test strip into your meter.', art: `${meter(250, 60, '- -')}${strip(286, 0, 'a-slide-down', 0.3)}` },
{ say: 'Use the lancet to prick the side of your fingertip. The side hurts less than the pad.', art: `${finger(180, 80)}<g class="a-poke" ${d(0.2)}><rect class="ln fl" x="250" y="96" width="90" height="30" rx="15"/><path class="ln" d="M250 111 h-14"/></g>${drop(230, 110, 0.9, 'a-pop', 1.1)}` },
{ say: 'Touch the drop of blood to the end of the strip and let it soak in.', art: `${finger(150, 90, 18)}${drop(214, 108, 0.9)}${meter(270, 60, '')}${strip(306, 0)}<path class="a-fillstrip" ${d(0.6)} d="M316 6 V52" stroke="var(--ht-red)" stroke-width="8" stroke-linecap="round"/>` },
{ say: 'Read your number, then write it down or let your meter save it.', art: `${meter(130, 60, 112, 'mg/dL', 0.2)}<g transform="translate(270 54)"><rect class="ln fl" x="0" y="0" width="120" height="150" rx="10"/>${[0, 1, 2, 3].map((i) => `<path class="ln a-draw" ${d(0.8 + i * 0.3)} d="M16 ${36 + i * 28} H${92 - (i % 2) * 22}"/>`).join('')}</g><text class="lbl s" x="176" y="232" text-anchor="middle">example reading</text>` },
{ say: 'Ask your team what your target numbers are, and bring your readings to every visit.', art: `${meter(110, 60, 112)}<path class="ln a-draw" ${d(0.3)} d="M222 126 H286"/><path class="ln" d="M276 114 l12 12 -12 12"/>${person(330, 236)}${check(410, 70, 1, 0.9)}` },
],
},
plate: {
title: 'How to fill your plate',
scenes: [
{ say: 'Start with a normal dinner plate.', art: `${plateBase(240, 135, 92)}` },
{ say: 'Fill half the plate with vegetables, like salad, broccoli or carrots.', art: `${plateBase(240, 135, 92)}${wedge(240, 135, 92, 0, 180, 'var(--ht-green)', 0.2)}${tag(400, 80, 'Vegetables', 'var(--ht-green)', 0.6)}` },
{ say: 'Fill a quarter with protein, like chicken, fish, eggs or beans.', art: `${plateBase(240, 135, 92)}${wedge(240, 135, 92, 0, 180, 'var(--ht-green)', 0)}${wedge(240, 135, 92, 180, 270, 'var(--ht-protein)', 0.2)}${tag(90, 190, 'Protein', 'var(--ht-protein)', 0.6)}` },
{ say: 'Fill the last quarter with carbs, like rice, bread, pasta or potatoes. Whole grains are best.', art: `${plateBase(240, 135, 92)}${wedge(240, 135, 92, 0, 180, 'var(--ht-green)', 0)}${wedge(240, 135, 92, 180, 270, 'var(--ht-protein)', 0)}${wedge(240, 135, 92, 270, 360, 'var(--ht-carb)', 0.2)}${tag(90, 80, 'Carbs', 'var(--ht-carb)', 0.6)}` },
{ say: 'Drink water or another drink with no sugar. Skip soda and other sugary drinks.', art: `${glass(170, 210, 0.2)}${check(170, 70, 0.9, 0.9)}<g transform="translate(310 210)"><path class="ln" d="M-24 -84 L-20 0 H20 L24 -84 Z" opacity=".5"/><rect x="-21" y="-60" width="42" height="58" fill="var(--ht-protein)" opacity=".35"/></g>${cross(310, 70, 0.9, 1.2)}` },
],
},
bp: {
title: 'How to check your blood pressure at home',
scenes: [
{ say: 'Sit in a chair with your back supported and your feet flat on the floor. Rest quietly for 5 minutes first.', art: `${chair(150, 236)}${person(150, 236)}${clock(370, 110, 46, '5 minutes', 0.2)}` },
{ say: 'Rest your arm on a table at heart level. Put the cuff on your bare upper arm.', art: `${arm(80, 120)}${cuff(150, 112, 0.3)}<path class="ln" d="M60 196 H420" opacity=".35"/>` },
{ say: "Stay still and don't talk while the cuff squeezes and measures.", art: `${arm(30, 120)}${cuff(100, 112, 0)}${monitor(310, 150, 128, 82, 0.4)}<text class="lbl s a-blink" x="365" y="132" text-anchor="middle">shh…</text>` },
{ say: 'Take 2 readings about a minute apart, and write both down.', art: `${monitor(70, 80, 128, 82, 0.2)}${monitor(210, 80, 126, 80, 1.4)}<g transform="translate(360 64)"><rect class="ln fl" x="0" y="0" width="90" height="116" rx="10"/>${[0, 1].map((i) => `<path class="ln a-draw" ${d(1 + i * 0.8)} d="M14 ${36 + i * 30} H72"/>`).join('')}</g><text class="lbl s" x="195" y="200" text-anchor="middle">example readings</text>` },
{ say: 'Ask your team what your goal is. For most people with diabetes it is under 130 over 80.', art: `${monitor(130, 80, 126, 80, 0)}<path class="ln a-draw" ${d(0.3)} d="M256 122 H296"/>${tag(360, 122, 'Goal: under 130/80', 'var(--ht-brand)', 0.6)}` },
],
},
feet: {
title: 'How to check your feet',
scenes: [
{ say: 'Every day, look at your whole foot: the top, the bottom, the heel and between your toes.', art: `${foot(190, 238, 1, -1)}${foot(300, 238, 1)}<rect class="a-scan" x="120" y="40" width="250" height="14" rx="7" fill="var(--ht-brand)" opacity=".22"/>` },
{ say: "Use a mirror to see the bottoms of your feet, or ask someone to look for you.", art: `${foot(170, 238, 1)}<g transform="translate(320 150)"><ellipse class="ln fl" rx="70" ry="96" fill="var(--ht-water)" fill-opacity=".18"/><path class="ln" d="M0 96 V128 M-26 128 H26"/><path class="a-glint" d="M-40 -50 l30 -30" stroke="#fff" stroke-width="5" stroke-linecap="round" opacity=".8"/></g>` },
{ say: 'Look for cuts, blisters, redness, swelling or hard skin.', art: `${foot(240, 238, 1.05)}${marker(214, 120, 0.3)}${marker(262, 190, 0.8)}${marker(236, 62, 1.3)}` },
{ say: 'Wash your feet every day and dry them well, especially between the toes.', art: `${foot(200, 238, 1)}${[0, 1, 2].map((i) => drop(300 + i * 34, 60 + i * 22, 0.8, 'a-fall', i * 0.4, 'var(--ht-water)')).join('')}<path class="a-wipe" d="M300 200 h120" stroke="var(--ht-brand)" stroke-width="22" stroke-linecap="round" opacity=".35"/>` },
{ say: 'Check inside your shoes before you put them on. Never walk barefoot, even at home.', art: `<g class="a-shake">${shoe(150, 190)}</g><circle class="a-fall" ${d(0.9)} cx="250" cy="200" r="8" fill="var(--ht-ink)" opacity=".7"/>${cross(400, 70, 0.8, 1.6)}<text class="lbl s" x="400" y="118" text-anchor="middle">barefoot</text>` },
{ say: 'Found a sore that is not healing? Call a foot doctor quickly.', art: `${foot(170, 238, 1)}${marker(150, 150, 0)}${phone(330, 140, 0.4)}` },
],
},
move: {
title: 'How to move more each week',
scenes: [
{ say: 'Aim for 150 minutes a week of brisk walking or similar, like 30 minutes on 5 days.', art: `${calendar(100, 210, [30, 30, 0, 30, 30, 30, 0], 0.2)}${tag(240, 50, '150 minutes a week', 'var(--ht-green)', 1.6)}` },
{ say: "Spread it out. Try not to go more than 2 days in a row without being active.", art: `${calendar(100, 210, [30, 0, 30, 0, 30, 30, 30], 0)}<path class="ln a-draw" ${d(0.5)} d="M144 120 h56" stroke="var(--ht-red)"/>${check(380, 70, 0.8, 1)}` },
{ say: 'Add strength exercise 2 to 3 times a week, with weights, bands or your own body weight.', art: `${dumbbell(240, 130, 0.2)}${tag(240, 222, '2–3 times a week', 'var(--ht-brand)', 0.8)}` },
{ say: 'Sitting a lot? Every 30 minutes, stand up and move for a minute.', art: `${clock(160, 120, 54, '30 minutes', 0)}<path class="ln a-draw" ${d(0.6)} d="M240 120 H290"/><path class="ln" d="M280 108 l12 12 -12 12"/><g class="a-hop" ${d(1)}><circle class="ln fl" cx="360" cy="60" r="16"/><path class="ln" d="M360 78 V150 M360 98 l-30 22 M360 98 l30 -18 M360 150 l-22 46 M360 150 l24 44"/></g>` },
{ say: 'If you take insulin or a medicine that can make your sugar drop too low, ask your doctor for an exercise plan first.', art: `${meter(130, 60, 'ask')}${phone(330, 140, 0.4)}` },
],
},
low: {
title: 'How to treat low blood sugar: the 15-15 rule',
scenes: [
{ say: 'Feeling shaky, sweaty, hungry or confused? Check your blood sugar.', art: `${meter(194, 60, 62, 'mg/dL', 0.2)}<g class="a-shake">${['shaky', 'sweaty', 'hungry'].map((t, i) => `<text class="lbl" x="110" y="${90 + i * 40}" text-anchor="middle" opacity=".8">${t}</text>`).join('')}</g>` },
{ say: 'Under 70? Take 15 grams of fast sugar, like glucose tablets or gel.', art: `${meter(70, 60, 62)}${[0, 1, 2, 3].map((i) => pill(240 + (i % 2) * 44, 100 + Math.floor(i / 2) * 44, 0.2 + i * 0.2)).join('')}${tag(380, 122, '15 grams', 'var(--ht-carb)', 1.2)}` },
{ say: 'Wait 15 minutes.', art: `${clock(240, 120, 70, '15 minutes', 0)}` },
{ say: 'Check again. Still under 70? Take another 15 grams and wait again.', art: `${meter(110, 60, 66, 'mg/dL', 0.2)}${loop(330, 130, 56, 0.4)}<text class="lbl" x="330" y="138" text-anchor="middle">repeat</text>` },
{ say: 'Back to normal? Eat a snack or a meal so it does not drop again.', art: `${meter(90, 60, 96, 'mg/dL', 0.2)}${plateBase(330, 140, 56)}${wedge(330, 140, 56, 0, 180, 'var(--ht-green)', 0.6)}${wedge(330, 140, 56, 180, 270, 'var(--ht-protein)', 0.8)}${wedge(330, 140, 56, 270, 360, 'var(--ht-carb)', 1)}` },
{ say: "If someone isn't fully awake, don't give them food or drink. Use their glucagon and call for help.", art: `${cross(110, 90, 1.1, 0.2)}<text class="lbl s" x="110" y="146" text-anchor="middle">no food or drink</text>${at('translate(250 120)', 'a-pop', 0.7, '<rect class="ln fl" x="-18" y="-60" width="36" height="120" rx="10"/><rect x="-18" y="-30" width="36" height="28" fill="var(--ht-red)" opacity=".7"/><text class="lbl s" y="84" text-anchor="middle">glucagon</text>')}${phone(390, 130, 1.2)}` },
],
},
};
let open = null;
const VOICE_KEY = 'aim.howto.voice';
const voiceOn = () => { try { return localStorage.getItem(VOICE_KEY) !== '0'; } catch { return true; } };
const canSpeak = 'speechSynthesis' in window;
const icon = (n) => ({
play: '<svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z" fill="currentColor" stroke="none"/></svg>',
pause: '<svg viewBox="0 0 24 24"><path d="M7 5h4v14H7zM13 5h4v14h-4z" fill="currentColor" stroke="none"/></svg>',
prev: '<svg viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6"/></svg>',
next: '<svg viewBox="0 0 24 24"><path d="M9 18l6-6-6-6"/></svg>',
x: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6L6 18"/></svg>',
voice: '<svg viewBox="0 0 24 24"><path d="M4 9v6h4l5 4V5L8 9z"/><path d="M16 9a4 4 0 0 1 0 6M19 6a8 8 0 0 1 0 12"/></svg>',
yt: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4" fill="#ff0033" stroke="none"/><path d="M10 9v6l5-3z" fill="#fff" stroke="none"/></svg>',
})[n];
function show(step) {
const h = step.howto || {}, A = ANIMS[h.anim];
const videos = (h.videos || []).filter((v) => /^https:\/\/(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/.test(v.url));
if (!A && !videos.length) return;
close();
const back = document.createElement('div');
back.className = 'ht-back';
back.innerHTML = `<div class="ht glass" role="dialog" aria-modal="true" aria-label="${esc(A ? A.title : step.title)}">
<div class="ht-head"><div><p class="ht-kick">${A ? 'Animated how-to' : 'How-to videos'}</p><h3>${esc(A ? A.title : step.title)}</h3></div><button type="button" class="ht-x" aria-label="Close">${icon('x')}</button></div>
${A ? `<div class="ht-stage"><svg viewBox="0 0 ${W} ${H}" aria-hidden="true"></svg><span class="ht-n"></span></div>
<p class="ht-cap" aria-live="polite"></p>
<div class="ht-prog">${A.scenes.map((_, i) => `<button type="button" data-go="${i}" aria-label="Step ${i + 1}"><i></i></button>`).join('')}</div>
<div class="ht-ctl">
<button type="button" class="ht-b" data-a="prev" aria-label="Back">${icon('prev')}</button>
<button type="button" class="ht-b main" data-a="play" aria-label="Pause"></button>
<button type="button" class="ht-b" data-a="next" aria-label="Next">${icon('next')}</button>
${canSpeak ? `<button type="button" class="ht-voice" data-a="voice" aria-pressed="${voiceOn()}">${icon('voice')}<span>Read aloud</span></button>` : ''}
</div>` : ''}
${videos.length ? `<div class="ht-real"><h4>Watch a real video</h4>${videos.map((v) => `<a href="${esc(v.url)}" target="_blank" rel="noopener">${icon('yt')}<span><b>${esc(v.title)}</b><small>${esc(v.org)}${v.length ? ` · ${esc(v.length)}` : ''} · opens YouTube</small></span></a>`).join('')}</div>` : ''}
<p class="ht-note">${A ? 'Animation made for this guide from the step&#39;s sources and the videos above. ' : ''}Videos are from the health organisations named. Teaching only, not medical advice: follow your own care team&#39;s instructions.</p>
</div>`;
document.body.appendChild(back);
requestAnimationFrame(() => back.classList.add('on'));
const st = { back, A, i: 0, playing: true, timer: 0, utter: null, counters: [] };
open = st;
back.addEventListener('click', (e) => {
if (e.target === back || e.target.closest('.ht-x')) return close();
const go = e.target.closest('[data-go]'); if (go) return scene(Number(go.dataset.go));
const a = e.target.closest('[data-a]')?.dataset.a;
if (a === 'prev') scene(Math.max(0, st.i - 1));
if (a === 'next') scene(st.i + 1 < A.scenes.length ? st.i + 1 : 0);
if (a === 'play') { st.playing = !st.playing; if (st.playing && st.i === A.scenes.length - 1 && st.ended) scene(0); else scene(st.i, true); }
if (a === 'voice') { const on = !voiceOn(); try { localStorage.setItem(VOICE_KEY, on ? '1' : '0'); } catch {} e.target.closest('[data-a]').setAttribute('aria-pressed', String(on)); scene(st.i, true); }
});
back.querySelector('.ht-x').focus();
if (A) scene(0);
}
function stopTimers(st) {
clearTimeout(st.timer); st.counters.forEach(clearInterval); st.counters = [];
if (canSpeak) speechSynthesis.cancel();
}
function scene(i, keepArt) {
const st = open; if (!st?.A) return;
stopTimers(st);
const A = st.A, sc = A.scenes[i], b = st.back;
st.i = i; st.ended = false;
if (!keepArt || st.drawn !== i) {
const svg = b.querySelector('.ht-stage svg');
svg.innerHTML = sc.art;
st.drawn = i;
svg.querySelectorAll('[data-count]').forEach((el) => {
const to = Number(el.dataset.count); if (!Number.isFinite(to) || !to) return;
const start = performance.now() + Number(el.dataset.delay || 0) * 1000, dur = 900;
el.textContent = '0';
st.counters.push(setInterval(() => { const t = Math.min(1, Math.max(0, (performance.now() - start) / dur)); el.textContent = Math.round(to * (1 - Math.pow(1 - t, 3))); }, 40));
});
}
b.querySelector('.ht-cap').textContent = sc.say;
b.querySelector('.ht-n').textContent = `${i + 1} / ${A.scenes.length}`;
b.querySelectorAll('.ht-prog button').forEach((x, k) => { x.classList.toggle('done', k < i); x.classList.toggle('now', k === i); x.style.setProperty('--dur', `${dwell(sc)}ms`); });
b.querySelector('.ht-stage').classList.toggle('paused', !st.playing);
b.querySelector('.ht-prog').classList.toggle('paused', !st.playing);
const pb = b.querySelector('[data-a=play]');
pb.innerHTML = icon(st.playing ? 'pause' : 'play'); pb.setAttribute('aria-label', st.playing ? 'Pause' : 'Play');
if (!st.playing) return;
const advance = () => {
if (open !== st) return;
if (st.i + 1 < A.scenes.length) scene(st.i + 1);
else { st.playing = false; st.ended = true; pb.innerHTML = icon('play'); pb.setAttribute('aria-label', 'Play again'); b.querySelector('.ht-prog').classList.add('paused'); }
};
if (canSpeak && voiceOn()) {
const u = new SpeechSynthesisUtterance(sc.say);
u.rate = 0.95; u.lang = 'en-US';
u.onend = () => { if (open === st && st.utter === u) st.timer = setTimeout(advance, 900); };
st.utter = u;
speechSynthesis.speak(u);
st.timer = setTimeout(advance, Math.max(dwell(sc), 16000)); // in case the voice never reports back
} else {
st.timer = setTimeout(advance, dwell(sc));
}
}
const dwell = (sc) => Math.max(4200, sc.say.split(/\s+/).length * 330 + 1600);
function close() {
if (!open) return;
const st = open; open = null;
stopTimers(st);
st.back.classList.remove('on');
setTimeout(() => st.back.remove(), 220);
}
document.addEventListener('keydown', (e) => {
if (!open) return;
if (e.key === 'Escape') close();
if (!open?.A) return;
if (e.key === 'ArrowRight') scene(Math.min(open.A.scenes.length - 1, open.i + 1));
if (e.key === 'ArrowLeft') scene(Math.max(0, open.i - 1));
});
window.aimHowTo = { show, has: (step) => Boolean(step?.howto && (ANIMS[step.howto.anim] || (step.howto.videos || []).length)), ANIMS };
})();