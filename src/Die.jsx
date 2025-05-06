import React from "react";

const Die = (props) => {
  return (
    // "w-12 h-12 bg-white rounded-md shadow-lg flex items-center justify-center text-2xl text-gray-700"
    <button
      className={`die w-16 h-16  rounded-md shadow-md inset-2 font-bold flex items-center justify-center text-2xl text-gray-700 border-0 p-0 ${
        props.isHeld ? "bg-green-500" : "bg-white"
      }`}
      onClick={props.onClick}
    >
      {/* {props.value} */}
      <div className="grid grid-cols-3  w-full w-full gap-x-1 gap-y-2 px-1 text-center justify-center items-center">
        {Array.from({ length: props.value }, (_, index) => (
          <small
            className="h-2.5 w-2.5 bg-black rounded-full"
            key={index}
          ></small>
        ))}
      </div>
    </button>
  );
};

export default Die;
