import React, { useState } from 'react';
import Graph from '../components/Graph.jsx';
import CharacterInfo from '../components/CharacterInfo.jsx';
import AddCharacter from '../components/AddCharacter.jsx';
import Toggles from '../components/Toggles.jsx';

const Body = () => {
  const [abilityScores, setAbilityScores] = useState([
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
      'STR': 6,
      'DEX': 11,
      'CON': 10,
      'INT': 12,
      'WIS': 19,
      'CHA': 16
    },
    {
      'STR': 17,
      'DEX': 14,
      'CON': 11,
      'INT': 11,
      'WIS': 10,
      'CHA': 11
    },
    {
      'STR': 17,
      'DEX': 15,
      'CON': 12,
      'INT': 10,
      'WIS': 7,
      'CHA': 8
    },
  ]);
  const [names, setNames] = useState([
    'Alberic Thornburrow',
    'Vincent Eichmann',
    'Connor McClarren',
    'Mari',
    'Tobias'
  ]);

  const [linear, setLinear] = useState(true);

  const generateColorFn = (scores) => {
    const coeff = 10;
    let r = (scores[0] + scores[1] / 2)*coeff;
    let g = (scores[2] + scores[3] / 2)*coeff;
    let b = (scores[4] + scores[5] / 2)*coeff;
    r = r > 255 ? 'ff' : r.toString(16);
    g = g > 255 ? 'ff' : g.toString(16);
    b = b > 255 ? 'ff' : b.toString(16);
    return `#${r}${g}${b}`;
  }

  const characterInfoPanels = [];
  for (let i = 0; i < abilityScores.length; i++) {
    characterInfoPanels.push(
      <CharacterInfo 
        name={names[i]}
        stats={abilityScores[i]}
        generateColorFn={generateColorFn}
      />
    );
  }

  const clickFunctions = [
    (e) => {setLinear(!linear);}
  ];
  const clickFunctionLabels = [
    'linear'
  ];

  return (
    <div id="body">
      <Toggles clickFunctions={clickFunctions} 
        labels={clickFunctionLabels}/>
      <Graph 
        abilityScores={abilityScores}
        generateColorFn={generateColorFn}
        height={450}
        width={450}
        margin={{top: 40, right: 40, bottom: 40, left: 40}}
        axesColor='#575757'
        linear={linear}
      />
      {characterInfoPanels}
      <AddCharacter />
    </div>
  );
};

export default Body;