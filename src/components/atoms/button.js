import React from "react";

export const Button = ({
  disabled = false,
  btnFunc,
  btnText,
  btnClass,
  btnStyle,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={btnFunc}
      className={btnClass}
      style={btnStyle}
    >
      {btnText}
    </button>
  );
};
