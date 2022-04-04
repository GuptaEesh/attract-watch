import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Input, InputPass, InputSimple, Loader } from "../../components";
import "../login/login.css";
import { useAuth, signUpHandler } from "../../helpers";
import { PassChecker } from "./password-checker";

export function SignUp() {
  const initial = {
    name: "",
    email: "",
    password: "",
    confirmPass: "",
    error: false,
    message: "",
    loader: false,
  };
  const navigate = useNavigate();

  const { login, isAuthenticated } = useAuth();
  const [formFields, setFormFields] = useState(initial);
  const { name, email, password, confirmPass, error, message, loader } =
    formFields;

  const submitHandler = (e) =>
    signUpHandler(e, setFormFields, login, formFields);
  return (
    <div
      className="login-page flex align-center flex-column justify-center"
      style={{ height: "100vh" }}
    >
      {loader ? (
        <div className="flex flex-column align-center">
          <Loader />
          <h2>Signing you in</h2>
        </div>
      ) : (
        <form
          onSubmit={submitHandler}
          className="flex glass flex-column"
          style={{ gap: "10px", padding: "2rem" }}
        >
          {" "}
          <InputSimple
            title="Name"
            inputClass="input-text md"
            inputPlaceHolder="type name..."
            inputType="text"
            inputValue={name}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                name: e.target.value,
              })
            }
          />
          <InputSimple
            title="Email"
            inputClass="input-text md"
            inputPlaceHolder="email..."
            inputType="email"
            inputValue={email}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                email: e.target.value,
              })
            }
          />
          <InputPass
            title="Password"
            inputValue={password}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                password: e.target.value,
              })
            }
            inputClass="input-text md"
            inputPlaceHolder="password..."
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
          />
          <InputPass
            title="Repeat Password"
            inputValue={confirmPass}
            inputFunc={(e) =>
              setFormFields({
                ...formFields,
                confirmPass: e.target.value,
              })
            }
            inputClass="input-text md"
            inputPlaceHolder="confirm password.."
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
          />
          <PassChecker pass={password} confirmPass={confirmPass} />
          {error ? (
            <span style={{ color: "var(--red-400)" }}>{message}!</span>
          ) : (
            <span className="text-white">Good to go!</span>
          )}
          <span className="text-white">
            Already a customer?
            <br />{" "}
            <Link to="/loginMe">
              <span className="text-underline text-red sm bold">
                Log in here &gt;
              </span>
            </Link>
          </span>
          <Input
            inputType="submit"
            inputClass="primary-video bold btn text-white without-shadow"
          />
        </form>
      )}
    </div>
  );
}
