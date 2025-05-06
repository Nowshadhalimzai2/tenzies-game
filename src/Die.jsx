import React from "react";
const Die = (props) => {
  const gridType = (value) => {
    switch (value) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3";
      case 4:
        return "grid-cols-2 gap-2";
      case 5:
        return "grid-cols-3";
      case 6:
        return "grid-cols-3";
    }
  };
  return (
    // "w-12 h-12 bg-white rounded-md shadow-lg flex items-center justify-center text-2xl text-gray-700"
    <button
      className={`die w-16 h-16  rounded-md shadow-md inset-2 font-bold flex items-center justify-center text-2xl text-gray-700 border-0 p-0 ${
        props.isHeld ? "bg-green-500" : "bg-white"
      }`}
      onClick={props.onClick}
    >
      {/* {props.value} */}
      <div
        className={`grid ${gridType(
          props.value
        )}  w-full w-full gap-x-1 gap-y-2 px-1 ml-2`}
      >
        {Array.from({ length: props.value }, (_, index) => (
          <small
            className={`h-2.5 w-2.5 bg-black rounded-full ${
              props.value === 1 && "bg-red-500 ml-4 h-3 w-3"
            } `}
            key={index}
          ></small>
        ))}
      </div>
    </button>
  );
};

export default Die;
