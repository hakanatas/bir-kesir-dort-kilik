/* Shared layout + Nokta helpers for "Bir Kesir, Dört Kılık". */
(function (LI) {
  'use strict';
  const { clamp } = LI.E;
  LI.KD = {
    /** positions for 16:9 and 9:16 */
    L(env) {
      return env.V
        ? {
          CX: { x: 0, y: -780, s: 42, w: 980 },
          G: { s: 40 }, GRID: { x: -290, y: -710, c: 28 }, EQ: [230, -560], CARDS: [[0, -690], [0, -590], [0, -490], [0, -390]],
          CUPS: { x: [-240, 0, 240], y: -600, w: 110, h: 150 }, NL: { x0: -420, x1: 420, y: -370 }, BAR: { x: 20, y: -640, w: 480, h: 70 }, IC: { x: [-280, 0, 280], y: -560 },
          W: { x: 0, y: [-190, -105, -20], s: 42, w: 980 },
          SUM: { x: 0, y: [-240, -150, -60, 40], s: 42, w: 980 },
          nx: -360, gy: 560, s: 1.15 }
        : {
          CX: { x: 60, y: -445, s: 48, w: 1300 },
          G: { s: 44 }, GRID: { x: -270, y: -370, c: 31 }, EQ: [470, -230], CARDS: [[-20, -330], [480, -330], [-20, -190], [480, -190]],
          CUPS: { x: [-190, 0, 190], y: -250, w: 110, h: 150 }, NL: { x0: -250, x1: 560, y: -40 }, BAR: { x: 180, y: -250, w: 440, h: 70 }, IC: { x: [-150, 200, 540], y: -240 },
          W: { x: 110, y: [128, 196, 262], s: 46, w: 1250 },
          SUM: { x: 110, y: [10, 90, 170, 250], s: 48, w: 1250 },
          nx: -800, gy: 262, s: 1.15 };
    },
    cam(env, o = {}) { return Object.assign({ x: env.V ? 0 : -60, y: env.V ? 60 : 0, zoom: 1, rot: 0, tilt: 1 }, o); },
    /** pupils + face toward a world point */
    look(p, target) {
      const e = LI.Nokta.eyes(p)[0];
      const dx = target[0] - e[0], dy = target[1] - e[1], d = Math.hypot(dx, dy) || 1;
      p.lookX = clamp(dx / d * 1.1, -1, 1); p.lookY = clamp(dy / d * 1.1, -1, 1);
      p.turn = clamp(dx / 900, -0.5, 0.5);
      return p;
    },
    /** a short ground stroke under Nokta */
    ground(ctx, env, x, gy) { LI.Ambient.ground(ctx, x - 360, x + 360, gy + 6, { alpha: 0.32 }); },
  };
})(window.LI = window.LI || {});
