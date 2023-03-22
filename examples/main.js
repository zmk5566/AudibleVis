import {StateTimer} from './js/StateTimer.js';
import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';

console.log(Tone.context);
console.log(global_config);
var state_timer = new StateTimer(Tone.context,global_config);
state_timer.init();


  






var gui = new GUI();

var folder0 = gui.addFolder('Basic Setting');

var mode_folder = gui.addFolder('Mode Setting');

var get_random_value_function = state_timer.random_graph.bind(state_timer);


folder0.add(global_config.audio_config, 'dataset',  ['default','linear','linear_change','sinwave']).name('Dataset').onChange( value => {
    global_config.test_type = value;
    console.log("current dataset", value);
    state_timer.update_database(value);
} );




mode_folder.add(global_config, 'test_type',  ['default','single_linear','single_cycle','single_pulse','double_linear','double_cycle','double_pulse']).name('Dataset').onChange( value => {
    console.log("current dataset", value);
    state_timer.update_config(global_config);

    state_timer.random_graph();


} );





mode_folder.add(global_config, 'noise_level', 0, 0.2).step(0.05).name('NOISE LEVEL').onFinishChange( value => {
    global_config.noise_level = value;
    state_timer.update_config(global_config);
    state_timer.random_graph();
} );


mode_folder.add(global_config, 'unit_based_sample_play').name('unit_based_sample_play').onFinishChange( value => {
    global_config.unit_based_sample_play = value;
    console.log("unit_based_sample_play changed",value);
    state_timer.update_config(global_config);
})



mode_folder.add(global_config, 'value_mode').name('value_mode').onFinishChange( value => {
    if (value){
        
        //global_config.unit_based_sample_play = false;
        console.log("unit_based_sample_play changed",false);
        global_config.audio_config.pitchnpan_interval  = 5;
    }
    state_timer.update_config(global_config);
})


mode_folder.add( { add:get_random_value_function},'add').name('Get Random New Value');



folder0.close();

// add a button to the folder 



folder0.add(global_config.audio_config, 'dataset',  ['default','linear','linear_change','sinwave']).name('Dataset').onChange( value => {
    console.log("current dataset", value);
    state_timer.update_config(global_config);
    state_timer.update_database(value);
} );


//create a function to randomly retrive a function 




folder0.add(global_config, 'time_duration', 10, 120).step(1).name('SCALE DETAILS').onFinishChange( value => {
    global_config.time_duration = value;
    state_timer.update_config(global_config);
} );

folder0.add(global_config.audio_config, 'pitchnpan_interval', 0.125,8).step(0.1).name('SAMPLE ALLOW TIME').onFinishChange( value => {
    global_config.audio_config.pitchnpan_interval = value;
    state_timer.update_config(global_config);
} );


fetch('./res/configs.json')
  .then((response) => response.json())
  .then((data) => {
  var config_name_list = [];
  for (var i = 0; i < data.length; i++) {
    config_name_list.push(data[i].name);
  }
  folder0.add(global_config, 'encoding_method',  config_name_list).name('Encoding Method').onChange( value => {
    
    
    var index = data.findIndex(p => p.name == value);
    console.log("update data", data[index].data);
    global_config = data[index].data;
    state_timer.update_config(global_config);

    //state_timer.update_database(value);
} );


});


var advanced_folder = gui.addFolder('Advanced Setting');

var folder1 = advanced_folder.addFolder('General');
advanced_folder.close();
console.log(global_config);

// initially folder is closed

folder1.close();

folder1.add(global_config.audio_config, 'mode',  ['percnrepeat','pitchpoly','pitchnpan', 'spatial','percnpan','spatial_simple','spatial_explore']).name('Mode').onChange( value => {
    global_config.audio_config.mode = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'time_duration', 10, 60).step(1).name('Time Duration').onFinishChange( value => {
    global_config.time_duration = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'dynamic_scale', 0.5, 3).step(1).name('Scale').onFinishChange( value => {
    global_config.dynamic_scale = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'radius', 0.5, 3).step(0.25).name('Radius').onFinishChange( value => {
    global_config.radius = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config, 'theta', Math.PI/6, 2*Math.PI).step(0.01).name('Theta').onFinishChange( value => {
    global_config.theta = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config.audio_config, 'pitchnpan_interval', 0.05,8).step(0.1).name('Interval').onFinishChange( value => {
    global_config.audio_config.pitchnpan_interval = value;
    state_timer.update_config(global_config);
} );

folder1.add(global_config.audio_config, 'voice_over', 'voice_over').onFinishChange( value => {
    global_config.audio_config.voice_over = value;
    state_timer.update_config(global_config);
})


folder1.add(global_config.audio_config, 'switch_real_samples', 'switch_real_samples').onFinishChange( value => {
    global_update_config.audio_config.switch_real_samples = value;
    state_timer.update_config(global_config);
})

folder1.add(global_config.audio_config, 'reference_timeline', 'reference_timeline').onFinishChange( value => {
    global_config.audio_config.reference_timeline = value;
    state_timer.update_config(global_config);
})


//var spectrum_display = folder1.add(global_config, 'spectrum_display').name('Spectrum Display');

var audio_config_folder = advanced_folder.addFolder('Audio Config');
audio_config_folder.close();
//var location_config = audio_config_folder.addFolder('Location');
var synths_folder = audio_config_folder.addFolder('Synths');
var audio_location_folder = audio_config_folder.addFolder('Audience Location');

audio_location_folder.add(global_config.audio_config.audience_location, 'pitch', -1, 1).step(0.05).name('X').onFinishChange( value => {
    global_config.audio_config.audience_location.pitch = value;
    console.log("changed pitch")
    state_timer.update_config(global_config);
})

audio_location_folder.add(global_config.audio_config.audience_location, 'yaw', -1, 1).step(0.05).name('Y').onFinishChange( value => {
    global_config.audio_config.audience_location.yaw = value;
    state_timer.update_config(global_config);
})

audio_location_folder.add(global_config.audio_config.audience_location, 'roll', -1, 1).step(0.05).name('Z').onFinishChange( value => {
    global_config.audio_config.audience_location.roll = value;
    state_timer.update_config(global_config);
})




global_config.audio_config.audio_channels.forEach((trem,i)=>{
    
    var single_channel = synths_folder.addFolder('Channel  ' + i);
    var osc_type = single_channel.addFolder('OSC Type');

    osc_type.add(global_config.audio_config.audio_channels[i].synth.oscillator, 'type', ['sine', 'square', 'triangle', 'sawtooth']).name('OSC').onFinishChange( value => {
        global_config.audio_config.audio_channels[i].synth.oscillator.type = value;
        console.log(value);
        state_timer.update_config(global_config);
    })

    var sub_folder = single_channel.addFolder('Tremolo Effect');
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'frequency', 0, 8).step(1).name('Frequency').onFinishChange( value => {
        global_config.audio_config.audio_channels[i].tremolo_effect.frequency = value;
        state_timer.update_config(global_config);
    })
    sub_folder.add(global_config.audio_config.audio_channels[i].tremolo_effect, 'depth', 0, 1).step(0.1).name('Depth').onFinishChange( value => {
        global_config.audio_config.audio_channels[i].tremolo_effect.depth = value;
        state_timer.update_config(global_config);
    })

    sub_folder.add(global_config.audio_config.audio_channels[i], 'mute').name('Mute').onFinishChange( value => {
        global_config.audio_config.audio_channels[i].mute = value;
        console.log("mute changed",value);
        state_timer.update_config(global_config);
    })

    if (i==1){
        folder0.add(global_config.audio_config.audio_channels[i], 'mute').name('Solo On One set of Data').onFinishChange( value => {
            global_config.audio_config.audio_channels[i].mute = value;
            state_timer.update_config(global_config);
        })
    }
    



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
document.getElementById("single_value").onclick = state_timer.random_graph.bind(state_timer);



