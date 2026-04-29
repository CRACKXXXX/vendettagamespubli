/* ═══════════════════════════════════════════════
   VENDETTA GAMES II — main.js
   Escalado dinámico (letterboxing) + Countdown + Partículas
   ─────────────────────────────────────────────
   Técnica elegida: transform: scale()
   ─ GPU-accelerated (compositor thread)
   ─ No altera layout / document flow
   ─ Estándar CSS → comportamiento predecible en CEF
   ─ translateZ(0) fuerza capa de composición (antiblur)
═══════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── ESCALADO DINÁMICO (LETTERBOXING DUI/NUI) ────── */
  /*
     Problema: En DUI de FiveM (TVs in-game), window.innerWidth
     puede devolver la resolución del monitor del jugador en vez
     de la resolución real del surface DUI. Esto hace que
     scale = 1.0 y no se escala nada → contenido recortado.

     Solución: Usar document.documentElement.clientWidth/Height
     que reporta el viewport CSS real del browser surface.
     Además, transform-origin: 0 0 con translate() para centrar.
  */

  var DESIGN_W = 1920;
  var DESIGN_H = 1080;
  var wrapper  = null;
  var rafId    = 0;

  // Detección robusta del viewport real del DUI
  function getViewport() {
    // clientWidth/Height del <html> → viewport CSS real (fiable en DUI)
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;

    // Fallback a window.innerWidth si clientWidth devuelve 0
    var w = cw > 0 ? cw : (window.innerWidth  || DESIGN_W);
    var h = ch > 0 ? ch : (window.innerHeight || DESIGN_H);

    return { w: w, h: h };
  }

  function applyScale() {
    if (!wrapper) wrapper = document.getElementById('fivem-wrapper');
    if (!wrapper) return;

    var vp = getViewport();

    // Letterbox: escalar al máximo sin deformar ni recortar
    var scale = Math.min(vp.w / DESIGN_W, vp.h / DESIGN_H);

    // Calcular offset para centrar (letterbox negro alrededor)
    var scaledW = DESIGN_W * scale;
    var scaledH = DESIGN_H * scale;
    var offsetX = (vp.w - scaledW) / 2;
    var offsetY = (vp.h - scaledH) / 2;

    // translate() centra + scale() escala — origin es 0,0
    wrapper.style.transform =
      'translate(' + offsetX + 'px,' + offsetY + 'px) scale(' + scale + ')';
  }

  // Ejecutar al cargar
  applyScale();

  // Ejecutar en resize con throttle vía rAF
  window.addEventListener('resize', function () {
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(function () {
      applyScale();
      updateDebug();
    });
  });

  /* ── PANEL DE DEBUG VISUAL (esquina superior izquierda) ── */
  var debugEl = null;

  function createDebugPanel() {
    debugEl = document.createElement('div');
    debugEl.id = 'vg2-debug';
    debugEl.style.cssText = [
      'position:fixed',
      'top:8px',
      'left:8px',
      'z-index:99999',
      'background:rgba(0,0,0,0.85)',
      'color:#0f0',
      'font-family:monospace',
      'font-size:11px',
      'padding:8px 12px',
      'border:1px solid #0f0',
      'border-radius:4px',
      'line-height:1.5',
      'pointer-events:none',
      'white-space:pre'
    ].join(';');
    document.body.appendChild(debugEl);
  }

  function updateDebug() {
    if (!debugEl) return;
    var cw = document.documentElement.clientWidth;
    var ch = document.documentElement.clientHeight;
    var iw = window.innerWidth;
    var ih = window.innerHeight;
    var vp = getViewport();
    var scale = Math.min(vp.w / DESIGN_W, vp.h / DESIGN_H);

    debugEl.textContent =
      '[VG2 v3] Debug Panel\n' +
      'clientW/H:  ' + cw + ' x ' + ch + '\n' +
      'innerW/H:   ' + iw + ' x ' + ih + '\n' +
      'viewport:   ' + vp.w + ' x ' + vp.h + '\n' +
      'scale:      ' + scale.toFixed(4) + '\n' +
      'transform:  ' + (wrapper ? wrapper.style.transform : 'N/A');
  }

  createDebugPanel();
  updateDebug();

  // Actualizar debug cada segundo (por si cambia algo)
  setInterval(updateDebug, 1000);


  /* ── SISTEMA DE TEST DE RESOLUCIONES ───────────
     Uso desde la consola del navegador (F12):
       testRes(1280, 720)    → simula TV 720p
       testRes(1920, 1080)   → nativo (scale = 1)
       testRes(800, 600)     → TV 4:3 antiguo
       testRes(512, 288)     → DUI típico FiveM TV
       testRes(3440, 1440)   → ultrawide 21:9
       testRes()             → restaurar al viewport real
  ────────────────────────────────────────────── */
  window.testRes = function (w, h) {
    if (!wrapper) wrapper = document.getElementById('fivem-wrapper');
    if (!wrapper) return;

    var root = document.documentElement;

    if (!w || !h) {
      // Restaurar
      root.style.width  = '';
      root.style.height = '';
      root.style.maxWidth  = '';
      root.style.maxHeight = '';
      applyScale();
      var vp = getViewport();
      console.log('[VG2] Restaurado → ' + vp.w + 'x' + vp.h);
      return;
    }

    // Forzar <html> al tamaño simulado
    root.style.width  = w + 'px';
    root.style.height = h + 'px';
    root.style.maxWidth  = w + 'px';
    root.style.maxHeight = h + 'px';

    var scale = Math.min(w / DESIGN_W, h / DESIGN_H);
    var scaledW = DESIGN_W * scale;
    var scaledH = DESIGN_H * scale;
    var offsetX = (w - scaledW) / 2;
    var offsetY = (h - scaledH) / 2;

    wrapper.style.transform =
      'translate(' + offsetX + 'px,' + offsetY + 'px) scale(' + scale + ')';

    console.log(
      '[VG2] Simulando ' + w + 'x' + h +
      ' | Ratio: ' + (w / h).toFixed(2) +
      ' | Scale: ' + scale.toFixed(4) +
      ' | Offset: ' + offsetX.toFixed(0) + ',' + offsetY.toFixed(0)
    );
  };


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
