import * as d3 from 'd3';
import styles from './styles/styles.scss';

const ABILITY_SCORES = {
  'STR': 5,
  'DEX': 11,
  'CON': 12,
  'INT': 16,
  'WIS': 18,
  'CHA': 13
};
const LABELS = [
  'STR', 'DEX', 'CON', 'INT', 'WIS', 'CHA'
]
const DATA = [];

// Margins/styling data
const margin = {top: 40, right: 40, bottom: 40, left: 40}
const height = 450;
const width = 450;
const center_transform = `translate(${(height / 2) + margin.left}, ${(width / 2) + margin.top})`

// Scales and Scale Data
const SCALE_R = {
  range: [0, 20],
  steps: [0, 5, 10, 15, 20],
  domain: [0, width / 2],
};
const SCALE_A = {
  range: [0, 6],
  steps: [0, 1, 2, 3, 4, 5],
  domain: [0, Math.PI * 2],
}

const radius = d3.scaleLinear(SCALE_R.range, SCALE_R.domain);
const angle = d3.scaleLinear(SCALE_A.range, SCALE_A.domain);


// Defining path generators/selectors
const graph = d3.select('#graph');

const line = d3.lineRadial()
  .angle(d => angle(d[0]))
  .radius(d => radius(d[1]))
  .curve(d3.curveCardinalClosed);

const aAxis = d3.line()

// Populate data
const populateData = () => {
  let i = 0;
  for (const attribute in ABILITY_SCORES) {
    DATA.push([i, ABILITY_SCORES[attribute]]);
    i++;
  }
};

populateData();

// Adjust svg attributes
graph.attr('margin', 20)
  .attr('padding', 15)
  .attr('height', height + margin.top + margin.bottom)
  .attr('width', width + margin.left + margin.right);

// Graph radial (y) axis
graph.selectAll('rAxes')
  .data(SCALE_R.steps).enter()
  .append('circle')
    .attr('fill', 'none')
    .attr('stroke', '#373737')
    .attr('stroke-width', 2)
    .attr('cx', 0)
    .attr('cy', 0)
    .attr('r', d => radius(d))
    .attr('transform', center_transform);

// Graph the angular (x) axes
graph.selectAll('aAxes')
  .data(SCALE_A.steps).enter()
  .append('g')
  .attr('transform', d => `
  translate(${(height / 2) + margin.left}, ${(width / 2) + margin.top})
  rotate(${angle(d) * (180/Math.PI)})
  `)
  .call(g => {
    g.append('line')
    .attr('fill', 'none')
    .attr('stroke', '#373737')
    .attr('stroke-width', 2)
    .attr('x2', radius(20))
  })
  .call(g => {
    g.append('text')
    .text(d => LABELS[d])
    .attr('fill', '#373737')
    .attr('stroke', '#373737')
    .attr('x', radius(25))
    .attr('text-anchor', 'middle')
    .attr('transform', `
    rotate(90, ${radius(25)}, 0)
    translate(0, 40)`)
  });
  
  
    

// Graph the line
graph.append('g')
  .datum(DATA)
  .attr('transform', center_transform)
  .call(g => {
    g.append('path')
    .attr('fill', 'none')
    .attr('stroke', '#782424')
    .attr('stroke-width', 2)
    .attr('d', line)
    .attr('transform', 'rotate(90)');
  });