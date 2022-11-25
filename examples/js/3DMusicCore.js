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
        this.reverb = new p5.Reverb();
        this.init();
        this.notes_buff = [];
    }

    init() {
        console.log("audio core init");
        console.log("audio config");
        this.audio_config.audio_channels.forEach((config,i)=>{
            console.log(config);
            this.panners.push(new p5.Panner3D());
            this.panners[i].disconnect();
            this.reverb.process(this.panners[i], 0.2, 0);
            //this.tremolo[i] = new Tone.Tremolo({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth}).connect(this.panners[i]).start();
            this.synths .push( new p5.MonoSynth());
            this.panners[i].process(this.synths[i]);
            //this.synths[i].connect(this.panners[i]);
            console.log(this.synths)
            //this.panners.process(this.synths[i]);


        }) 
    }

    setConfig(audio_config){
        this.audio_config = audio_config;
        console.log(this.audio_config);
        this.audio_config.audio_channels.forEach((config,i)=>{
            //this.tremolo[i].set({frequency:2^(config.tremolo_effect.frequency),depth:config.tremolo_effect.depth});
            //this.synths[i].volume.mute = config.mute;
            console.log(config.synth);
            this.synths[i].connect(this.panners[i]);
              // console.log(this.volumes[i]);
              // this.volumes[i].set({"mute":true});
              // this.volumes[i].mute=true;
              console.log(this.volumes[i]);

        })
    }
    dynamic_update_config(config){
        this.audio_config = config;
        console.log(config);
    }

    updatePan(index, timer_status, panX, panY, panZ){
       console.log("update pan");
       console.log(index,panX,panY,panZ);
       //this.panners[index].set(panX, 0,0 );
    }

    playSpatialSound(index, uniform_data_height, panX, panY, panZ) {
      // first mode
        this.synths[index].triggerAttack(this.caculate_freq(uniform_data_height),Tone.now());
        //this.panners[index].setPosition(panY, panX,panZ);
  }

  playPitchPanSound(index, timer_status, panX, panY, panZ) {

    var interval = this.audio_config.pitchnpan_interval/(this.num_of_sources+1);
    //console.log(now+index*this.audio_config.pitchnpan_interval/(this.num_of_sources+1),now+(index+1)*this.audio_config.pitchnpan_interval/(this.num_of_sources+1))
    
    this.notes_buff.push({time:index*interval,note:this.caculate_freq(timer_status),curr_index:index});
      console.log(index);
      this.panners[index].set(5,5,5);
      console.log(this.panners[index]);


      //this.synths[index].triggerAttack(this.caculate_freq(uniform_data_height),Tone.now());

      //this.synths[index].triggerAttack(this.caculate_freq(timer_status), now);
      //this.synths[index].triggerRelease(now+interval);
  }

  play_all_notes_buffer(){
    var the_note_in_notes =this.notes_buff.map((note)=>note);
    console.log(the_note_in_notes);
    this.notes_buff.forEach((note)=>{
      //this.synths[0].play(note, velocity, time, dur);
      console.log(this.synths);
      this.synths[note.curr_index].play(note.note, 1,0+note.curr_index,0.5);
       //this.synths[note.curr_index].triggerRelease(note.time+this.audio_config.pitchnpan_interval/(this.num_of_sources+1));
    })
    this.notes_buff = [];
  }

    stopAllSound(){
        this.synths.forEach(function(element) { element.triggerRelease() })
    }

    caculate_freq(input_index){
        return 440* Math.pow(2, ((input_index)*this.pitch_range+this.pitch_start)/12);
      }
};