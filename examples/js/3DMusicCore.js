export class ThreeDimensionAuidoCore {
    constructor(num_of_sources) {
        this.num_of_sources = num_of_sources;
        this.panners = [];
        this.tremolo = [];
        this.synths = [];
        this.pitch_range = 12;
        this.pitch_start = 0;
        this.init();
    }

    init() {
        for (var i=0;i<this.num_of_sources;i++){
            this.panners[i] = new Tone.Panner3D({panningModel:"HRTF"}).toDestination();
            this.tremolo[i] = new Tone.Tremolo(9, 0.75);
            this.synths[i] = new Tone.Synth({
                envelope: {
                    attack: 0,
                    decay: 0,
                    sustain: 0.01,
                    release: 0.1
                  }
            }).connect(this.panners[i]).connect(this.tremolo[i]);
        }
    }

    playSound(index, uniform_data_height, panX, panY, panZ) {
        this.synths[index].triggerAttack(this.caculate_freq(uniform_data_height),Tone.now());
        this.panners[index].setPosition(panX, panY, panZ);
    }

    stopAllSound(){
        this.synths.forEach(function(element) { element.triggerRelease() })

    }

    caculate_freq(input_index){
        return 440* Math.pow(2, ((input_index)*this.pitch_range+this.pitch_start)/12);
      }
};