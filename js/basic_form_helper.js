function process_display_waveform(input_waveform){
  waveform_vis.background(0);
  waveform_vis.noFill();
  waveform_vis.beginShape();
  waveform_vis.stroke(220);
  for (let i = 0; i < input_waveform.length; i++){
    let x = map(i, 0, input_waveform.length, 0, waveform_vis.width);
    let y = map( input_waveform[i], -1/wave_scale, 1/wave_scale, 0, waveform_vis.height);
    waveform_vis.vertex(x,y);
  }
  waveform_vis.endShape();
}

function process_display_frequency(input_spectrum){
  freq_vis.background(0);
  freq_vis.noStroke();
  freq_vis.fill(120);
  for (let i = 0; i< input_spectrum.length; i++){
    let x = map(i, 0, input_spectrum.length, 0, freq_vis.width);
    let h = -freq_vis.height + map(input_spectrum[i], 0, 255, freq_vis.height, 0);
    freq_vis.rect(x, freq_vis.height, freq_vis.width / input_spectrum.length, h )
  }
}
