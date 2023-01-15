import React, { useState, forwardRef, useImperativeHandle } from "react";
import Image from "next/image";
import classNames from "classnames";

export const Items = forwardRef((props, ref) => {
  const { value, onClick, className } = props;

  const [boxChecked, setBoxChecked] = useState(false);

  useImperativeHandle(ref, () => {
    return {
      clickItem: () => onClickItem(),
    };
  });

  const onClickItem = () => {
    setBoxChecked(!boxChecked);
    onClick(value);
  };

  return (
    <li     
      key={value.id}
      className={classNames(
        "flex flex-row mb-1.5 leading-5 cursor-pointer focus:outline-none odd:bg-gray-50 text-gray-600 bg-white",
        {
          [className]: className,
        }
      )}
      onClick={() => onClickItem()}
    >
      {value?.image ? (
        <div className="inline-flex relative">
          <Image
            src={value.image}
            className="pr-1"
            alt="me"
            width="48"
            height="48"
          />
        </div>
      ) : null}
      {value.name}
      <input
       ref={ref}
        classname="float-right absolute right-1"
        style={{ marginLeft: "auto" }}
        name="inputChecker"
        type="checkbox"
        checked={boxChecked}
        onChange={() => setBoxChecked((prev) => !prev)}
        defaultChecked={boxChecked}
      />
    </li>
  );
});
