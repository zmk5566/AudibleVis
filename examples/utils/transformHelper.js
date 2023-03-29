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

function map(value, start_range, end_range, new_start_range, new_end_range) {
    var total_range = end_range - start_range;
    var new_total_range = new_end_range - new_start_range;
    var ratio = new_total_range / total_range;
    return (value - start_range) * ratio + new_start_range;
}



function generate_trend_data(range_low,range_high,total_number,random_noise){
    let trend_data = [];
    for (let i = 0; i < total_number; i++){
      let value = map(i, 0, total_number, range_low, range_high);
      value += (Math.random()-0.5)*random_noise;
      trend_data.push(value);
    }
    return trend_data;
  }

  
  
  function generate_trend_data_by_serveral_key_point(list_of_point,length_of_index,noise){
    let trend_data = [];
    for (let i = 0; i < list_of_point.length-1; i++){

       var temp_list = (generate_trend_data(list_of_point[i],list_of_point[i+1],length_of_index[i],noise));
       
       //loop through the temp_list and push it to trend_data
         for (let j = 0; j < temp_list.length; j++){
            trend_data.push(temp_list[j]);
         }
    }

    console.log(trend_data);


    return trend_data;

  }

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  

  function process_list_to_json(list_of_point,noise = 0){
        // recreate the data in json format
        let trend_data_json = [];
        for (let i = 0; i < list_of_point.length; i++){
          let temp = {
            "date": i,
            "A": list_of_point[i]+(Math.random()-0.5)*noise
          }
          trend_data_json.push(temp);
        }
        return trend_data_json;
  }

  function process_list_to_json_two_dataset(list_of_point,list_of_point_2,noise = 0){


    // recreate the data in json format
    let trend_data_json = [];
    for (let i = 0; i < list_of_point.length; i++){
      let temp = {
        "date": i,
        "A": list_of_point[i]+(Math.random()-0.5)*noise,
        "B": list_of_point_2[i]+(Math.random()-0.5)*noise
      }
      trend_data_json.push(temp);
    }
    return trend_data_json;
  }




  //generate a list of random number which sum up to a value
  function generateNumbers(n, v) {
    // Check if input is valid
    if (n <= 0 || v <= 0) {
      return [];
    }
    
    // Initialize variables
    const numbers = [];
    let sum = 0;
    
    // Generate n-1 random numbers and add to array
    for (let i = 0; i < n-1; i++) {
      const num = Math.random() * (v - sum);
      numbers.push(num);
      sum += num;
    }
    
    // Add last number to array to make total sum v
    numbers.push(v - sum);
    
    return numbers;
  }

  
  function generate_sinwave(amplitude, frequency, phase, offset, total_number){
    let sinwave_data = [];
    for (let i = 0; i < total_number; i++){
      let value = amplitude * Math.sin(2 * Math.PI * frequency * i/total_number + phase) + offset;
      sinwave_data.push(value);
    }
    return sinwave_data;
  }

  function generate_pulse_wave(amplitude, frequency, phase, offset, total_number){
    let pulsewave_data = [];
    console.log("triggered generate square wave");
    for (let i = 0; i < total_number; i++){
      let value = amplitude * Math.sign(Math.sin(2 * Math.PI * frequency * i/total_number + phase)) + offset;
      pulsewave_data.push(value);
    }

    return pulsewave_data;
  }



  
  function sendData(input_method,data) {
    //const data = [];

// switch on different metho

    const url = 'http://127.0.0.1:8000/save_csv/'+input_method;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        console.log(`Saved CSV file ${response.filename} at ${response.filepath}`);
      }
    };
    xhr.send(JSON.stringify(data));
  }


