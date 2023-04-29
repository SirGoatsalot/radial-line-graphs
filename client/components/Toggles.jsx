import React from 'react';

const Toggles = ({ clickFunctions, labels }) => {
  const toggles = [];
  for (let i = 0; i < clickFunctions.length; i++) {
    toggles.push(
      <div className='toggle'>
        {labels[i]}
        <button className='toggle' onClick={(e) => clickFunctions[i](e)}/>
      </div>
    );
  }
  return (
    <div className='toggles'>
      {toggles}  
    </div>
  );
};

export default Toggles;