import {StateTimer} from './js/StateTimer.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

console.log(Tone.context);
console.log(global_config);
var state_timer = new StateTimer(Tone.context,global_config);
state_timer.init();

var gui = new GUI();

var folder1 = gui.addFolder('General');
console.log(global_config);

folder1.add(global_config, 'time_duration', 1, 20).step(1).name('Time Duration').onChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'dynamic_scale', 0.5, 3).step(1).name('Scale').onChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'radius', 0.5, 3).step(0.25).name('Radius').onChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'theta', Math.PI/6, 2*Math.PI).step(0.01).name('Theta').onChange( value => {
    state_timer.update_config(global_config);
} );


//var spectrum_display = folder1.add(global_config, 'spectrum_display').name('Spectrum Display');

var audio_config_folder = gui.addFolder('Audio Config');
var synths_folder = audio_config_folder.addFolder('Synths');
// var audio_location_folder = audio_config_folder.addFolder('Audience Location');

// audio_location_folder.add(global_config.audio_config.audience_location, 'x', -1, 1).step(0.1).name('X').onChange( value => {
//     state_timer.update_config(global_config);
// })

// audio_location_folder.add(global_config.audio_config.audience_location, 'y', -1, 1).step(0.1).name('Y').onChange( value => {
//     state_timer.update_config(global_config);
// })

// audio_location_folder.add(global_config.audio_config.audience_location, 'z', -1, 1).step(0.1).name('Z').onChange( value => {
//     state_timer.update_config(global_config);
// })




global_config.audio_config.audio_channels.forEach((trem,i)=>{
    
    var single_channel = synths_folder.addFolder('Channel  ' + i);
    var osc_type = single_channel.addFolder('OSC Type');

    osc_type.add(global_config.audio_config.audio_channels[i].synth.oscillator, 'type', ['sine', 'square', 'triangle', 'sawtooth']).name('OSC').onChange( value => {
        console.log(value);
        state_timer.update_config(global_config);
    })

    var sub_folder = single_channel.addFolder('Tremolo Effect');
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'frequency', 0, 8).step(1).name('Frequency').onChange( value => {
        state_timer.update_config(global_config);
    })
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'depth', 0, 1).step(0.1).name('Depth').onChange( value => {
        state_timer.update_config(global_config);
    })



})






document.getElementById("start").onclick = state_timer.start.bind(state_timer);
document.getElementById("stop").onclick = state_timer.stop.bind(state_timer);