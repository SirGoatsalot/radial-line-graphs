import React from 'react';
import Graph from '../components/Graph.jsx';

const Body = () => {
  const abilityScores = [
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
  return (
    <div id="body">
      <Graph abilityScores={abilityScores}/>
    </div>
  );
};

export default Body;