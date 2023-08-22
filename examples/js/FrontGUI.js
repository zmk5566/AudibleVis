import GUI from 'https://cdn.jsdelivr.net/npm/lil-gui@0.17/+esm';
import { StateTimer } from './StateTimer.js';


export class FrontGui {
    constructor(state_timer) {
        this.gui = new GUI();
        this.state_timer = state_timer;
        var folder1 = gui.addFolder('Flow Field');
        console.log(global_config);

        var time_duration = folder1.add(global_config, 'time_duration', 1, 20).step(1).name('Time Duration').onChange(value => {
            console.log(value);
        });
        var spectrum_display = folder1.add(global_config, 'spectrum_display').name('Spectrum Display');

        var folder2 = gui.addFolder('Audio Config');
        var folder3 = folder2.addFolder('Synths');
        var folder4 = folder2.addFolder('Audience Location');
        var folder5 = folder2.addFolder('Tremolo Effect');
        var folder6 = folder5.addFolder('Synth 1');
        var folder7 = folder5.addFolder('Synth 2');
        var folder8 = folder5.addFolder('Synth 3');
        var folder9 = folder4.addFolder('Audience Location');
        var folder10 = folder3.addFolder('Synth 1');
        var folder11 = folder3.addFolder('Synth 2');
        var folder12 = folder3.addFolder('Synth 3');
    }

    update_config(config) {
        this.state_timer.update_config(config);
    }

}
var gui = new GUI();
