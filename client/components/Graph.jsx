import React from 'react';
import useD3 from '../hooks/useD3.jsx';
import * as d3 from 'd3';

const Graph = ({ abilityScores }) => {

  const height = 450;
  const width = 450;
  const margin = {top: 40, right: 40, bottom: 40, left: 40}

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

  const generateColor = (scores) => {
    const coeff = 10;
    const r = ((scores[0][1] + scores[1][1] / 2)*coeff).toString(16);
    const g = ((scores[2][1] + scores[3][1] / 2)*coeff).toString(16);
    const b = ((scores[4][1] + scores[5][1] / 2)*coeff).toString(16);
    return d3.color(`#${r}${g}${b}`);
  }

  const ref = useD3(
    (svg) => {
      const labels = Object.keys(abilityScores[0]);
      const data = populateData(abilityScores, labels);

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
        .curve(d3.curveLinearClosed);

        // Adjust svg attributes
      svg.attr('margin', 20)
      .attr('padding', 15)
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.left + margin.right);

      // Graph radial (y) axis
      svg.selectAll('rAxes')
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
          .attr('stroke', '#373737')
          .attr('stroke-width', 2)
          .attr('x2', radius(20))
        })
        .call(g => {
          g.append('text')
          .text(d => labels[d])
          .attr('fill', '#373737')
          .attr('stroke', '#373737')
          .attr('x', radius(25))
          .attr('text-anchor', 'middle')
          .attr('transform', `
          rotate(90, ${radius(25)}, 0)
          translate(0, 40)`)
        });

        // Graph the line
        for (const character of data) {
          const color = generateColor(character);
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
    <div id='graph'>
      <svg id='graphArea'
        ref = {ref}
        style={{
          height: height * 1.25,
          width: width * 1.25,
          border: '1px solid black'
        }}
        />
    </div>
  );
};

export default Graph;