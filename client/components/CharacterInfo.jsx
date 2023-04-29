import React from 'react';
import * as d3 from 'd3';

const CharacterInfo = ({name, stats, generateColorFn}) => {
  const bg = d3.color(generateColorFn(Object.values(stats))).copy({opacity: 0.25});
  const statDivs = [];
  for (const stat in stats) {
    statDivs.push(
    <div className="stat">
      <h1>{stat}</h1>
      <p>{stats[stat]}</p>
    </div>
    );
  }
  return (
    <div className="characterInfo"
      style={{
        backgroundColor: bg,
        border: `2px solid ${bg}`
      }}>
      {name}
      <div>{statDivs}</div>
    </div>
  );
}

export default CharacterInfo;