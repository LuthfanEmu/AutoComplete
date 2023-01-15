import React from "react";
import classNames from "classnames";

const Cards = (props) => {
  const {children, className} = props;

  return (
    <div
      className={classNames("border-2 border-gray-400 rounded bg-white", {
        [className]: className,
      })}
    >
      {children}
    </div>
  );
};

export default Cards;
