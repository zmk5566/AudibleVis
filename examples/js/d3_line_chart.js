    var myData = "date	New York	San Francisco	Austin\n\
20111001	63.4	62.7	72.2\n\
20111002	58.0	59.9	67.7\n\
20111003	53.3	59.1	69.4\n\
20111004	55.7	58.8	68.0\n\
20111005	64.2	58.7	72.4\n\
20111006	58.8	57.0	77.0\n\
20111007	57.9	56.7	82.3\n\
20111008	61.8	56.8	78.9\n\
20111009	69.3	56.7	68.8\n\
20111010	71.2	60.1	68.7\n\
20111011	68.7	61.1	70.3\n\
20111012	61.8	61.5	75.3\n\
20111013	63.0	64.3	76.6\n\
20111014	66.9	67.1	66.6\n\
20111015	61.7	64.6	68.0\n\
20111016	61.8	61.6	70.6\n\
20111017	62.8	61.1	71.1\n\
20111018	60.8	59.2	70.0\n\
20111019	62.1	58.9	61.6\n\
20111020	65.1	57.2	57.4\n\
20111021	55.6	56.4	64.3\n\
20111022	54.4	60.7	72.4\n";

    var isMouseOnChart = false;
            // Initializing variables
    var requestId;
    var stopped=true;
    var starttime;
    var time_consume =3000;
    var spectro_vis;
    var speed=2;
    var logView=true;
    var pitch_range=72;
    var pitch_start = -36;
    var margin = {
        top: 20,
        right: 80,
        bottom: 30,
        left: 50
      },
      width = 900 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

    var parseDate = d3.time.format("%Y%m%d").parse;

    var x = d3.time.scale()
      .range([0, width]);

    var y = d3.scale.linear()
      .range([height, 0]);

    var color = d3.scale.category10();

    var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

    var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left");

    var line = d3.svg.line()
      .interpolate("basis")
      .x(function(d) {
        return x(d.date);
      })
      .y(function(d) {
        return y(d.temperature);
      });

    var svg = d3.select("#main_graph").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var data = d3.tsv.parse(myData);

    color.domain(d3.keys(data[0]).filter(function(key) {
      return key !== "date";
    }));

    data.forEach(function(d) {
      d.date = parseDate(d.date);
    });

    var cities = color.domain().map(function(name) {
      return {
        name: name,
        values: data.map(function(d) {
          return {
            date: d.date,
            temperature: +d[name]
          };
        })
      };
    });

    x.domain(d3.extent(data, function(d) {
      return d.date;
    }));

    y.domain([
      d3.min(cities, function(c) {
        return d3.min(c.values, function(v) {
          return v.temperature;
        });
      }),
      d3.max(cities, function(c) {
        return d3.max(c.values, function(v) {
          return v.temperature;
        });
      })
    ]);

    var legend = svg.selectAll('g')
      .data(cities)
      .enter()
      .append('g')
      .attr('class', 'legend');

    legend.append('rect')
      .attr('x', width - 20)
      .attr('y', function(d, i) {
        return i * 20;
      })
      .attr('width', 10)
      .attr('height', 10)
      .style('fill', function(d) {
        return color(d.name);
      });

    legend.append('text')
      .attr('x', width - 8)
      .attr('y', function(d, i) {
        return (i * 20) + 9;
      })
      .text(function(d) {
        return d.name;
      });

    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

    svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Temperature (ºF)");

    var city = svg.selectAll(".city")
      .data(cities)
      .enter().append("g")
      .attr("class", "city");

    city.append("path")
      .attr("class", "line")
      .attr("d", function(d) {
        return line(d.values);
      })
      .style("stroke", function(d) {
        return color(d.name);
      });

    city.append("text")
      .datum(function(d) {
        return {
          name: d.name,
          value: d.values[d.values.length - 1]
        };
      })
      .attr("transform", function(d) {
        return "translate(" + x(d.value.date) + "," + y(d.value.temperature) + ")";
      })
      .attr("x", 3)
      .attr("dy", ".35em")
      .text(function(d) {
        return d.name;
      });

    var mouseG = svg.append("g")
      .attr("class", "mouse-over-effects");

    mouseG.append("path") // this is the black vertical line to follow mouse
      .attr("class", "mouse-line")
      .style("stroke", "black")
      .style("stroke-width", "1px")
      .style("opacity", "0");
      
    var lines = document.getElementsByClassName('line');

    var mousePerLine = mouseG.selectAll('.mouse-per-line')
      .data(cities)
      .enter()
      .append("g")
      .attr("class", "mouse-per-line");

    mousePerLine.append("circle")
      .attr("r", 7)
      .style("stroke", function(d) {
        return color(d.name);
      })
      .style("fill", "none")
      .style("stroke-width", "1px")
      .style("opacity", "0");

    mousePerLine.append("text")
      .attr("transform", "translate(10,3)");

    mouseG.append('svg:rect') // append a rect to catch mouse movements on canvas
      .attr('width', width) // can't catch mouse events on a g element
      .attr('height', height)
      .attr('fill', 'none')
      .attr('pointer-events', 'all')
      .on('mouseout', function() { // on mouse out hide line, circles and text
         if (stopped){
          trigger_end_display_lines();
          stop_play();
        }
      })
      .on('mouseover', function() { // on mouse in show line, circles and text
        if (stopped){
          trigger_display_lines();
        }
      })
      .on('mousemove', function() { // mouse moving over canvas
        if (stopped){
        var mouse = d3.mouse(this);
        console.log("mouse location "+mouse[0]/width)
        trigger_line_movement(mouse[0]/width)
      }

      });

      function trigger_display_lines(){
        isMouseOnChart = true;
        console.log("starrrt mousing over");
        d3.select(".mouse-line")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "1");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "1");
      }

      function trigger_end_display_lines(){
        isMouseOnChart = false;
        console.log("mouse out")
        d3.select(".mouse-line")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line circle")
          .style("opacity", "0");
        d3.selectAll(".mouse-per-line text")
          .style("opacity", "0");
      }

      /**
       * input timple should be between 0~1
       * */
      function trigger_line_movement(input_timeline){
          d3.select(".mouse-line")
          .attr("d", function() {
            var d = "M" + input_timeline*width + "," + height;
            d += " " + input_timeline*width + "," + 0;
            return d;
          });

        d3.selectAll(".mouse-per-line")
          .attr("transform", function(d, i) {
            var xDate = x.invert(input_timeline*width),
                bisect = d3.bisector(function(d) { return d.date; }).right;
                idx = bisect(d.values, xDate);
            
            var beginning = 0,
                end = lines[i].getTotalLength(),
                target = null;

            while (true){
              target = Math.floor((beginning + end) / 2);
              pos = lines[i].getPointAtLength(target);
              if ((target === end || target === beginning) && pos.x !== input_timeline*width) {
                  break;
              }
              if (pos.x > input_timeline*width)      end = target;
              else if (pos.x < input_timeline*width) beginning = target;
              else break; //position found
            }
            
            d3.select(this).select('text')
              .text(y.invert(pos.y).toFixed(2));
               trigger_synth_activation(i,pos.y/height);
               //console.log("current index: "+i+" , current Value: "+pos.y/height);
              
            return "translate(" + input_timeline*width + "," + pos.y +")";
          });
      }

      var curr_time = 0;
      function update_d3_with_timer(){
         curr_time = 0;
         setInterval(function () { update_loop()}, 20); 

      }

      function update_loop(){
        curr_time = curr_time+0.002;
        trigger_line_movement(curr_time);
      }

      function get_time_elapse(){
          return (1-((time_consume-(Date.now() - starttime))/time_consume));
      }




  
        function startAnim(time) {
  
            // Set left style to a function of time if it is not stopped
            if (!stopped) {
                // We use the difference between time returned 
                // by Data.now() and the animation starttime 
                var temp_time = get_time_elapse();
                console.log("time elapsed" + get_time_elapse());
                if ( temp_time>=1){
                  stop_play();
                }else{

                //perform the animation loop 
                trigger_line_movement(temp_time)
                requestId = window.requestAnimationFrame(startAnim);
              }
            }
        }
  
        function start() {
          if (Tone.context.state !="running"){
              Tone.start();
          }

          if (stopped){
            // Return the number of milliseconds since 1970/01/01:
            starttime = Date.now();
            trigger_display_lines();
  
            // Starting point of animation
            requestId = window.requestAnimationFrame(startAnim);
            stopped = false; // Means animation will not stop 
          }
        }

        function stop_play(){
          stopped=true;

          synth_list.forEach(function(element) { element.triggerRelease() })


          trigger_end_display_lines();
        }



      const toneFFT = new Tone.FFT();

      const tremolo_1 = new Tone.Tremolo(0, 1).toDestination().start();
      const tremolo_2 = new Tone.Tremolo(0, 1).toDestination().start();
      const tremolo_3 = new Tone.Tremolo(0, 1).toDestination().start();

      const panner_1 = new Tone.Panner(-1).connect(tremolo_1).connect(toneFFT).toDestination();
      const panner_2 = new Tone.Panner(0).connect(tremolo_2).connect(toneFFT).toDestination();
      const panner_3 = new Tone.Panner(1).connect(tremolo_3).connect(toneFFT).toDestination();


      const synth_1 = new Tone.Synth({
        oscillator: {
          type: 'triangle'
        },
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 0.01,
          release: 0.1
        }
      }).connect(panner_1);

      const synth_2 = new Tone.Synth({
        oscillator: {
          type: 'square'
        },
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 0.01,
          release: 0.1
        }
      }).connect(panner_2);


        const synth_3 = new Tone.Synth({
        oscillator: {
          type: 'sawtooth'
        },
        envelope: {
          attack: 0,
          decay: 0,
          sustain: 0.01,
          release: 0.1
        }
      }).connect(panner_3);



        const synth_list = [synth_1,synth_2,synth_3];
        var is_map_volume = true;

        function trigger_synth_activation(index_number,data){
          const now = Tone.now()

          // trigger the attack immediately
          if (is_map_volume){
          synth_list[index_number].volume.value = (0.5-data)*80;
          }
          if (Tone.now()>0.5){
          synth_list[index_number].triggerAttack(caculate_freq(data), now)
        } else{
          Tone.start();
        }
        }


        
        function caculate_freq(input_index){
          return 440* Math.pow(2, ((1-input_index)*pitch_range+pitch_start)/12);
        }

        
  let sketch = function(p) {
    p.setup = function(){
      p.createCanvas(200, 200);
      p.background(0);
      spectro_vis = p.createGraphics(200, 200);
    }
    p.draw = function(){

      process_spectrograph_fft(toneFFT.getValue());
      //console.log(toneFFT.getValue()[0])
      //spectro_vis.background(255,255,255)
      p.image(spectro_vis, 0, 0);
    }
  };
  new p5(sketch, 'container');


  var panel1 = QuickSettings.create(920, 10, "Settings")
  panel1.addRange("Duration in ms", 2000,12000, time_consume, 1000,  function (value) {time_consume=value})
  panel1.addBoolean("Spectrograph Log View", true, function (value) {logView=value});  
  panel1.addBoolean("Volume Map", true, function (value) {is_map_volume=value});  
  panel1.addRange("Tremolo Frequency line 1", 0, 10, tremolo_1.frequency.value, 0.5,  function (value) {tremolo_1.frequency.value=value})
  panel1.addRange("Tremolo Frequency line 2", 0, 10, tremolo_2.frequency.value, 0.5,  function (value) {tremolo_2.frequency.value=value})
  panel1.addRange("Tremolo Frequency line 3", 0, 10, tremolo_3.frequency.value, 0.5,  function (value) {tremolo_3.frequency.value=value})
  panel1.addRange("Pitch range", 12, 72, pitch_range, 12,  function (value) {pitch_range=value})
  panel1.addRange("Pitch start", -36, 24, pitch_start, 12,  function (value) {pitch_start=value} )

