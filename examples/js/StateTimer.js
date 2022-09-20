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
        this.intervalCall;
        this.chart = new InteractiveLineChart();
        this.vis3d = new Simple3Dvis(config,this.trigger_xr_input.bind(this));
        this.music_core;
        this.totalData = [];
    }

    init(){
        this.chart.drawChart();
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



    

    startAnim(time) {
  
        // Set left style to a function of time if it is not stopped
        if (!this.stopped) {
            this.timer = this.get_uniformed_time_elapse();
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

        this.totalData = this.chart.trigger_line_movement(this.timer);
        this.totalData.forEach((d,i)=>{
            this.process_each_data_point(d,i);
        })

        
        
        //console.log(this.chart.gettotalData()[2]);
    }

    update_config(config){
        this.stop();
        if (this.music_core == undefined){
            this.totalData = this.chart.gettotalData();
            this.music_core = new ThreeDimensionAuidoCore(this.totalData.length,this.config.audio_config);
        }
        this.config = config;
        this.time_consume = config.time_duration;
        this.music_core.setConfig(config.audio_config);
        this.vis3d.setConfig(config);
    }


    process_each_data_point(data_point,index){
        var [x_cord,y_cord,z_cord]= 
            value2DtoCartersian(this.config.radius,this.timer,data_point.uniform_value,0,1,-this.config.theta/2,+this.config.theta/2,0,1,-0.5,+0.5);
            this.music_core.playSound(index,data_point.uniform_value,y_cord*this.config.dynamic_scale,x_cord*this.config.dynamic_scale,z_cord*this.config.dynamic_scale);
            this.vis3d.update_point(index,y_cord*this.config.dynamic_scale,z_cord*this.config.dynamic_scale,-x_cord*this.config.dynamic_scale,data_point.color);
    }

    start(){
 
        console.log("started");
        console.log(this.audioctx.now());

        this.totalData = this.chart.gettotalData();
        this.music_core = new ThreeDimensionAuidoCore(this.totalData.length,this.config.audio_config);
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

    get_uniformed_time_elapse(){
        return (1-((this.time_consume-(this.audioctx.now() - this.refTime))/this.time_consume));
    }

    stop() {
        if (!this.stopped){
        console.log("stopped");
        this.timer = 0;
        this.stopped = true;
        this.refTime = 0;
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

