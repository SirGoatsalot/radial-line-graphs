import React from 'react';
import useD3 from '../hooks/useD3.jsx';
import * as d3 from 'd3';

/**
 * A React Graph component that uses d3 to create a radial area (radar) chart of the given data.
 * Data should be formatted to represent ability scores of DnD characters as follows
 * 
 * [
    {
      'STR': 5,
      'DEX': 11,
      'CON': 12,
      'INT': 16,
      'WIS': 18,
      'CHA': 13
    },
    {
      'STR': 8,
      'DEX': 11,
      'CON': 10,
      'INT': 15,
      'WIS': 12,
      'CHA': 18
    },
    {
      'STR': 13,
      'DEX': 19,
      'CON': 14,
      'INT': 7,
      'WIS': 16,
      'CHA': 3
    },
  ];
 */
const Graph = ({ abilityScores, generateColorFn, width, height, margin, axesColor, linear }) => {

  const populateData = (scores, labels) => {
    const result = [];
    scores.forEach((character, i) => {
      result.push([]);
      for (const score in character) {
        result[i].push([labels.indexOf(score), character[score]]);
      }
    });
    return result;
  }

  const ref = useD3(
    (svg) => {
      const labels = Object.keys(abilityScores[0]);
      const data = populateData(abilityScores, labels);
      const curve = linear ? d3.curveLinearClosed : d3.curveCardinalClosed;

      // Margins/styling data
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
      const line = d3.lineRadial()
        .angle(d => angle(d[0]))
        .radius(d => radius(d[1]))
        .curve(curve);

      // Remove old SVG
      svg.selectAll('*').remove();

      // Graph radial (y) axis
      svg.selectAll('rAxes')
      .data(SCALE_R.steps).enter()
      .append('circle')
        .attr('fill', 'none')
        .attr('stroke', axesColor)
        .attr('stroke-width', 2)
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', d => radius(d))
        .attr('transform', center_transform);
      
        // Graph the angular (x) axes
        svg.selectAll('aAxes')
        .data(SCALE_A.steps).enter()
        .append('g')
        .attr('transform', d => `
        translate(${(height / 2) + margin.left}, ${(width / 2) + margin.top})
        rotate(${angle(d) * (180/Math.PI)})
        `)
        .call(g => {
          g.append('line')
          .attr('fill', 'none')
          .attr('stroke', axesColor)
          .attr('stroke-width', 2)
          .attr('x2', radius(20))
        })
        .call(g => {
          g.append('text')
          .text(d => labels[d])
          .attr('fill', axesColor)
          .attr('stroke', axesColor)
          .attr('x', radius(25))
          .attr('text-anchor', 'middle')
          .attr('transform', `
          rotate(90, ${radius(25)}, 0)
          translate(0, 40)`)
        }, [linear]);

        // Graph the line
        for (const character of data) {
          const color = d3.color(generateColorFn(character.map(stat => stat[1])));
          svg.append('g')
          .datum(character)
          .attr('transform', center_transform)
          .call(g => {
            g.append('path')
            .attr('fill', color.copy({opacity: 0.15}))
            .attr('stroke', color)
            .attr('stroke-width', 2)
            .attr('d', line)
            .attr('transform', 'rotate(90)');
          })
        }
    });
  return (
    <svg id='graph'
      ref = {ref}
      style={{
        height: height + margin.top + margin.bottom,
        width: width + margin.left + margin.right,
      }}
      />
  );
};

export default Graph;