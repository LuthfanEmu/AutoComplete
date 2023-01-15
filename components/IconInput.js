import React from "react";
import { Search } from "react-feather";
import Image from 'next/image'

export const IconInput = ({
  onChange,
  onKeyDown,
  value,
  disabled,
  isLoading,
}) => {
  return (
    <div className="w-full m-auto inline-block">
      <Search className="absolute mt-2 p-1" />
      {isLoading && 
        <img className="absolute mt-3 mr-2 w-4 h-4 left-auto right-3" src="/images/loadings.gif" alt="loading..." />
      }
      <input
        className="w-full pl-7 text-left p-3 h-8 mt-1 border-2 rounded-sm border-gray-300"
        type="text"
        onChange={(e) => onChange(e)}
        onKeyDown={(e) => onKeyDown(e)}
        value={value}
        disabled={disabled}
      />               
    </div>
  );
};
