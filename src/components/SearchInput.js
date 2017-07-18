import React from 'react';

const SearchInput = ({ label, type, handleChange }) => {
  return (
    <label>{label}
      <input type={type} onChange={handleChange} />
    </label>
  );
}

export default SearchInput;
