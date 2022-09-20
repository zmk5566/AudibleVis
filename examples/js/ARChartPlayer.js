
			import * as THREE from '../../lib/three.module.js';
			import { ARButton } from '../../lib/addons/webxr/ARButton.js';

			let camera, scene, renderer;
			let controller;

			function init() {

				const container = document.createElement( 'div' );
				document.getElementById("container").appendChild( container );

				scene = new THREE.Scene();

				camera = new THREE.PerspectiveCamera( 70, 950 / 500, 0.01, 20 );

				const defaultLight = new THREE.HemisphereLight( 0xffffff, 0xbbbbff, 1 );
				defaultLight.position.set( 0.5, 1, 0.25 );
				scene.add( defaultLight );

				//

				renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
				renderer.setPixelRatio( window.devicePixelRatio );
				renderer.setSize( 950, 500 );
				renderer.outputEncoding = THREE.sRGBEncoding;
				renderer.physicallyCorrectLights = true;
				renderer.xr.enabled = true;
				container.appendChild( renderer.domElement );
				scene.background = new THREE.Color( 0xcccccc );


				//const xrLight = new XREstimatedLight( renderer );


				document.body.appendChild( ARButton.createButton( renderer, { optionalFeatures: [ 'light-estimation' ] } ) );

				//

				const ballGeometry = new THREE.SphereGeometry( 0.175, 32, 32 );
				const material = new THREE.MeshPhongMaterial( { color: 0xffffff * Math.random() } );
				const ballMesh = new THREE.Mesh( ballGeometry, material );
				ballMesh.position.set(0,0,-2);

				scene = new THREE.Scene();
				scene.add( new THREE.GridHelper( 1000, 10, 0x888888, 0x444444 ) );


				scene.add( ballMesh );

				function onSelect() {



				}

				controller = renderer.xr.getController( 0 );
				controller.addEventListener( 'select', onSelect );
				scene.add( controller );

				//

				window.addEventListener( 'resize', onWindowResize );

			}

			function onWindowResize() {

				camera.aspect = window.innerWidth / window.innerHeight;
				camera.updateProjectionMatrix();

				renderer.setSize( window.innerWidth, window.innerHeight );

			}

			//

			function animate() {

				renderer.setAnimationLoop( render );

			}

			function render() {

				renderer.render( scene, camera );

			}