import {InteractiveLineChart} from './LineCharter.js';
import { ThreeDimensionAuidoCore } from './3DMusicCore.js';
import {Simple3Dvis} from './Simple3Dvis.js';

export class StateTimer {
    constructor(audioctx,config) {
        this.audioctx = audioctx;
        this.timer = 0;
        this.time_consume = config.time_duration;
        this.config = config;
        this.stopped = true;
        this.refTime = 0;
        this.previousRef = -9999;
        this.intervalCall;
        this.chart = new InteractiveLineChart();
        this.vis3d = new Simple3Dvis(config,this.trigger_xr_input.bind(this));
        //hard coded here for now
        this.music_core= new ThreeDimensionAuidoCore(3,this.config.audio_config);
        this.totalData = [];
        this.current_counter = 0;
    }

    init(){
        this.chart.drawChart("default");
        this.vis3d.init();
        this.vis3d.animate()
    }

    get_global_config(){
        return this.config;
    }

    trigger_xr_input(){
        console.log("triggered xr input");
        this.start();

    }

    update_database(data_input){
        this.chart.drawChart(data_input);
    }



    

    startAnim(time) {
        // Set left style to a function of time if it is not stopped
        if (!this.stopped) {
            //this.timer = this.get_uniformed_time_elapse();
            if (this.config.unit_based_sample_play === true){
                this.timer = this.get_time_elapse();
            }else{
                this.timer = this.get_uniformed_time_elapse();
            }
            if (this.timer>=1){
                console.log("ready to stop , current time elapse： " + this.timer);
                this.stop();
            }else{
            this.update_loop();
            window.requestAnimationFrame(this.startAnim.bind(this));
        }
        }
    }

    update_loop(){


        if (this.config.audio_config.mode === "spatial" || this.config.audio_config.mode === "pitchpoly"){

        this.totalData = this.chart.trigger_line_movement(this.timer);

    

        this.totalData.forEach((d,i)=>{
            this.process_each_data_point(d,i);
        });
        //this.update_pan();
        // this.totalData.forEach((d,i)=>{
        //     this.process_each_pan_data_point(d,i);
        // })


    }else if(this.config.audio_config.mode === "pitchnpan" ||
             this.config.audio_config.mode === "percnpan"||
             this.config.audio_config.mode === "percnrepeat"||
             this.config.audio_config.mode === "spatial_simple"){
        //update only the passed time is over a threashold

        if (this.audioctx.now() - this.previousRef > this.config.audio_config.pitchnpan_interval){
            var additional_time = 0;
            if (this.config.audio_config.voice_over === true){
                var utterance = new SpeechSynthesisUtterance(parseInt(this.timer*100));
                console.log("utterance");
                speechSynthesis.speak(utterance);
                additional_time =this.config.audio_config.voice_over_time;
            }

            if (this.config.audio_config.reference_timeline === true){
                            this.previousRef = this.audioctx.now()+additional_time;
                            this.music_core.play_timeline_ref(this.timer);
            }


            this.previousRef = this.audioctx.now()+additional_time;
            console.log(this.timer);

            if (this.config.unit_based_sample_play === true){
            this.totalData = this.chart.trigger_line_movement(Math.floor(this.timer*16)/16);
            }else{
            this.totalData = this.chart.trigger_line_movement(this.timer);
            }



            this.totalData.forEach((d,i)=>{
                this.current_counter = this.current_counter+1;
                this.process_each_data_point(d,i);
            })

        }
        this.totalData.forEach((d,i)=>{
            if (this.config.audio_config.mode !== "percnrepeat"){
                this.process_each_pan_data_point(d,i);
            }else{
                this.process_static_data_point(d,i);
            }
        })
    



    //console.log(speechSynthesis.paused);



    }
    

        
        
        //console.log(this.chart.gettotalData()[2]);
    }


    trigger_cycle_random_generate(double=false){
        var temp_list = [];

        
        // the input list should be :amp frequency, phase, offset, total_number
        var amplitude = Math.random()*0.75+0.25;
        var frequency = Math.random()*4+1;
        var phase = Math.random()*Math.PI*2;

        if (!double){
            temp_list = process_list_to_json(generate_sinwave(amplitude, frequency, phase , 0, 16),this.config.noise_level);
        }else{

            var amplitude2 = Math.random()*0.75+0.25;
            var frequency2 = Math.random()*4+1;
            var phase2 = Math.random()*Math.PI*2;

            temp_list = process_list_to_json_two_dataset(generate_sinwave(amplitude, frequency, phase , 0, 16),generate_sinwave(amplitude2, frequency2, phase2 , 0, 16),this.config.noise_level);
        }

        this.chart.process_the_data_draw(temp_list);
    }

    trigger_pulse_random_generate(double=false){
        var temp_list = [];

        
        // the input list should be :amp frequency, phase, offset, total_number
        var amplitude = Math.random()*0.75+0.25;
        var frequency = Math.random()*1+0.5;
        var phase = Math.random()*Math.PI*2;
        if (!double){
            temp_list = process_list_to_json(generate_pulse_wave(amplitude, frequency, phase , 0, 16),this.config.noise_level);
        }else{
            var amplitude2 = Math.random()*0.75+0.25;
            var frequency2 = Math.random()*1+0.5;
            var phase2 = Math.random()*Math.PI*2;
            temp_list = process_list_to_json_two_dataset(generate_pulse_wave(amplitude, frequency, phase , 0, 16),generate_pulse_wave(amplitude2, frequency2, phase2 , 0, 16),this.config.noise_level);
        }

        this.chart.process_the_data_draw(temp_list);


    }

    trigger_linear_random_generate(double = false){
                // do the random graph trick
                var list_of_possibilities = ["up_up","up_down","down_up","down_down"];
                //get a random possibility
                var type = list_of_possibilities[Math.floor(Math.random()*list_of_possibilities.length)];
                //type = "up_down";
                if (!double){
                var temp_list = process_list_to_json(this.retrive_linear_list_based_on_type(type));
            }else{


                var type2 = list_of_possibilities[Math.floor(Math.random()*list_of_possibilities.length)];

                
                var temp_list = process_list_to_json_two_dataset(this.retrive_linear_list_based_on_type(type),this.retrive_linear_list_based_on_type(type2));
            }

                this.chart.process_the_data_draw(temp_list);

        
                // call the random graph function
                console.log("type is ",type);
                console.log("type data is ",temp_list);
                return type;
;

    }

    load_value_of_index(index,method){
        this.chart.drawChart_by_index(index,method);
    }

    async  send_few_value_to_server(index,methods){
        if (index!=0){
            
            switch (methods) {
                case 'single_linear':
                    
                    var list_of_possibilities = ["up_up","up_down","down_up","down_down"];
                    //get a random possibility
                    var type = list_of_possibilities[Math.floor(Math.random()*list_of_possibilities.length)];
                    var data = process_list_to_json(this.retrive_linear_list_based_on_type(type));
                    sendData(methods,data);
                    break;
                case 'double_linear':


                    var list_of_possibilities = ["up_up","up_down","down_up","down_down"];
                    //get a random possibility
                    var type = list_of_possibilities[Math.floor(Math.random()*list_of_possibilities.length)];
                    var type2 = list_of_possibilities[Math.floor(Math.random()*list_of_possibilities.length)];

                    var data = process_list_to_json_two_dataset(this.retrive_linear_list_based_on_type(type),this.retrive_linear_list_based_on_type(type2));
                    sendData(methods,data);
                    break;
                case 'single_cycle':
                    var amplitude = Math.random()*0.75+0.25;
                    var frequency = Math.random()*4+1;
                    var phase = Math.random()*Math.PI*2;

                    var data = process_list_to_json(generate_sinwave(amplitude, frequency, phase , 0, 16),this.config.noise_level);
                    sendData(methods,data);
                    break;
                case 'double_cycle':
                    var amplitude = Math.random()*0.75+0.25;
                    var frequency = Math.random()*4+1;
                    var phase = Math.random()*Math.PI*2;

                    var amplitude2 = Math.random()*0.75+0.25;
                    var frequency2 = Math.random()*4+1;
                    var phase2 = Math.random()*Math.PI*2;

                    var data = process_list_to_json_two_dataset(generate_sinwave(amplitude, frequency, phase , 0, 16),generate_sinwave(amplitude2, frequency2, phase2 , 0, 16),this.config.noise_level);
                    sendData(methods,data);
                    break;
                case 'single_pulse':
                    var amplitude = Math.random()*0.75+0.25;
                    var frequency = Math.random()*1+0.5;
                    var phase = Math.random()*Math.PI*2;

                    var data = process_list_to_json(generate_pulse_wave(amplitude, frequency, phase , 0, 16),this.config.noise_level);
                    sendData(methods,data);
                    break;
                case 'double_pulse':
                    var amplitude = Math.random()*0.75+0.25;
                    var frequency = Math.random()*1+0.5;
                    var phase = Math.random()*Math.PI*2;

                    var data = process_list_to_json_two_dataset(generate_pulse_wave(amplitude, frequency, phase , 0, 16),generate_pulse_wave(amplitude2, frequency2, phase2 , 0, 16),this.config.noise_level);
                    sendData(methods,data);
                    break;
            }
            await new Promise(r => setTimeout(r, 500));
            this.send_few_value_to_server(index-1,methods);
        }
        

    }




    retrive_linear_list_based_on_type(type){
        var random_value_start,get_second_value,get_final_result,random_index,random_index2;
        var temp_list = [];
        switch (type) {
            case 'up_up':
                //get first random value 
                random_value_start =getRandomArbitrary(-1,0.25);
                get_second_value = getRandomArbitrary(random_value_start,0.75);
                get_final_result= getRandomArbitrary(get_second_value,1);

                // get random index
                random_index = getRandomInt(2,14);
                random_index2 = 16-random_index;

                break;
            case 'up_down':
              
                random_value_start =getRandomArbitrary(-1,0.75);
                get_second_value = getRandomArbitrary(random_value_start,1);
                get_final_result= getRandomArbitrary(get_second_value,-1);

                // get random index
                random_index = getRandomInt(2,14);
                random_index2 = 16-random_index;

                break;
            case 'down_up':
                
                random_value_start =getRandomArbitrary(0.75,0.1);
                get_second_value = getRandomArbitrary(-1,random_value_start);
                get_final_result= getRandomArbitrary(get_second_value,1);

                // get random index
                random_index = getRandomInt(2,14);
                random_index2 = 16-random_index;

            break;
            case 'down_down':
                    
                random_value_start =getRandomArbitrary(0.75,0.1);
                get_second_value = getRandomArbitrary(-0.65,random_value_start);
                get_final_result= getRandomArbitrary(get_second_value,-1);

                // get random index
                random_index = getRandomInt(2,14);
                random_index2 = 16-random_index;

                break;
        }
        temp_list = generate_trend_data_by_serveral_key_point([random_value_start,get_second_value,get_final_result],[random_index,random_index2],0);
        return temp_list;
    }

    
    random_graph(){
        switch (this.config.test_type) {
            case 'single_linear':
                console.log("single_linear");
                console.log("start to be random");
                this.trigger_linear_random_generate();
                break;
            case 'single_cycle':
                    console.log("single_cycle");
                    console.log("start to be random");
                    this.trigger_cycle_random_generate();
                    break;
            case 'single_pulse':
                    console.log("single_pulse");
                    console.log("start to be random");
                    this.trigger_pulse_random_generate();
                    break;
            case 'double_linear':
                    this.trigger_linear_random_generate(true);
                    console.log("double_linear");
                    break;
            case 'double_cycle':
                this.trigger_cycle_random_generate(true);
                break;
            case 'double_pulse':
                this.trigger_pulse_random_generate(true);
                break;


        }
        
    }

    update_config(config){
        this.stop();
        this.previousRef = -9999;
        this.refTime = 0;

        if (this.music_core == undefined){
            this.totalData = this.chart.gettotalData();
            console.log("why you are undefined");
            //this.music_core.update_config(config.audio_config);
        }
        this.config = config;
        this.time_consume = config.time_duration;
        this.music_core.dynamic_update_config(config.audio_config);
        this.music_core.init();
        this.vis3d.setConfig(config);
    }

    update_pan(config){
        this.config = config;
        this.music_core.dynamic_update_config(config.audio_config);
        this.vis3d.update_pan(config);
    }

    process_static_data_point(data_point,index){
        var temp_index_position = 0;


        temp_index_position = 1/(this.totalData.length-1)*index;

        var [x_cord,y_cord,z_cord]= 
        value2DtoCartersian(this.config.radius,temp_index_position,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
        //console.log(data_point);
        var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
        //console.log(temp_coord)
        this.music_core.updatePan(index,this.uniform_value,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);       
   

    }

    

    process_each_pan_data_point(data_point,index){
        var [x_cord,y_cord,z_cord]= 
        value2DtoCartersian(this.config.radius,data_point.uniform_value,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
        //console.log(data_point);
        var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
        //console.log(temp_coord)
        this.music_core.updatePan(index,this.timer,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);       
    }


    process_each_data_point(data_point,index){

        if (this.config.audio_config.mode === "spatial"){
        var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,this.timer,data_point.uniform_value,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            
            this.music_core.playSpatialSound(index,data_point.uniform_value,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,z_cord*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
        }else if(this.config.audio_config.mode === "pitchnpan"){
            console.log("pitchnpan");
            var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,data_point.uniform_value,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            //console.log(x_cord,y_cord,z_cord);
            //console.log(temp_coord);
            this.music_core.playPitchPanSound(index,this.timer,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,0*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
       }else if(this.config.audio_config.mode === "pitchpoly"){
            //console.log("pitchpoly");
            var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,data_point.uniform_value,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            
            this.music_core.playPitchPolySound(index,this.timer,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,z_cord*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
        }else if (this.config.audio_config.mode === "percnpan"){
            var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,data_point.uniform_value,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            //console.log(x_cord,y_cord,z_cord);
            //console.log(temp_coord);
            this.music_core.playPercuPanSound(index,this.timer,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,0*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);

        }else if (this.config.audio_config.mode === "percnrepeat"){
            var temp_index_position = 1/(this.totalData.length-1)*index;

            var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,temp_index_position,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            //console.log(x_cord,y_cord,z_cord);
            //console.log(temp_coord);

            this.music_core.playPercuRepSound(index,data_point.uniform_value,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,0*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
        }else if (this.config.audio_config.mode === "spatial_simple"){
            var temp_index_position = 1/(this.totalData.length-1)*index;

            var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,temp_index_position,this.timer,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            var temp_coord = this.vis3d.get_localPoints(x_cord,y_cord,z_cord);
            //console.log(x_cord,y_cord,z_cord);
            //console.log(temp_coord);

            this.music_core.playSimpleSynth(index,data_point.uniform_value,temp_coord[1]*this.config.dynamic_scale,temp_coord[0]*this.config.dynamic_scale,temp_coord[2]*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,0*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
        }
    }

    start(){
 
        console.log("started");
        console.log(this.audioctx.now());

        this.totalData = this.chart.gettotalData();
        this.music_core.audio_config = this.config.audio_config;
        console.log(this.totalData.length);
        console.log("total channels of data:  "+ this.totalData.length); 
        
        this.timer = 0;
        this.refTime = 0;
        this.stopped = false;
        this.refTime = this.audioctx.now();

        this.chart.trigger_display_lines();
        window.requestAnimationFrame(this.startAnim.bind(this));
        this.vis3d.start_playing_points();

        
    }


    // this is where TODO is having
    get_uniformed_time_elapse(){
        return (1-((this.time_consume-(this.audioctx.now() - this.refTime))/this.time_consume));
    }


    get_time_elapse(){
        //console.log(this.totalData.length);
        this.time_consume =  this.config.audio_config.pitchnpan_interval*16;
        return this.get_uniformed_time_elapse();

    }

    stop() {
        if (!this.stopped){
        console.log("stopped");
        this.timer = 0;
        this.stopped = true;
        this.refTime = 0;
        this.previousRef = -9999;
        this.chart.trigger_end_display_lines();
        this.music_core.stopAllSound();
        this.vis3d.stop_playing_points();
        }else{
            console.log("already stopped");
        }

    }

    getState() {
        return this.stopped;
    }

    getTimer() {
        return this.timer;
    }


}


/*
    * in our case, r should be the distance from the center of the cylinder to the point and suppose to be fixed
    * theta should be the angle between the x-axis and the point
*/ 

