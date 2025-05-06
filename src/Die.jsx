import React from "react";
const Die = (props) => {
  const gridType = (value) => {
    switch (value) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-2";
      case 3:
        return "grid-cols-3 ";
      case 4:
        return "grid-cols-2 md:gap-2 gap-1";
      case 5:
        return "grid-cols-3";
      case 6:
        return "grid-cols-3";
    }
  };
  return (
    <button
      className={`die md:w-16 md:h-16 w-12 h-12 rounded-md  border-b-4 border-r-2  transition-all duration-300 border-gray-400 shadow-md font-bold flex items-center justify-center border-0 p-0 ${
        props.isHeld ? "bg-green-500" : "bg-white"
      }`}
      onClick={props.onClick}
      aria-pressed={props.isHeld} // Indicates the toggle state
      aria-label={`Die with value ${props.value}`} // Describes the die value
    >
      <div
        className={`grid ${gridType(
          props.value
        )} w-full w-full gap-x-1 gap-y-2 px-1 ml-2`}
        role="group" // Groups the dots for accessibility
        aria-label={`Die face showing ${props.value} dots`} // Describes the die face
      >
        {Array.from({ length: props.value }, (_, index) => (
          <small
            className={`md:h-2.5 md:w-2.5 w-1.5 h-1.5 bg-black rounded-full ${
              props.value === 1 && "bg-red-500 md:ml-4 md:h-3 md:w-3"
            } `}
            key={index}
            role="presentation" // Marks dots as decorative
          ></small>
        ))}
      </div>
    </button>
  );
};

export default Die;
