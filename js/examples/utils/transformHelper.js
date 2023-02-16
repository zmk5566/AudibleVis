function CylindricalToCartesian(r, theta, z) {
    return [r * Math.cos(theta), r * Math.sin(theta), z];
}

function mapRangetoRange(value, start_range, end_range, new_start_range, new_end_range) {
    var total_range = end_range - start_range;
    var new_total_range = new_end_range - new_start_range;
    var ratio = new_total_range / total_range;
    return (value - start_range) * ratio + new_start_range;
}

function value2DtoCartersian(r,x,y,x_start,x_end,x_target_start,x_target_end,y_start,y_end,y_target_start,y_target_end){
    var theta = mapRangetoRange(x, x_start, x_end, x_target_start,x_target_end);
    var z = mapRangetoRange(y, y_start, y_end, y_target_start,y_target_end);
    return CylindricalToCartesian(r, theta, z);
}