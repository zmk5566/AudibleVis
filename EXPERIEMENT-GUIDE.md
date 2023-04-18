
# Spatial Audio Sonification Experiment Guidebook 

## Hardware Setup:

1. Over the head earphone
2. Google cardboard 
3. iPhone (IOS 12+) 

## Software Setup: 

Clone this repo(any system) to local (using the standard repo electron)
https://github.com/zmk5566/soni4vis-spatial.git

Enter he soni4vis-spatial folder, run:

    npm install

Then do:

    npm start
  

You should able to launch a GUI with UI like this 

 
![ui-1](https://user-images.githubusercontent.com/98451647/232720368-ac53b994-6993-43f8-8802-c05eac2ab98a.png)

  
 Then connect the phone gyro to the targeted IP address

![ui-2](https://user-images.githubusercontent.com/98451647/232721068-e167ec7b-c8e5-4c2f-b6f5-58ed3ddf1e3d.jpeg)


## Data Generation

The data generation was done by the function defined in utils/transformHelper.js by these following three functions:

        generate_trend_data_by_serveral_key_point(list_of_point,length_of_index,noise)

        generate_sinwave(amplitude, frequency, phase, offset, total_number)

        generate_pulse_wave(amplitude, frequency, phase, offset, total_number)
        

The generated data was stored in the ./res/ folder with the folder name accordingly.  You can generate your own datalist with this functions and save it as a json file using the provided backend fastapi server. 

Launch fastapi node in the ./backend-server: 
        uvicorn server:app --reload
