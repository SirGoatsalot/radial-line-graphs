import React from 'react';
import * as d3 from 'd3';

const Graph = () => {
  const graph = d3.select('#graph');
  graph.style("background-color", "red")
    .style("height", "100px")
    .style("width", "100px")
  return (
    <div id='graph'>
      Hello, World!
    </div>
  );
};

export default Graph;