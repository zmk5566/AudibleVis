/**
 *  Re-group the FFT into more meaningful values by 
 *  splitting into one-third-octave bands,
 *  and by smoothing each point with its neighbors.
 *  
 *  Plot over time.
 */

var mic, fft,osc,currentSource;

// height of fft == height/divisions
var divisions = 5;
var cnv;
var speed = 2;
var logView = true;
var wave_scale=1.2;
var inputMode = 1;


var unknow_pleaseure_cnv,waveform_vis,freq_vis,spectro_vis;

function setup() {
  cnv = createCanvas(1200, 800);
  
  //create a gui
  var gui = createGui('Settings').setPosition(width - 220, 50);
  sliderRange(1, 6, 1);
  gui.addGlobals('speed', 'logView');
  sliderRange(1, 2, 0.1);
  gui.addGlobals('wave_scale');
  soundFile = loadSound('../res/aiyuao.mp3');
  currentSource = "mic";

  
  //initialize unknown pleasure
  unknow_pleaseure_cnv = createGraphics(1200, 400);
  unknow_pleaseure_cnv.noFill();
  unknow_pleaseure_cnv.stroke(0,100);
  
  
  //initialize waveform visualization
  waveform_vis = createGraphics(400, 400);
  
  
  //initialize frequency
  freq_vis = createGraphics(400, 400);
  
  //initialize spectrograph
  spectro_vis = createGraphics(400, 400);
  
  //initialize audio source
  mic = new p5.AudioIn();
  mic.start();

  osc = new p5.Oscillator();
  osc.amp(0.5);
  
  //initialzie fast fourier transform
  fft = new p5.FFT(0.9, 1024);
  fft.setInput(mic);
  
}

function draw() {
  background(0);
  var spectrum = fft.analyze();
  var waveform = fft.waveform();
  
  
  //display unknowpleasure
  process_draw_unknown_pleasure(spectrum);
  image(unknow_pleaseure_cnv, 0, 400);
  
  // display waveform
  process_display_waveform(waveform);
  image(waveform_vis, 400, 0);
  
  // display frequency width
  process_display_frequency(spectrum);
  image(freq_vis, 800, 0);

  // display frequency width
  process_spectrograph(spectrum);
  image(spectro_vis, 0, 0);
  
  displayLabel();
  
}
function displayLabel() {
  fill(220);
  textSize(18);
  text('Current Source: ' + currentSource, width/2-150, 40);
  textSize(14);
  text('Press Any to Change source', width/2-150, 60);
}

function toggleInput(mode) {
  if (typeof(mode) === 'number') {
    inputMode = mode;
  } else {
    inputMode += 1;
    inputMode = inputMode % 6;
  }
  switch (inputMode) {
    case 0: // soundFile mode
      soundFile.loop();
      osc.stop();
      mic.stop();
      fft.setInput(soundFile);
      currentSource = 'soundFile';
      break;
    case 1: // mic mode
      osc.stop();
      mic.start();
      soundFile.pause();
      fft.setInput(mic);
      currentSource = 'mic';
      break;
    case 2: // sine mode
      osc.setType('sine');
      osc.start();
      soundFile.pause();
      mic.stop();
      fft.setInput(osc);
      currentSource = 'sine';
      break;
    case 3: // square mode
      osc.setType('triangle');
      currentSource = 'triangle';
      break;
    case 4: // square mode
      osc.setType('square');
      currentSource = 'square';
      break;
    case 5: // square mode
      osc.setType('sawtooth');
      currentSource = 'sawtooth';
      break;
  }
}

function keyPressed(){
  toggleInput();
}


