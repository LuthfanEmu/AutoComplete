import React, { forwardRef, useRef } from "react";
import Cards from "./cards";
import { Items } from "./Items";

export const ListedItems = forwardRef((props, ref) => {
  const { items = [], onListClick, active } = props;  

  const onChange = (value) => {      
    onListClick(value)
  };
  console.log("akt", active)
  return (
    <Cards className="p-2 flex flex-col flex-1 max-h-60 overflow-scroll w-[210px]">
      <ul className="h-3/5">
        {items.map((val, idx) => {
          let temp;
          if (idx === active) {
              temp = "bg-blue-600 cursor-pointer text-white odd:bg-blue-600";
          }
          return <Items ref={ref} value={val} onClick={onChange} className={temp} />;
        })}
      </ul>
    </Cards>
  );
});
