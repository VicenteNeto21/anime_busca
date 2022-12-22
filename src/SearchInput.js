import React, { useState } from 'react';
import useDebounce from './useDebounce';

const SeachInput = ({ value, onChange }) => {
  const [displayvalue, setDisplayValue] = useState(value);

  const debouncedChange = useDebounce(onChange, 500);

  function handleChange(event) {
    setDisplayValue(event.target.value);
    debouncedChange(event.target.value);
  }

  return (
    <input
      type="seach"
      value={displayvalue}
      onChange={handleChange}
    />
  );
};

export default SeachInput;
