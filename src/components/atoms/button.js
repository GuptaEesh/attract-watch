import React from "react";

export const Button = ({
  disabled = false,
  btnFunc,
  btnText,
  btnType,
  btnStyle,
}) => {
  return (
    <button
      disabled={disabled}
      onClick={btnFunc}
      className={btnType}
      style={btnStyle}
    >
      {btnText}
    </button>
  );
};
