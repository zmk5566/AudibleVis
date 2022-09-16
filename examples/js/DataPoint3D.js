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


/*
    * in our case, r should be the distance from the center of the cylinder to the point and suppose to be fixed
    * theta should be the angle between the x-axis and the point
*/ 

function CylindricalToCartesian(r, theta, z) {
    return new THREE.Vector3(r * Math.cos(theta), r * Math.sin(theta), z);
}

function mapRangetoRange(value, start_range, end_range, new_start_range, new_end_range) {
    var total_range = end_range - start_range;
    var new_total_range = new_end_range - new_start_range;
    var ratio = new_total_range / total_range;
    return (value - start_range) * ratio + new_start_range;
}

function value2DtoCartersian(r,x,y,x_start,x_end,y_start,y_end) {
    var theta = mapRangetoRange(x, x_start, x_end, 0, 2 * Math.PI);
    var z = mapRangetoRange(y, y_start, y_end, 0, 2 * Math.PI);
    return CylindricalToCartesian(r, theta, z);
}