/* SAHNE 1 — HAYATTAKİ KESİRLER (0–10 s)  Fractions in different clothes.
   The whole film's drawing lives in LI.world(t); each scene only sets the camera. */
(function (LI) {
  'use strict';
  const { seg, lerp, inOut } = LI.E;
  const KD = LI.KD, F = () => LI.Film, A = LI.Ang, Ink = LI.Ink;
  const END = (t) => 1 - seg(t, 90.4, 91.4);

  function win(t, a, b, fi = 0.4, fo = 0.4) { return seg(t, a, a + fi) * (1 - seg(t, b - fo, b)); }
  function exprs(ctx, t, P, list, sz) {
    const f = F();
    list.forEach(([a, b, items, hot]) => {
      const al = win(t, a, b); if (al <= 0) return;
      f.expr(ctx, typeof items === 'string' ? [items] : items, P.x, P.y, sz ?? P.s, { alpha: al, w: P.w, halo: true, color: hot ? A.amber : undefined });
    });
  }
  const at = (P, k, y) => ({ x: P.x, y: y ?? P.y[k], s: P.s, w: P.w });
  const amber = (a) => `rgba(${LI.AMBER_RGB},${a})`;
  const ink = (a) => `rgba(${LI.INK_RGB},${a})`;
  const fr = (n, d, h) => F().fr(n, d, h);

  /** a hundred grid with n cells shaded; block = shade a 5 × 5 corner instead of row by row */
  function grid(ctx, G, n, a, seed, block, s = 1) {
    if (a <= 0) return;
    const c = G.c * s;
    for (let i = 0; i < 100; i++) {
      const r = Math.floor(i / 10), q = i % 10, x = G.x + q * c, y = G.y + r * c;
      const on = block ? (r >= 5 && q < 5 && (r - 5) * 5 + q < n) : (99 - i) < n;
      ctx.fillStyle = on ? amber(0.8 * a) : ink(0.05 * a); ctx.fillRect(x + 1.5, y + 1.5, c - 3, c - 3);
    }
    ctx.strokeStyle = ink(0.45 * a); ctx.lineWidth = 1.5; ctx.beginPath();
    for (let i = 0; i <= 10; i++) { ctx.moveTo(G.x + i * c, G.y); ctx.lineTo(G.x + i * c, G.y + 10 * c); ctx.moveTo(G.x, G.y + i * c); ctx.lineTo(G.x + 10 * c, G.y + i * c); }
    ctx.stroke();
    Ink.path(ctx, [[G.x, G.y], [G.x + 10 * c, G.y], [G.x + 10 * c, G.y + 10 * c], [G.x, G.y + 10 * c], [G.x, G.y]], { w: 5, alpha: a, seed, taper: [0, 0] });
  }
  /** a cup (trapezoid) filled to level l (0..1), with quarter marks */
  function cup(ctx, x, y, w, h, l, a, seed) {
    if (a <= 0) return;
    const top = [[x - w / 2, y - h / 2], [x + w / 2, y - h / 2]], bot = [[x - w * 0.36, y + h / 2], [x + w * 0.36, y + h / 2]];
    if (l > 0) {
      const yl = y + h / 2 - h * l, wl = (t) => lerp(w * 0.36, w / 2, t);
      ctx.fillStyle = amber(0.55 * a); ctx.beginPath(); ctx.moveTo(bot[0][0], bot[0][1]); ctx.lineTo(bot[1][0], bot[1][1]); ctx.lineTo(x + wl(l), yl); ctx.lineTo(x - wl(l), yl); ctx.closePath(); ctx.fill();
    }
    Ink.path(ctx, [top[0], bot[0], bot[1], top[1]], { w: 5, alpha: a, seed, taper: [0, 0], wob: 0.2 });
    [0.25, 0.5, 0.75].forEach((q, i) => { const yy = y + h / 2 - h * q, xx = x + lerp(w * 0.36, w / 2, q); Ink.path(ctx, [[xx - 16, yy], [xx, yy]], { w: 3, alpha: a * 0.6, seed: seed + 3 + i, taper: [0, 0] }); });
  }

  function context(ctx, env, t) {
    exprs(ctx, t, KD.L(env).CX, [
      [4.4, 10.2, 'Kesirler hayatta farklı kılıklarda karşımıza çıkar'],
      [10.6, 27.8, 'Markette: 0,75 kg peynir. Hangi model?'],
      [28.4, 45.8, 'Tarifte: 2 1/4 su bardağı un'],
      [46.4, 63.8, 'Mağazada: %25 indirim'],
      [64.4, 79.8, 'Hangi model, ne zaman kullanışlı?'],
    ]);
  }

  function cards(ctx, env, t) {
    const L = KD.L(env), f = F(), a = win(t, 4.8, 10.2); if (a <= 0) return;
    const C = L.CARDS, s = L.G.s;
    [[['Tarif: ', '2', fr(1, 4), ' su bardağı un'], 'tam sayılı kesir'], [['Market: 0,75 kg peynir'], 'ondalık gösterim'],
      [['Kampanya: %25 indirim'], 'yüzde'], [['Şişe: ', fr(5, 4), ' litre süt'], 'bileşik kesir']].forEach(([items, type], i) => {
      const k = seg(t, 5.0 + i * 0.9, 5.5 + i * 0.9) * a; if (k <= 0) return;
      f.expr(ctx, items, C[i][0], C[i][1], s * 0.95, { alpha: k, halo: true });
      f.T(ctx, type, C[i][0], C[i][1] + s * 0.95, Object.assign({ size: s * 0.6, alpha: k }, f.AMB));
    });
  }

  function models(ctx, env, t) {
    const L = KD.L(env), f = F(), a = END(t), s = L.G.s;
    // 10–28: the hundred grid, 75 cells
    const g1 = win(t, 10.8, 27.8) * a;
    if (g1 > 0) {
      grid(ctx, L.GRID, Math.round(75 * seg(t, 12.4, 15.4)), g1, 3600, false);
      const q = seg(t, 21.0, 21.6) * g1, c = L.GRID.c, cx = L.GRID.x + 5 * c, cy = L.GRID.y + 5 * c;
      if (q > 0) { Ink.path(ctx, [[cx, L.GRID.y], [cx, L.GRID.y + 10 * c]], { w: 5, alpha: q, color: LI.AMBER_RGB, seed: 3610, taper: [0, 0] }); Ink.path(ctx, [[L.GRID.x, cy], [L.GRID.x + 10 * c, cy]], { w: 5, alpha: q, color: LI.AMBER_RGB, seed: 3611, taper: [0, 0] }); }
      const e = seg(t, 15.8, 16.4) * g1;
      if (e > 0) f.expr(ctx, [fr(75, 100), ' = 0,75'], L.EQ[0], L.EQ[1] - 60, s * 1.1, { alpha: e, halo: true });
      const e2 = seg(t, 19.6, 20.2) * g1;
      if (e2 > 0) f.expr(ctx, ['= %75 = ', fr(3, 4, true)], L.EQ[0], L.EQ[1] + 50, s * 1.1, { alpha: e2, halo: true });
    }
    // 28–46: cups and the number line
    const g2 = win(t, 28.4, 45.8) * a;
    if (g2 > 0) {
      const C = L.CUPS;
      [1, 1, 0.25].forEach((l, i) => cup(ctx, C.x[i], C.y, C.w, C.h, l * seg(t, 29.0 + i * 0.6, 29.8 + i * 0.6), g2, 3620 + i * 6));
      const qk = seg(t, 33.0, 34.6) * g2;
      if (qk > 0) [4, 4, 1].forEach((n, i) => f.T(ctx, `${n} çeyrek`, C.x[i], C.y + C.h / 2 + 34, Object.assign({ size: s * 0.62, alpha: qk }, f.AMB)));
      const N = L.NL, nk = seg(t, 34.6, 35.4) * g2, X = (v) => lerp(N.x0, N.x1, v / 3);
      if (nk > 0) {
        Ink.path(ctx, [[N.x0 - 20, N.y], [N.x1 + 20, N.y]], { w: 4, p: seg(t, 34.6, 35.4), alpha: g2, seed: 3640, taper: [0, 0] });
        for (let i = 0; i <= 12; i++) { const x = X(i / 4), big = i % 4 === 0; Ink.path(ctx, [[x, N.y - (big ? 16 : 9)], [x, N.y + (big ? 16 : 9)]], { w: big ? 4 : 2.5, alpha: nk, seed: 3650 + i, taper: [0, 0] }); if (big) f.T(ctx, String(i / 4), x, N.y + 38, { size: s * 0.7, alpha: nk }); }
        const pk = seg(t, 36.0, 37.0), px = X(2.25 * inOut(pk));
        ctx.fillStyle = amber(g2 * nk); ctx.beginPath(); ctx.arc(px, N.y, 11, 0, Math.PI * 2); ctx.fill();
        if (pk >= 1) f.expr(ctx, ['2', fr(1, 4, true), ' = ', fr(9, 4, true), ' = 2,25'], px, N.y - 56, s * 0.8, { alpha: g2, halo: true });
      }
    }
    // 46–64: %25 on the grid and on 80 TL
    const g3 = win(t, 46.4, 63.8) * a;
    if (g3 > 0) {
      grid(ctx, L.GRID, Math.round(25 * seg(t, 47.4, 49.4)), g3, 3660, true);
      const B = L.BAR, bk = seg(t, 54.0, 55.0) * g3;
      if (bk > 0) {
        for (let i = 0; i < 4; i++) {
          const x = B.x + i * B.w / 4;
          if (i === 0) { ctx.fillStyle = amber(0.6 * bk); ctx.fillRect(x, B.y, B.w / 4, B.h); }
          Ink.path(ctx, [[x, B.y], [x + B.w / 4, B.y], [x + B.w / 4, B.y + B.h], [x, B.y + B.h], [x, B.y]], { w: 4, alpha: bk, seed: 3670 + i, taper: [0, 0] });
          f.T(ctx, '20 TL', x + B.w / 8, B.y + B.h / 2, { size: s * 0.62, alpha: bk });
        }
        f.T(ctx, '80 TL', B.x + B.w / 2, B.y - 34, { size: s * 0.72, alpha: bk });
        f.T(ctx, '%25 = 20 TL indirim', B.x + B.w / 8, B.y + B.h + 36, Object.assign({ size: s * 0.62, alpha: bk, align: 'left' }, f.AMB));
      }
      const e = seg(t, 50.6, 51.2) * g3;
      if (e > 0) f.expr(ctx, ['%25 = ', fr(25, 100), ' = ', fr(1, 4, true)], L.BAR.x + L.BAR.w / 2, L.BAR.y + L.BAR.h + 120, s * 0.95, { alpha: e, halo: true });
    }
    // 64–80: three mini models
    const g4 = win(t, 64.6, 79.8) * a;
    if (g4 > 0) {
      const I = L.IC, lab = ['yüzlük kart', 'sayı doğrusu', 'somut model'], use = ['ondalık ve yüzde', '1’den büyük kesirler', 'günlük durumlar'];
      I.x.forEach((x, i) => {
        const k = seg(t, 65.0 + i * 1.8, 65.6 + i * 1.8) * g4; if (k <= 0) return;
        if (i === 0) grid(ctx, { x: x - 70, y: I.y - 70, c: 14 }, 75, k, 3680, false);
        if (i === 1) { Ink.path(ctx, [[x - 120, I.y], [x + 120, I.y]], { w: 4, alpha: k, seed: 3690, taper: [0, 0] }); [0, 1, 2].forEach((v) => { Ink.path(ctx, [[x - 100 + v * 100, I.y - 12], [x - 100 + v * 100, I.y + 12]], { w: 3, alpha: k, seed: 3691 + v, taper: [0, 0] }); f.T(ctx, String(v), x - 100 + v * 100, I.y + 30, { size: s * 0.55, alpha: k }); }); ctx.fillStyle = amber(k); ctx.beginPath(); ctx.arc(x + 25, I.y, 9, 0, Math.PI * 2); ctx.fill(); }
        if (i === 2) cup(ctx, x, I.y, 90, 120, 0.25, k, 3695);
        f.T(ctx, lab[i], x, I.y + 105, { size: s * 0.72, alpha: k });
        f.T(ctx, use[i], x, I.y + 150, Object.assign({ size: s * 0.6, alpha: k * seg(t, 72.2, 72.8) }, f.AMB));
      });
    }
  }

  function words(ctx, env, t) {
    const W = KD.L(env).W;
    exprs(ctx, t, at(W, 0), [[5.4, 10.2, 'Tam sayılı, ondalık, yüzde, bileşik: hepsi kesir'], [11.4, 27.8, 'Yüzlük kart: 100 eşit kare, 1 bütün'],
      [29.4, 45.8, 'Somut model: 2 dolu bardak ve bir çeyrek'], [47.0, 63.8, '%25 = 25/100: yüzlük kartta 25 kare'],
      [65.0, 79.8, 'Yüzlük kart: ondalık ve yüzde kolay okunur']]);
    exprs(ctx, t, at(W, 1), [[15.8, 27.8, '75 kare boyalı: 75/100 = 0,75'], [33.0, 45.8, 'Kaç çeyrek? 4 + 4 + 1 = 9 çeyrek: 9/4'],
      [50.6, 63.8, '25 kare, yüzlük kartın dörtte biri: 1/4'], [68.6, 79.8, 'Sayı doğrusu: 1’den büyük kesirleri yerleştirmek kolay']]);
    exprs(ctx, t, at(W, 2), [[19.6, 27.8, '0,75 = %75 = 3/4: dörtte üç', true], [37.0, 45.8, '2 1/4 = 9/4 = 2,25: aynı miktar', true],
      [54.4, 63.8, '80 TL’nin %25’i: dörtte biri, 20 TL', true], [72.2, 79.8, 'Karar: duruma en uygun modeli seç', true]]);
  }

  function summary(ctx, env, t) {
    if (t < 80.4) return;
    const S = KD.L(env).SUM, f = F(), a = END(t);
    [['Bir kesir, farklı gösterimler: 3/4 = 0,75 = %75', 80.6], ['Yüzlük kart: ondalık ve yüzde', 81.6], ['Sayı doğrusu: tam sayılı ve bileşik kesirler', 82.6], ['Duruma uygun modeli seç!', 83.6, true]].forEach(([s, t0, hot], i) => {
      const al = seg(t, t0, t0 + 0.4) * a; if (al <= 0) return;
      f.expr(ctx, [s], S.x, S.y[i], S.s * (i === 3 ? 1.15 : 1), { alpha: al, w: S.w, halo: true, color: hot ? A.amber : undefined });
    });
  }

  LI.fireworks = function (ctx, env, t) {
    const k = seg(t, 84.4, 86.4);
    if (k <= 0 || t >= 91) return;
    const n = F().nokta(t, env), C = [n.x, n.y - 170];
    [30, 60, 90, 120, 150].forEach((d, i) => {
      const r = 150 + 30 * Math.sin(t * 2 + i);
      A.arc(ctx, C, r, d - 12, d + 12, { p: seg(k, i * 0.12, i * 0.12 + 0.4), alpha: 0.8 * (1 - seg(t, 90.2, 91)), w: 6, seed: 80 + i });
    });
  };

  LI.world = function (ctx, env, t) { context(ctx, env, t); cards(ctx, env, t); models(ctx, env, t); words(ctx, env, t); summary(ctx, env, t); };

  function camera(t, env) {
    const L = KD.L(env);
    return LI.Camera.breathe(LI.Camera.track([
      [0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [3.0, KD.cam(env, { x: L.nx, y: env.V ? 380 : 140, zoom: 1.6 })],
      [4.8, KD.cam(env, { zoom: 1 })],
    ], t), t, 0.5);
  }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 1, start: 0, end: 10, name: 'Fractions in life', nameTr: 'Hayattaki kesirler', concept: 'Many forms', conceptTr: 'Farklı gösterimler', render });
})(window.LI = window.LI || {});
