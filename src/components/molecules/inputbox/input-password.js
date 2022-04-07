import { useState } from "react";
import { BsEyeFill, BsEyeSlash } from "react-icons/bs";
import { Input } from "../../atoms/input";
import "./inputbox.css";
export function InputPass({
  title: name,
  inputClass,
  inputPlaceHolder,
  inputValue,
  inputFunc,
  pattern,
}) {
  const [visibility, setVisibility] = useState(false);
  const toggleVisibilityStyle = { right: "2%", color: "var(--primary-400)" };
  return (
    <label className="flex flex-column">
      <span className="text-white">{name}</span>
      <div className="password-container">
        <Input
          inputClass={inputClass}
          inputType={visibility ? "text" : "password"}
          inputPlaceHolder={inputPlaceHolder}
          pattern={pattern}
          inputValue={inputValue}
          inputFunc={inputFunc}
        />
        {visibility ? (
          <BsEyeSlash
            onClick={() => setVisibility(!visibility)}
            className="position-absolute cursor-pointer"
            style={toggleVisibilityStyle}
          />
        ) : (
          <BsEyeFill
            onClick={() => setVisibility(!visibility)}
            className="position-absolute cursor-pointer"
            style={toggleVisibilityStyle}
          />
        )}
      </div>
    </label>
  );
}
