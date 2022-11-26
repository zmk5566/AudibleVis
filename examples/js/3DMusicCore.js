export class ThreeDimensionAuidoCore {
    constructor(num_of_sources,audio_config) {
        this.num_of_sources = num_of_sources;
        this.panners = [];
        this.tremolo = [];
        this.synths = [];
        this.volumes = [];
        this.pitch_range = 12;
        this.pitch_start = 0;
        this.audio_config =audio_config;
        this.players=[];
        this.init();
    }

    init() {
        console.log("audio core init");
        console.log("audio config");
        this.audio_config.audio_channels.forEach((config,i)=>{
            console.log(config);
            this.volumes[i] = new Tone.Volume(0).toDestination();
            this.panners[i] = new Tone.Panner3D({panningModel:"HRTF"}).connect(this.volumes[i]);
            this.tremolo[i] = new Tone.Tremolo({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth}).connect(this.panners[i]).start();
            this.players[i] = new Tone.Player("samples/"+i+".WAV").connect(this.panners[i]);
            this.ref_synth = new Tone.Synth().toDestination();
            this.ref_synth.volume.value = -10;
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
        console.log(this.audio_config);
        this.audio_config.audio_channels.forEach((config,i)=>{
            this.tremolo[i].set({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth});
            //this.synths[i].volume.mute = config.mute;
            console.log(config.synth);
            this.synths[i].set({
                oscillator: {
                  type: config.synth.oscillator.type
                }
              }).connect(this.tremolo[i]);
              console.log(this.volumes[i]);
              this.volumes[i].set({"mute":true});
              this.volumes[i].mute=true;
              console.log(this.volumes[i]);

        })
    }
    dynamic_update_config(config){
        this.audio_config = config;
        console.log(config);
    }

    updatePan(index, timer_status, panX, panY, panZ){
      // console.log("update pan");
      // console.log(index,panX,panY,panZ);
      this.panners[index].setPosition(panX, panY, panZ);
    }

    playSpatialSound(index, uniform_data_height, panX, panY, panZ) {
      // first mode
      if (this.audio_config.audio_channels[index].mute==false){
        this.synths[index].triggerAttack(this.caculate_freq(uniform_data_height),Tone.now());
        this.panners[index].setPosition(panX, panY, panZ);
      }else{
        this.volumes[index].set({"mute":true});
      }
  }
  
  play_timeline_ref(timer_status){
    if (this.audio_config.reference_timeline==true){
      this.ref_synth.triggerAttack(this.caculate_freq(timer_status-1),Tone.now());
    }
  }

  playPercuPanSound(index, timer_status, panX, panY, panZ) {

    var now  = Tone.now();
    var interval = this.audio_config.pitchnpan_interval/(this.num_of_sources+1);
    var time_balance = 0 ;

    if (this.audio_config.voice_over==true){
      time_balance = this.audio_config.voice_over_time;
    }


    //console.log(now+index*this.audio_config.pitchnpan_interval/(this.num_of_sources+1),now+(index+1)*this.audio_config.pitchnpan_interval/(this.num_of_sources+1))
    if (this.audio_config.audio_channels[index].mute==false){
      console.log(index);


      var bufferTime = 0;
      this.players[index].start(now+index*interval+time_balance);
      this.panners[index].setPosition(panX, panY, panZ);
      
  




    }else{
      this.volumes[index].set({"mute":true});
    }



  }
  playPitchPanSound(index, timer_status, panX, panY, panZ) {
    var now  = Tone.now();
    var interval = this.audio_config.pitchnpan_interval/(this.num_of_sources+1);
    //console.log(now+index*this.audio_config.pitchnpan_interval/(this.num_of_sources+1),now+(index+1)*this.audio_config.pitchnpan_interval/(this.num_of_sources+1))
    if (this.audio_config.audio_channels[index].mute==false){
      console.log(index);
      this.synths[index].triggerAttack(this.caculate_freq(timer_status), now+index*interval);
      this.synths[index].triggerRelease(now+interval*(index+1));
      this.panners[index].setPosition(panX, panY, panZ);
    }else{
      this.volumes[index].set({"mute":true});
    }
  }

  playPitchPolySound(index, timer_status, panX, panY, panZ) {
    var now  = Tone.now();
    if (this.audio_config.audio_channels[index].mute==false){
      this.synths[index].triggerAttack(this.caculate_freq(timer_status),Tone.now());
      this.panners[index].setPosition(panX, panY, panZ);
    }else{
      this.volumes[index].set({"mute":true});
    }
  }

  

    stopAllSound(){
        this.synths.forEach(function(element) { element.triggerRelease() })
        this.ref_synth.triggerRelease();
    }

    caculate_freq(input_index){
        return 440* Math.pow(2, ((input_index)*this.pitch_range+this.pitch_start)/12);
      }
};