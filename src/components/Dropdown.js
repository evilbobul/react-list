import React from 'react';

const Dropdown = ({ label, keys, handleChange }) => {
  return (
    <label>{label}
      <select onChange={handleChange}>
        <option selected disabled>Choose here</option>
        { keys.map((item, i) => (<option key={i} value={item}>{item}</option>)) }
      </select>
    </label>
  )
}

export default Dropdown;
