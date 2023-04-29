import React from 'react';

const AddCharacter = ({ handleClick }) => {
  return (
    <button id="addCharacter" onClick={handleClick}>
      +
    </button>
  );
};

export default AddCharacter;