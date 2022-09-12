function process_spectrograph(input_spectrum){
  
    // copy the sketch and move it over based on the speed
//spectro_vis.background(30);
spectro_vis.copy(spectro_vis, 0, 0, spectro_vis.width, spectro_vis.height, -speed, 0, spectro_vis.width, spectro_vis.height);

  // iterate thru current freq spectrum
  for (var i = 0; i < input_spectrum.length; i++) {
    var value;
    if (logView) {
      logIndex = logScale(i, input_spectrum.length);
      value = input_spectrum[logIndex];
    } else {
      value = input_spectrum[i];
    }
    var c = value;
    spectro_vis.noStroke();
    spectro_vis.colorMode(spectro_vis.HSB);
    spectro_vis.fill(c, 255, c);
    var percent = i / input_spectrum.length;
    var y = percent * spectro_vis.height;
    spectro_vis.rect(spectro_vis.width - speed, spectro_vis.height - y, speed, spectro_vis.height / input_spectrum.length);
  }

  
  
}


function process_spectrograph_fft(input_spectrum){
  
    // copy the sketch and move it over based on the speed
//spectro_vis.background(30);
spectro_vis.copy(spectro_vis, 0, 0, spectro_vis.width, spectro_vis.height, -speed, 0, spectro_vis.width, spectro_vis.height);

  // iterate thru current freq spectrum
  for (var i = 0; i < input_spectrum.length; i++) {
    var value;
    if (logView) {
      logIndex = logScale(i, input_spectrum.length);
      value = (1+input_spectrum[logIndex]/100)*450;
    } else {
      value = (1+input_spectrum[i]/100)*450;
    }

    if (i==0){
          //console.log(value)
}
    var c = value;
    spectro_vis.noStroke();
    spectro_vis.colorMode(spectro_vis.HSB);
    spectro_vis.fill(c, 255, c);
    var percent = i / input_spectrum.length;
    var y = percent * spectro_vis.height;
    //console.log(spectro_vis.width - speed);
    spectro_vis.rect(spectro_vis.width - speed, spectro_vis.height -y, speed, spectro_vis.height / input_spectrum.length);
    //spectro_vis.background(c, 255, c)
  }

  
  
}



function logScale(index, total, opt_base) {
  var base = opt_base || 2;
  var logmax = logBase(total + 1, base);
  var exp = logmax * index / total;
  return Math.round(Math.pow(base, exp) - 1);
}

function logBase(val, base) {
  return Math.log(val) / Math.log(base);
}
