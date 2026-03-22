// Click sound — only on theme toggle
(function() {
  var ctx, unlocked = false;
  function getCtx() {
    if (!ctx) ctx = new (window.AudioContext || window.webkitAudioContext)();
    return ctx;
  }
  function unlock() {
    if (unlocked) return;
    var c = getCtx();
    if (c.state === "suspended") c.resume();
    var b = c.createBuffer(1, 1, 22050);
    var s = c.createBufferSource();
    s.buffer = b;
    s.connect(c.destination);
    s.start(0);
    unlocked = true;
  }
  function playClick() {
    try {
      var c = getCtx();
      if (c.state === "suspended") c.resume();
      var t = c.currentTime;
      var sr = c.sampleRate;
      var len = Math.floor(sr * 0.012);
      var buf = c.createBuffer(1, len, sr);
      var data = buf.getChannelData(0);
      for (var i = 0; i < len; i++) {
        var env = Math.exp(-i / (sr * 0.002));
        data[i] = (Math.random() * 2 - 1) * env * 0.4;
      }
      var src = c.createBufferSource();
      var filter = c.createBiquadFilter();
      var gain = c.createGain();
      filter.type = "bandpass";
      filter.frequency.value = 3000;
      filter.Q.value = 1.5;
      gain.gain.value = 0.15;
      src.buffer = buf;
      src.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      src.start(t);
    } catch(e) {}
  }
  document.addEventListener("touchstart", unlock, {once: true});
  document.addEventListener("click", function(e) {
    unlock();
    if (e.target.closest("#theme-toggle")) playClick();
  });
})();
