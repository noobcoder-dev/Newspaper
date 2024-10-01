import React, { useState } from 'react';

export const Select = ({ onValueChange, defaultValue, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (value) => {
    setSelectedValue(value);
    onValueChange(value);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button onClick={toggleDropdown} className="bg-gray-200 rounded px-4 py-2">
        {selectedValue || 'Select an option'}
      </button>
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border rounded shadow-md">
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { onSelect: handleSelect });
          })}
        </div>
      )}
    </div>
  );
};

export const SelectTrigger = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectValue = ({ value }) => {
  return <span>{value}</span>;
};

export const SelectContent = ({ children }) => {
  return <div>{children}</div>;
};

export const SelectItem = ({ value, onSelect, children }) => {
  return (
    <div
      onClick={() => onSelect(value)}
      className="cursor-pointer hover:bg-gray-200 p-2"
    >
      {children}
    </div>
  );
};
