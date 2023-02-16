import {StateTimer} from './js/StateTimer.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

console.log(Tone.context);
console.log(global_config);
var state_timer = new StateTimer(Tone.context,global_config);
state_timer.init();

var gui = new GUI();

gui.close();

var folder0 = gui.addFolder('Dataset');

folder0.add(global_config.audio_config, 'dataset',  ['default','linear','linear_change','sinwave']).name('dataset').onChange( value => {
    console.log("current dataset", value);
    state_timer.update_database(value);
} );

var folder1 = gui.addFolder('General');
console.log(global_config);

// initially folder is closed

folder1.close();

folder1.add(global_config.audio_config, 'mode',  ['percnrepeat','pitchpoly','pitchnpan', 'spatial','percnpan','spatial_simple','spatial_explore']).name('Mode').onChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'time_duration', 10, 60).step(1).name('Time Duration').onFinishChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'dynamic_scale', 0.5, 3).step(1).name('Scale').onFinishChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'radius', 0.5, 3).step(0.25).name('Radius').onFinishChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'theta', Math.PI/6, 2*Math.PI).step(0.01).name('Theta').onFinishChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config.audio_config, 'pitchnpan_interval', 0.05,8).step(0.1).name('Interval').onFinishChange( value => {
    state_timer.update_config(global_config);
} );

folder1.add(global_config.audio_config, 'voice_over', 'voice_over').onFinishChange( value => {
    state_timer.update_config(global_config);
})


folder1.add(global_config.audio_config, 'switch_real_samples', 'switch_real_samples').onFinishChange( value => {
    state_timer.update_config(global_config);
})

folder1.add(global_config.audio_config, 'reference_timeline', 'reference_timeline').onFinishChange( value => {
    state_timer.update_config(global_config);
})


//var spectrum_display = folder1.add(global_config, 'spectrum_display').name('Spectrum Display');

var audio_config_folder = gui.addFolder('Audio Config');
audio_config_folder.close();
//var location_config = audio_config_folder.addFolder('Location');
var synths_folder = audio_config_folder.addFolder('Synths');
var audio_location_folder = audio_config_folder.addFolder('Audience Location');

audio_location_folder.add(global_config.audio_config.audience_location, 'pitch', -1, 1).step(0.05).name('X').onFinishChange( value => {
    console.log("changed pitch")
    state_timer.update_config(global_config);
})

audio_location_folder.add(global_config.audio_config.audience_location, 'yaw', -1, 1).step(0.05).name('Y').onFinishChange( value => {
    state_timer.update_config(global_config);
})

audio_location_folder.add(global_config.audio_config.audience_location, 'roll', -1, 1).step(0.05).name('Z').onFinishChange( value => {
    state_timer.update_config(global_config);
})




global_config.audio_config.audio_channels.forEach((trem,i)=>{
    
    var single_channel = synths_folder.addFolder('Channel  ' + i);
    var osc_type = single_channel.addFolder('OSC Type');

    osc_type.add(global_config.audio_config.audio_channels[i].synth.oscillator, 'type', ['sine', 'square', 'triangle', 'sawtooth']).name('OSC').onFinishChange( value => {
        console.log(value);
        state_timer.update_config(global_config);
    })

    var sub_folder = single_channel.addFolder('Tremolo Effect');
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'frequency', 0, 8).step(1).name('Frequency').onFinishChange( value => {
        state_timer.update_config(global_config);
    })
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'depth', 0, 1).step(0.1).name('Depth').onFinishChange( value => {
        state_timer.update_config(global_config);
    })

    sub_folder.add(global_config.audio_config.audio_channels[i], 'mute').name('Mute').onFinishChange( value => {
        state_timer.update_config(global_config);
    })
    



})

function global_update_config(){
console.log("global update config");
state_timer.update_pan(global_config);

}

update_global_config =global_update_config;


document.getElementById("start").onclick = state_timer.start.bind(state_timer);
document.getElementById("pitch").onchange = () => {
    console.log('it changed'); // Do something
  }
document.getElementById("stop").onclick = state_timer.stop.bind(state_timer);
