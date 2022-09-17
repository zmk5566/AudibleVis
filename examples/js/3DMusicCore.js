export class ThreeDimensionAuidoCore {
    constructor(num_of_sources,audio_config) {
        this.num_of_sources = num_of_sources;
        this.panners = [];
        this.tremolo = [];
        this.synths = [];
        this.pitch_range = 12;
        this.pitch_start = 0;
        this.audio_config =audio_config;
        this.init();
    }

    init() {
        console.log("audio core init");
        console.log("audio config");
        this.audio_config.audio_channels.forEach((config,i)=>{
            console.log(config);
            this.panners[i] = new Tone.Panner3D({panningModel:"HRTF"}).toDestination();
            this.tremolo[i] = new Tone.Tremolo({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth}).connect(this.panners[i]).start();
            this.synths[i] = new Tone.Synth({
                oscillator: {
                  type: config.synth.oscillator.type
                },
                envelope: {
                  attack: config.synth.envelope.attack,
                  decay: config.synth.envelope.decay,
                  sustain: config.synth.envelope.sustain,
                  release: config.synth.envelope.release
                }
              }).connect(this.tremolo[i])
        }) 


    }

    setConfig(audio_config){
        this.audio_config = audio_config;
        this.audio_config.audio_channels.forEach((config,i)=>{
            this.tremolo[i].set({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth});
            console.log(config.synth);
            this.synths[i].set({
                oscillator: {
                  type: config.synth.oscillator.type
                }});
        })
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