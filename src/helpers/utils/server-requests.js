import axios from "axios";
const loginHandler = async (e, setFormFields, login, formFields) => {
  const { email, password } = formFields;
  e.preventDefault();
  try {
    setFormFields({ ...formFields, loader: true });
    const { data } = await axios.post("/api/auth/login", {
      email,
      password,
    });
    setFormFields({ ...formFields, loader: false });
    login(data);
  } catch (err) {
    setFormFields({ ...formFields, error: true });
    setTimeout(
      () =>
        setFormFields({
          ...formFields,
          error: false,
        }),
      1500
    );
  }
};
const signUpHandler = async (e, setFormFields, login, formFields) => {
  const { name, email, password, confirmPass } = formFields;
  e.preventDefault();
  try {
    if (password !== confirmPass) throw "passwordError";
    setFormFields({ ...formFields, loader: true });
    const response = await axios.post("/api/auth/signup", {
      name,
      email,
      password,
    });
    setFormFields({ ...formFields, loader: false });
    login(response.data);
  } catch (err) {
    setFormFields({
      ...formFields,
      error: true,
      message:
        err === "passwordError"
          ? "Passwords don't match"
          : "It's not you it's us",
    });
    setTimeout(() => setFormFields({ ...formFields, error: false }), 1500);
  }
};
export { loginHandler, signUpHandler };
