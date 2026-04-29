/* ═══════════════════════════════════════════════
   VENDETTA GAMES II — main.js
   Escalado dinámico (letterboxing) + Countdown + Partículas
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── ESCALADO DINÁMICO (LETTERBOXING) ────────── */

  var DESIGN_W = 1920;
  var DESIGN_H = 1080;

  function scaleWrapper() {
    var wrapper = document.getElementById('fivem-wrapper');
    if (!wrapper) return;
    var scaleX = window.innerWidth  / DESIGN_W;
    var scaleY = window.innerHeight / DESIGN_H;
    var scale  = Math.min(scaleX, scaleY);
    wrapper.style.transform = 'scale(' + scale + ')';
  }

  scaleWrapper();
  window.addEventListener('resize', scaleWrapper);

  /* ── CUENTA REGRESIVA ─────────────────────── */

  // Fecha objetivo: 16 de mayo de 2026 a las 22:00 CEST (UTC+2)
  var TARGET = new Date('2026-05-16T22:00:00+02:00').getTime();

  var dEl = document.getElementById('cd-days');
  var hEl = document.getElementById('cd-hours');
  var mEl = document.getElementById('cd-mins');
  var sEl = document.getElementById('cd-secs');

  // Valores anteriores para detectar cambio y animar
  var prev = { d: -1, h: -1, m: -1, s: -1 };

  function pad(n) {
    return n < 10 ? '0' + n : '' + n;
  }

  function animateNum(el, val) {
    el.classList.remove('flip');
    // Fuerza reflow para reiniciar la animación
    void el.offsetWidth;
    el.textContent = val;
    el.classList.add('flip');
  }

  function tick() {
    var now  = Date.now();
    var diff = TARGET - now;

    if (diff <= 0) {
      animateNum(dEl, '00');
      animateNum(hEl, '00');
      animateNum(mEl, '00');
      animateNum(sEl, '00');
      clearInterval(timer);
      return;
    }

    var totalSecs = Math.floor(diff / 1000);
    var d = Math.floor(totalSecs / 86400);
    var h = Math.floor((totalSecs % 86400) / 3600);
    var m = Math.floor((totalSecs % 3600) / 60);
    var s = totalSecs % 60;

    if (d !== prev.d) { animateNum(dEl, pad(d)); prev.d = d; }
    if (h !== prev.h) { animateNum(hEl, pad(h)); prev.h = h; }
    if (m !== prev.m) { animateNum(mEl, pad(m)); prev.m = m; }
    if (s !== prev.s) { animateNum(sEl, pad(s)); prev.s = s; }
  }

  tick();
  var timer = setInterval(tick, 1000);

  /* ── PARTÍCULAS DE BRASA ──────────────────── */

  var EMBER_COUNT = 14;

  var emberData = [
    { size: '3px',  bottom: '8%',  left: '5%',   duration: '9s',  delay: '0s',   drift: '20px'  },
    { size: '2px',  bottom: '5%',  left: '12%',  duration: '11s', delay: '1.5s', drift: '-15px' },
    { size: '4px',  bottom: '10%', left: '22%',  duration: '8s',  delay: '3s',   drift: '30px'  },
    { size: '2px',  bottom: '6%',  left: '35%',  duration: '13s', delay: '0.5s', drift: '-22px' },
    { size: '3px',  bottom: '12%', left: '45%',  duration: '10s', delay: '4s',   drift: '18px'  },
    { size: '2px',  bottom: '4%',  left: '55%',  duration: '12s', delay: '2s',   drift: '-28px' },
    { size: '4px',  bottom: '9%',  left: '65%',  duration: '7s',  delay: '1s',   drift: '24px'  },
    { size: '2px',  bottom: '7%',  left: '75%',  duration: '14s', delay: '3.5s', drift: '-18px' },
    { size: '3px',  bottom: '11%', left: '82%',  duration: '9s',  delay: '0.8s', drift: '16px'  },
    { size: '2px',  bottom: '5%',  left: '90%',  duration: '11s', delay: '2.5s', drift: '-26px' },
    { size: '3px',  bottom: '8%',  left: '18%',  duration: '10s', delay: '5s',   drift: '20px'  },
    { size: '2px',  bottom: '6%',  left: '50%',  duration: '8s',  delay: '6s',   drift: '-14px' },
    { size: '4px',  bottom: '13%', left: '30%',  duration: '12s', delay: '1.2s', drift: '22px'  },
    { size: '2px',  bottom: '4%',  left: '70%',  duration: '9s',  delay: '4.5s', drift: '-20px' },
  ];

  function createEmbers() {
    var wrapper = document.getElementById('fivem-wrapper');
    if (!wrapper) return;
    var frag = document.createDocumentFragment();
    for (var i = 0; i < emberData.length; i++) {
      var e = emberData[i];
      var el = document.createElement('div');
      el.className = 'ember';
      el.style.cssText = [
        '--size:'     + e.size,
        '--bottom:'   + e.bottom,
        '--left:'     + e.left,
        '--duration:' + e.duration,
        '--delay:'    + e.delay,
        '--drift:'    + e.drift,
        'width:'      + e.size,
        'height:'     + e.size,
        'bottom:'     + e.bottom,
        'left:'       + e.left,
      ].join(';');
      frag.appendChild(el);
    }
    wrapper.appendChild(frag);
  }

  createEmbers();

})();
