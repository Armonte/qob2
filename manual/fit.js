// Fit every overlay text to its box: wrap at spaces, then shrink in half-pixel steps until nothing overflows
// (never below 7 px; only then may long words break). Runs again when the fonts finish loading.
(function () {
  function fit(box) {
    var s = box.firstElementChild;
    if (!s) return;
    var max = parseFloat(getComputedStyle(box).getPropertyValue('--max')) || 16;
    var px = max;
    s.style.fontSize = px + 'px';
    box.classList.remove('brk');
    while (px > 7 && (s.scrollWidth > box.clientWidth + 0.5 || s.offsetHeight > box.clientHeight + 0.5)) {
      px -= 0.5;
      s.style.fontSize = px + 'px';
    }
    if (s.scrollWidth > box.clientWidth + 0.5 || s.offsetHeight > box.clientHeight + 0.5) box.classList.add('brk');
  }
  function all() { document.querySelectorAll('.fig .t').forEach(fit); }
  all();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(all);
  window.addEventListener('load', all);
})();
