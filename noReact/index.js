import * as d3 from 'd3';

const DATA = [];
const RANGE_X = [0, 50];
const RANGE_Y = [50, 0];

const margin = {top: 40, right: 40, bottom: 40, left: 40}
const height = 450;
const width = 450;

const populateData = (func) => {
  for (let i = RANGE_X[0]; i < RANGE_X[1]; i++) {
    DATA.push([i, func(i)]);
    if (DATA[i] < RANGE_Y[1]) RANGE_Y[1] = DATA[i][1];
    if (DATA[i] > RANGE_Y[0]) RANGE_Y[0] = DATA[i][1];
  }
};

const SCALE_X = d3.scaleLinear(RANGE_X, [0, 450]);
const SCALE_Y = d3.scaleLinear(RANGE_Y, [0, 450]);

populateData((x) => Math.random() * x);



const graph = d3.select('#graph');
const line = d3.line()
  .x(d => SCALE_X(d[0]))
  .y(d => SCALE_Y(d[1]))
  .curve(d3.curveLinear);

// Adjust svg attributes
graph.attr('margin', 20)
  .attr('padding', 15)
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right)
  ;

// Graph the line
graph.append('path')
  .datum(DATA)
  .attr('fill', 'none')
  .attr('stroke', 'black')
  .attr('stroke-width', 2)
  .attr('d', line)
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  // Graph axes

graph.append('g')
  .classed('axis--x', true)
  .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
  .call(d3.axisBottom(SCALE_X));


graph.append('g')
  .classed('axis--y', true)
  .attr("transform", "translate("+margin.left+','+margin.right+')')
  .call(d3.axisLeft(SCALE_Y));
