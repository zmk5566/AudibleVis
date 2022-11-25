function setup() {
    // mimics the autoplay policy
    global_audio_context = getAudioContext();
    getAudioContext().suspend();
  }
  function draw() {
    background(220);
    textAlign(CENTER, CENTER);
    text(getAudioContext().state, width/2, height/2);
  }
  function mousePressed() {
    userStartAudio();
  }

  function touchStarted() {
    if (getAudioContext().state !== 'running') {
      getAudioContext().resume();
    }
    var synth = new p5.MonoSynth();
    synth.play('A4', 0.5, 0, 0.2);
  }