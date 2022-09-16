

  export class InteractiveLineChart{

      constructor(){
          this.margin = {top: 20, right: 80, bottom: 30, left: 50};
          this.width = 960 - this.margin.left - this.margin.right;
          this.height = 500 - this.margin.top - this.margin.bottom;
          this.x = d3.time.scale().range([0, this.width]);
          this.y = d3.scale.linear().range([this.height, 0]);
          this.xAxis = d3.svg.axis().scale(this.x).orient("bottom");
          this.yAxis = d3.svg.axis().scale(this.y).orient("left");
          this.isMouseOnChart = false;
          this.stopped = true;
          this.lines = [];
          this.total_data = [];

          this.line  = d3.svg.line()
            .interpolate("basis")
            .x(function(d) {
              return this.x(d.date);
            })
            .y(function(d) {
              return this.y(d.temperature);
            });
          }
      
          

        drawChart(){

          var svg = d3.select("body").append("svg")
              .attr("width", this.width + this.margin.left + this.margin.right)
              .attr("height", this.height + this.margin.top + this.margin.bottom)
              .append("g")
              .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");
          var color = d3.scale.category10();
          var parseDate = d3.time.format("%Y%m%d").parse;


          d3.csv("./res/data.csv", function(error, data) {
             //console.log(data);
              if (error) throw error;
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

              this.total_data = cities;

              this.total_data.forEach(function(d) {
                this.total_data.current_value = 0;
                this.total_data.uniform_value = 0;
              }.bind(this));
              
            this.x.domain(d3.extent(data, function(d) {
              return d.date;
            }));

            this.y.domain([
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
            .attr('x', this.width - 20)
            .attr('y', function(d, i) {
              return i * 20;
            })
            .attr('width', 10)
            .attr('height', 10)
            .style('fill', function(d) {
              return color(d.name);
            });
      
          legend.append('text')
            .attr('x', this.width - 8)
            .attr('y', function(d, i) {
              return (i * 20) + 9;
            })
            .text(function(d) {
              return d.name;
            });
      
          svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + this.height + ")")
            .call(this.xAxis);
      
          svg.append("g")
            .attr("class", "y axis")
            .call(this.yAxis)
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
              //console.log(d.values);
              return this.line(d.values);
            }.bind(this))
            .style("stroke", function(d) {
              return color(d.name);
            }.bind(this));
      
          city.append("text")
            .datum(function(d) {
              return {
                name: d.name,
                value: d.values[d.values.length - 1]
              };
            })
            .attr("transform", function(d) {
              return "translate(" + this.x(d.value.date) + "," + this.y(d.value.temperature) + ")";
            }.bind(this))
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
            
          this.lines = document.getElementsByClassName('line');

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
          .attr('width', this.width) // can't catch mouse events on a g element
          .attr('height', this.height)
          .attr('fill', 'none')
          .attr('pointer-events', 'all')
          .on('mouseout', function() { // on mouse out hide line, circles and text
            //  if (this.stopped){
            //   this.trigger_end_display_lines();
            //   this.stop_play();
            // }
          }.bind(this))
          .on('mouseover', function() { // on mouse in show line, circles and text
            // if (this.stopped){
            //   this.trigger_display_lines();
            // }
          }.bind(this))
          .on('mousemove', function() { // mouse moving over canvas
          //   if (this.stopped){
          //   var mouse = d3.mouse(this);
          //   console.log("mouse location "+mouse[0]/this.width)
          //   this.trigger_line_movement(mouse[0]/this.width)
          // }
    
          }.bind(this));




          }.bind(this));
      }

            /**
       * input timple should be between 0~1
       * */
         trigger_line_movement(input_timeline){
              d3.select(".mouse-line")
              .attr("d", function() {
                var d = "M" + input_timeline*this.width + "," + this.height;
                d += " " + input_timeline*this.width + "," + 0;
                return d;
              }.bind(this));
    
            d3.selectAll(".mouse-per-line")
              .attr("transform", function(d, i) {
                var xDate = this.x.invert(input_timeline*this.width),
                    bisect = d3.bisector(function(d) { return d.date; }).right;
                    var idx = bisect(d.values, xDate);
                    //console.log(idx);
                    //idx = bisect(d.values, xDate);
                
                var beginning = 0,
                    end = this.lines[i].getTotalLength(),
                    target = null;
    
                while (true){
                  target = Math.floor((beginning + end) / 2);
                  var pos = this.lines[i].getPointAtLength(target);
                  if ((target === end || target === beginning) && pos.x !== input_timeline*this.width) {
                      break;
                  }
                  if (pos.x > input_timeline*this.width)      end = target;
                  else if (pos.x < input_timeline*this.width) beginning = target;
                  else break; //position found
                }
                
                // d3.select('text')
                //   .text(this.y.invert(pos.y).toFixed(2));
                   //console.log("current index: "+i+" , current Value: "+pos.y/height);
                   this.total_data[i].current_value = this.y.invert(pos.y);
                   this.total_data[i].uniform_value = 1-(pos.y/this.height);
                return "translate(" + input_timeline*this.width + "," + pos.y +")";
              }.bind(this));
              //console.log(this.total_data);
              return this.total_data;
          }

          trigger_display_lines(){
            this.isMouseOnChart = true;
            console.log("starrrt mousing over");
            d3.select(".mouse-line")
              .style("opacity", "1");
            d3.selectAll(".mouse-per-line circle")
              .style("opacity", "1");
            d3.selectAll(".mouse-per-line text")
              .style("opacity", "1");
          }
    
          trigger_end_display_lines(){
            this.isMouseOnChart = false;
            console.log("mouse out")
            d3.select(".mouse-line")
              .style("opacity", "0");
            d3.selectAll(".mouse-per-line circle")
              .style("opacity", "0");
            d3.selectAll(".mouse-per-line text")
              .style("opacity", "0");
          }

          start() {
            console.log("start line display")

            if (this.stopped){
              // Return the number of milliseconds since 1970/01/01:
              trigger_display_lines();
    
              // Starting point of animation
              requestId = window.requestAnimationFrame(startAnim);
              this.stopped = false; // Means animation will not stop 
            }
          }
  
          stop_play(){
            this.stopped=true;
  
            //synth_list.forEach(function(element) { element.triggerRelease() })

            trigger_end_display_lines();
          }

          gettotalData(){
            return this.total_data;
          }

    
  }


