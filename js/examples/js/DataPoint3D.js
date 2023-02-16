import { SphereGeometry, Mesh, MeshPhongMaterial, Vector3 } from "../../lib/three.module.js";


export class DataPoint3D {
    constructor(x, y, z, color, size) {
        this.x = x;
        this.y = y;
        this.z = z;
        this.color = color;
        this.size = size;
        this.x_range = 2/3*Math.PI;
        this.y_range = 2;;
    }

    setRange(x_range, y_range) {
        this.x_range = x_range; 
        this.y_range = y_range;
    }

    attachToScene(scene) {
        const geometry = new THREE.SphereGeometry(this.size, 32, 32);
        const material = new THREE.MeshBasicMaterial({ color: this.color });
        sphere = new THREE.Mesh(geometry, material);
        sphere.position.set(this.x, this.y, this.z);
        scene.add(sphere);
    }

    updatePosition(input_vector) {
        this.x = input_vector.x;
        this.y = input_vector.y;
        this.z = input_vector.z;
        sphere.position.set(this.x, this.y, this.z);
    }
}

