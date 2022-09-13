
function process_draw_unknown_pleasure(input_spectrum){
  var far_corner_index = unknow_pleaseure_cnv.height/divisions;
  var newBuffer = [];

  var scaledSpectrum = splitOctaves(input_spectrum, 12);
  var len = scaledSpectrum.length;

  unknow_pleaseure_cnv.background(200, 200, 200, 1);
  // copy before clearing the background
  unknow_pleaseure_cnv.copy(unknow_pleaseure_cnv,0,0,unknow_pleaseure_cnv.width,unknow_pleaseure_cnv.height,0,speed,unknow_pleaseure_cnv.width,unknow_pleaseure_cnv.height);

  // draw shape
  unknow_pleaseure_cnv.beginShape();

    // one at the far corner
    unknow_pleaseure_cnv.curveVertex(0, far_corner_index);

    for (var i = 0; i < len; i++) {
      var point = smoothPoint(scaledSpectrum, i, 2);
      var x = map(i, 0, len-1, 0, unknow_pleaseure_cnv.width);
      var y = map(point, 0, unknow_pleaseure_cnv.height*0.75, far_corner_index, 0);
      unknow_pleaseure_cnv.curveVertex(x, y);
    }

    // one last point at the end
    unknow_pleaseure_cnv.curveVertex(unknow_pleaseure_cnv.width, far_corner_index);

  unknow_pleaseure_cnv.endShape();
}


/**
 *  Divides an fft array into octaves with each
 *  divided by three, or by a specified "slicesPerOctave".
 *  
 *  There are 10 octaves in the range 20 - 20,000 Hz,
 *  so this will result in 10 * slicesPerOctave + 1
 *
 *  @method splitOctaves
 *  @param {Array} spectrum Array of fft.analyze() values
 *  @param {Number} [slicesPerOctave] defaults to thirds
 *  @return {Array} scaledSpectrum array of the spectrum reorganized by division
 *                                 of octaves
 */
function splitOctaves(spectrum, slicesPerOctave) {
  var scaledSpectrum = [];
  var len = spectrum.length;

  // default to thirds
  var n = slicesPerOctave|| 3;
  var nthRootOfTwo = Math.pow(2, 1/n);

  // the last N bins get their own 
  var lowestBin = slicesPerOctave;

  var binIndex = len - 1;
  var i = binIndex;


  while (i > lowestBin) {
    var nextBinIndex = round( binIndex/nthRootOfTwo );

    if (nextBinIndex === 1) return;

    var total = 0;
    var numBins = 0;

    // add up all of the values for the frequencies
    for (i = binIndex; i > nextBinIndex; i--) {
      total += spectrum[i];
      numBins++;
    }

    // divide total sum by number of bins
    var energy = total/numBins;
    scaledSpectrum.push(energy);

    // keep the loop going
    binIndex = nextBinIndex;
  }

  // add the lowest bins at the end
  for (var j = i; j > 0; j--) {
    scaledSpectrum.push(spectrum[j]);
  }

  // reverse so that array has same order as original array (low to high frequencies)
  scaledSpectrum.reverse();

  return scaledSpectrum;
}


// average a point in an array with its neighbors
function smoothPoint(spectrum, index, numberOfNeighbors) {

  // default to 2 neighbors on either side
  var neighbors = numberOfNeighbors || 2;
  var len = spectrum.length;

  var val = 0;

  // start below the index
  var indexMinusNeighbors = index - neighbors;
  var smoothedPoints = 0;

  for (var i = indexMinusNeighbors; i < (index+neighbors) && i < len; i++) {
    // if there is a point at spectrum[i], tally it
    if (typeof(spectrum[i]) !== 'undefined') {
      val += spectrum[i];
      smoothedPoints++;
    }
  }

  val = val/smoothedPoints;

  return val;
}