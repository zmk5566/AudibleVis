import * as THREE from '../../lib/three.module.js';


import { TrackballControls } from './three-libs/addons/controls/TrackballControls.js';

let perspectiveCamera, orthographicCamera, controls, scene, renderer, stats;

const params = {
    orthographicCamera: false
};


export class Simple3Dvis {
    constructor(config) {
        this.config = config;
        this.perspectiveCamera;
        this.orthographicCamera;
        this.controls;
        this.scene;
        this.renderer;
        this.stats;
        this.windowsSizeX = 640;
        this.windowsSizeY= 400;
        this.frustumSize = 400;
        this.points = []
    }

    init() {
        
        const aspect = this.windowsSizeX / this.windowsSizeY;

        this.perspectiveCamera = new THREE.PerspectiveCamera( 60, aspect, 1, 1000 );
        this.perspectiveCamera.position.z = 3;
        this.perspectiveCamera.position.y= 2;

        this.orthographicCamera = new THREE.OrthographicCamera( this.frustumSize * aspect / - 2, this.frustumSize * aspect / 2, this.frustumSize / 2, this.frustumSize / - 2, 1, 1000 );
        this.orthographicCamera.position.z = 5;

        // world
        const size = 10;
        const divisions = 10;
        console.log("current status")
        console.log(this.config);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 'white' );
        this.scene.fog = new THREE.FogExp2( 0xcccccc, 0.002 );

        const geometry = new THREE.CylinderGeometry( 0, 0.1, 0.3, 3,5 );
        const material = new THREE.MeshPhongMaterial( { color: 0xffffff, flatShading: true } );
    
        const mesh = new THREE.Mesh( geometry, material );
        mesh.rotateX( -Math.PI / 2 );
        mesh.position.x = 0;
        mesh.position.y = 0;
        mesh.position.z = 0;
        mesh.updateMatrix();
        mesh.matrixAutoUpdate = false;
        this.scene.add( mesh );


    
    
        // lights
    
        const dirLight1 = new THREE.DirectionalLight( 0xffffff );
        dirLight1.position.set( 1, 1, 1 );
        this.scene.add( dirLight1 );
    
        const dirLight2 = new THREE.DirectionalLight( 0x002288 );
        dirLight2.position.set( 1, - 1, - 1 );
        this.scene.add( dirLight2 );
    
        const ambientLight = new THREE.AmbientLight( 0x222222 );
        this.scene.add( ambientLight );
        
        const gridHelper = new THREE.GridHelper( size, divisions );
        this.scene.add( gridHelper );

        const screen_geometry = new THREE.CylinderGeometry( this.config.radius*this.config.dynamic_scale, this.config.radius*this.config.dynamic_scale, this.config.dynamic_scale, 32,1,true,-this.config.theta/2,this.config.theta );
        const screen_material = new THREE.MeshBasicMaterial( {color: 0xffff00,side:THREE.DoubleSide,transparent:true,opacity:0.5} );
        const screen_cylinder = new THREE.Mesh( screen_geometry, screen_material );
        screen_cylinder.rotateX(Math.PI);
        this.scene.add( screen_cylinder );

        console.log ( "ready to draw ongoing points " + this.config.data_types_num);

        for (var i= 0 ; i< this.config.data_types_num; i++){
            const geometry = new THREE.SphereGeometry( 0.1, 32, 32 );
            const material = new THREE.MeshBasicMaterial( {color: 0xffff00,visible:false} );
            const sphere = new THREE.Mesh( geometry, material );
            sphere.position.x = 0;
            sphere.position.y = 0;
            sphere.position.z = 0;
            sphere.updateMatrix();
            //sphere.matrixAutoUpdate = false;
            this.scene.add( sphere );
            this.points.push(sphere);
        }
    
        // renderer
    
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setPixelRatio( window.devicePixelRatio );
        this.renderer.setSize( this.windowsSizeX, this.windowsSizeY );
        document.getElementById('vis_3d').appendChild( this.renderer.domElement );
    
        this.createControls( this.perspectiveCamera );

    }

    animate(){
        requestAnimationFrame(this.animate.bind(this));

        this.controls.update();
    
        this.render();
    }

    update_point(index, x, y, z,color){
        this.points[index].position.x = x;
        this.points[index].position.y = y;
        this.points[index].position.z = z;
        const material = new THREE.MeshBasicMaterial( { color: color } );
        this.points[index].material = material;

    }

    start_playing_points(){
        this.points.forEach(point => {

            point.visible = true;
     

        });
    }

    stop_playing_points(){
        this.points.forEach(element => {
            element.position.x = -99999;
            element.position.y = -99999;
            element.position.z = -99999;
            element.visible = false;
        })
    }

    render() {

       // const camera = this.orthographicCamera ;
    
        this.renderer.render( this.scene, this.perspectiveCamera );
    
    }

    clear(){
        this.points = [];
    }

    draw_points(){

        const geometry = new THREE.BufferGeometry().setFromPoints( this.points );
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        const line = new THREE.Line( geometry, material );
        this.scene.add( line );
    }
    
    createControls( camera ) {
        this.controls = new TrackballControls( camera, this.renderer.domElement );

        this.controls.rotateSpeed = 1.0;
        this.controls.zoomSpeed = 1.2;
        this.controls.panSpeed = 0.8;
        this.controls.keys = [ 'KeyA', 'KeyS', 'KeyD' ];
    
    }

} 


