import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, InputPass, InputSimple, Loader } from "../../components";
import { AiFillWarning } from "react-icons/ai";
import "./login.css";
import { useAuth, loginHandler } from "../../helpers";
export function Login() {
  const initial = {
    email: "",
    password: "",
    error: false,
    loader: false,
  };
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();
  const [formFields, setFormFields] = useState(initial);
  const { email, password, error, loader } = formFields;
  useEffect(
    () => (isAuthenticated ? navigate("/home") : ""),
    [isAuthenticated]
  );
  const guestLogin = () =>
    setFormFields({
      ...formFields,
      email: "adarshbalika@gmail.com",
      password: "adarshBalika123",
    });

  const submitHandler = (e) => {
    loginHandler(e, setFormFields, login, formFields);
  };
  return (
    <div className="flex login-page align-center justify-center">
      {loader ? (
        <div className="flex flex-column align-center">
          <Loader />
          <h2>Logging you in</h2>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className=" flex credential-form glass flex-column text-white gap-1 padding-2"
        >
          <InputSimple
            title="Email"
            inputType="email"
            inputClass="input-text md"
            inputValue={email}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                email: e.target.value,
              })
            }
            inputPlaceHolder="email..."
          />
          <InputPass
            title="Password"
            inputType="password"
            inputClass="input-text md"
            inputValue={password}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                password: e.target.value,
              })
            }
            inputPlaceHolder="password..."
          />
          {error ? (
            <span className="flex align-center bold text-red">
              Wrong Credentials <AiFillWarning className="text-red" />
            </span>
          ) : (
            <span className="opacity-0">Validate</span>
          )}
          <Button
            btnClass="btn guest-login secondary bold without-shadow"
            btnText="Guest Login"
            btnFunc={guestLogin}
          />
          <h2 className="flex flex-column text-white">
            New Here?{" "}
            <Link to="/signup">
              <span className="sm register-link text-red">
                Register Here &gt;{" "}
              </span>
            </Link>
          </h2>
          <Button
            btnClass="btn primary-video-button text-white bold without-shadow"
            btnText="Login"
          />
        </form>
      )}
    </div>
  );
}
