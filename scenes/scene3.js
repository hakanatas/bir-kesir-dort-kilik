/* SAHNE 3 — SOMUT MODEL VE SAYI DOĞRUSU (28–46 s) */
(function (LI) {
  'use strict';
  const KD = LI.KD, F = () => LI.Film;
  function camera(t, env) { return LI.Camera.breathe(KD.cam(env, { zoom: 1 }), t, 0.4); }
  function render(ctx, lt, env, t) { F().base(ctx, env, t, camera(t, env), () => LI.world(ctx, env, t)); }
  LI.registerScene({ id: 3, start: 28, end: 46, name: "Cups and a number line", nameTr: "Somut model ve sayı doğrusu", concept: "2 1/4 = 9/4 = 2,25", conceptTr: "2 1/4 = 9/4 = 2,25", render });
})(window.LI = window.LI || {});
