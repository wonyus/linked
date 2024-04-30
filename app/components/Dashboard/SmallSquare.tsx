import React from "react";

export interface ISmallSquare {
  count?: number;
  text: string;
}

const SmallSquare = ({ count, text }: ISmallSquare) => {
  return (
    <div
      style={{
        width: "320px",
        height: "200px",
        backgroundColor: "#007949",
      }}
    >
      {text}
      {count}
    </div>
  );
};

export default SmallSquare;
