

let url = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

let margin = {top: 90, bottom: 70, left: 50, right: 50},
    w = 1400 - margin.left - margin.right,
    h = 500 - margin.top - margin.bottom,
    padding = 30;

var svg = d3.selectAll("body").append("svg")
.attr(`width`, `${w + margin.left + margin.right}`)
.attr("height", `${h + margin.top + margin.bottom}`).append("g")
.attr(`transform`, `translate(${margin.left}, ${margin.top})`)

var parseTime = d3.timeParse("%m")
var convertToMonth =d3.timeFormat("%b")

//JSON fx
d3.json(url, function(data){

//tool-tip


var datum = data.monthlyVariance



var tip = d3.tip()
  .attr('class', 'd3-tip')
  .offset([-10, 0])
  .html(function(d) {
d.month = convertToMonth(parseTime(d.month))
    return `<strong>${d.month} ${d.year} </strong>  <br> Temp: ${data.baseTemperature + d.variance} &#8451; <br> Variance: ${d.variance} `;
  })

console.log(datum[0])

console.log(d3.max(datum, function(d){return convertToMonth(parseTime(d.month))}))

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
//data.baseTemperature


rect.attr("x", function(d){return xScale(d.year)})
    .attr("y", function(d){return yScale(d.month)})
    .attr("width", yScale(w/datum.length))
    .attr("height", function(d){return yScale(d.month)})
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

svg.append("g").call(d3.axisBottom(xScale)).attr("transform", `translate(0, ${h + margin.top})`)

svg.append("g").call(d3.axisLeft(yScale)).attr("transform", `translate(0, 50)`)


})
