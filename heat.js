

let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

let margin = {top: 40, bottom: 70, left: 120, right: 70},
    w = 1200 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom,
    padding = 30;

var svg = d3.select(".map").append("svg")
.attr(`width`, `${w + margin.left + margin.right}`)
.attr("height", `${h + margin.top + margin.bottom}`).append("g")
.attr(`transform`, `translate(${margin.left}, ${margin.top})`)

var parseTime = d3.timeParse("%m")
var convertToMonth = d3.timeFormat("%")

var months = ["January", "February", 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

var colors  = ["rgb(255,242,0)", "rgb(248,147,31)", "rgb(244,101,35)", "rgb(248,147,31)", "rgb(237,27,36)", "rgb(146,39,143)", "rgb(101,45,146)", "rgb(38,33,99)", "rgb(46,48,148)", "rgb(9,179,205)", "rgb(33,178,75)",  "rgb(140,198,62)","brown"];



//JSON fx
d3.json(url, function(data){

//tool-tip


var datum = data.monthlyVariance

datum.forEach(function(d){
    d.month = parseTime(d.month).getMonth()
})

console.log(datum[datum.length-1])

var tip = d3.tip().attr("class", "d3-tip").html(function(d) {
  return `<strong>${months[d.month]} ${d.year} </strong>  <br> Temp: ${data.baseTemperature + d.variance} &#8451; <br> Variance: ${d.variance} `;
 })


var rect = svg.selectAll("rect").data(datum).enter().append("rect");

rect.call(tip) //call tool-tip

var minYear = d3.min(datum, function(d){return d.year})
var maxYear = d3.max(datum, function(d){return d.year})

var xScale = d3.scaleLinear()
                .domain([minYear, maxYear] )
                .range([0, w])


var yScale = d3.scaleLinear()
              .domain([12, 0])
              .range([h, 0])
var test = data.baseTemperature

rect.attr("x", function(d){return xScale(d.year)})
    .attr("y", function(d){return yScale(d.month)})
    .attr("width", yScale(w/datum.length))
    .attr("height", yScale((datum.length/12)/h))
    .attr("fill", function(d){
      if (data.baseTemperature + d.variance >1 && data.baseTemperature + d.variance < 2){
        return "rgb(255,242,0)"
      } // 1 - 2

      else if (data.baseTemperature + d.variance >2 && data.baseTemperature + d.variance < 3){
        return "rgb(248,147,31)"
      }  //2 - 3


      else if (data.baseTemperature + d.variance >3 && data.baseTemperature + d.variance < 4){
        return "rgb(244,101,35)"
      } //3 - 4
      else if (data.baseTemperature + d.variance >4 && data.baseTemperature + d.variance < 5){
        return "rgb(248,147,31)"
      } //4 - 5


      else if (data.baseTemperature + d.variance >5 && data.baseTemperature + d.variance < 6){
        return "rgb(237,27,36)"
      } //5 - 6

      else if (data.baseTemperature + d.variance >6 && data.baseTemperature + d.variance < 7){
        return "rgb(146,39,143)"
      } //6 - 7

      else if (data.baseTemperature + d.variance >7 && data.baseTemperature + d.variance < 8){
        return "rgb(101,45,146)"
      } //7 - 8

      else if (data.baseTemperature + d.variance >8 && data.baseTemperature + d.variance < 9){
        return "rgb(38,33,99)"
      } //8 - 9

      else if (data.baseTemperature + d.variance >9 && data.baseTemperature + d.variance < 10){
        return "rgb(46,48,148)"
      } //9 - 10

      else if (data.baseTemperature + d.variance >10 && data.baseTemperature + d.variance < 11){
        return "rgb(9,179,205)"
      } //10 - 11

      else if (data.baseTemperature + d.variance >11 && data.baseTemperature + d.variance < 12){
        return "rgb(33,178,75)"
      } //11 - 12

      else if (data.baseTemperature + d.variance >12 && data.baseTemperature + d.variance < 13){
        return "rgb(140,198,62)"
      } //12 - 13

      else if (data.baseTemperature + d.variance >13 && data.baseTemperature + d.variance < 14){
        return "brown"
      } //13 - 14
})
    .on('mouseover', tip.show)
  .on('mouseout', tip.hide);//filling color to each rect based on baseTemperature - variance

svg.append("g").call(d3.axisBottom(xScale)).attr("transform", `translate(0, ${h-10})`)

var z = d3.scaleTime()
    .domain([new Date(2012, 0, 1), new Date(2012, 11, 31)])
    .range([0, h ]);



svg.append("g").call(d3.axisLeft(z).ticks(20).tickFormat(d3.timeFormat("%B"))).attr("transform", `translate(0, 10)`)


svg.append("text").text("Months")
.attr("transform", `rotate(-90)`)
.attr("x", `${-h/2}`)
.attr("y", `${-70}`)


svg.append("text").text("Years (1753 - 2015)").attr("transform", `translate(${w/2 - 100}, ${h + margin.top})`)

var ordinal = d3.scaleOrdinal()
          .domain([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13])
          .range(["rgb(255,242,0)", "rgb(248,147,31)", "rgb(244,101,35)", "rgb(248,147,31)", "rgb(237,27,36)", "rgb(146,39,143)", "rgb(101,45,146)", "rgb(38,33,99)", "rgb(46,48,148)", "rgb(9,179,205)", "rgb(33,178,75)",  "rgb(140,198,62)","brown"]);

          var legend = d3.select(".legendOrdinal").append("svg").attr("width", 300).attr("height", 100)

          var legendScale = d3.scaleLinear()
                              .domain([1, 13])
                              .range([1, 240])

          var rect = legend.selectAll("rect").data(colors).enter().append("rect")


          rect.attr("fill", function(d){return d})
                .attr("x", function(d, i){return (i*20) + 20})
                .attr("y", 20)
                .attr("height", 20)
                .attr("width", 20)

svg.append("text").text("Heat Map Measuring Temperature Variantion from Jan 1753 - September 2015 ").attr("class", "mainTitle").attr("transform", `translate(${w/2 - 250}, -10)`)


    legend.append("text").attr("class", "legendText").html(`Variations in Temperature  baseline of 8.66 &#8451`).attr("transform", `translate(20, 80)`)



          legend.append("g").call(d3.axisBottom(legendScale).ticks(13)).attr("transform", `translate(30, 40)`)



})
