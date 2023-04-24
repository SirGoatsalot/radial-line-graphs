import * as d3 from 'd3';

const ABILITY_SCORES = {
  'STR': 10,
  'DEX': 10,
  'CON': 10,
  'INT': 10,
  'WIS': 10,
  'CHA': 10
};

const DATA = [];
const RANGE_X = [0, 6];
const RANGE_Y = [0, 20];

const margin = {top: 40, right: 40, bottom: 40, left: 40}
const height = 450;
const width = 450;

const populateData = (func) => {
  for (let i = RANGE_X[0]; i <= RANGE_X[1]; i++) {
    DATA.push([i, func(i)]);
    console.log(DATA[i]);
    if (DATA[i][1] < RANGE_Y[1]) {
      RANGE_Y[1] = DATA[i][1];
      console.log('new lowest value');
    }
    if (DATA[i][1] > RANGE_Y[0]) {
      RANGE_Y[0] = DATA[i][1];
      console.log('new highest value');
    }
  }
};

populateData((x) => x * .5);

const angle = d3.scaleLinear(RANGE_X, [0, Math.PI * 2]);
const radius = d3.scaleLinear(RANGE_Y, [0, width / 2]);


const graph = d3.select('#graph');
const line = d3.lineRadial()
  .angle(d => angle(d[0]))
  .radius(d => radius(d[1]))
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
  .attr('transform', `translate(${(height / 2) + margin.left}, ${(width / 2) + margin.top})`);


  // Graph axes

// graph.append('g')
//   .classed('axis--x', true)
//   .attr("transform", `translate(${margin.left}, ${height + margin.top})`)
//   .call(d3.axisBottom(SCALE_X));


// graph.append('g')
//   .classed('axis--y', true)
//   .attr("transform", "translate("+margin.left+','+margin.right+')')
//   .call(d3.axisLeft(SCALE_Y));
