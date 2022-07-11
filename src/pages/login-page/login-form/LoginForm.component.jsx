import { useReducer, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import isEmail from "validator/lib/isEmail";
import isStrongPassword from "validator/lib/isStrongPassword";
import environments from "../../../environments/environments.js";
import "./login-form.styles.css";

import loginReducer, {
  LOGIN_FORM_INITIAL_STATE,
} from "../../../reducers/login-form.reducer.js";
import {
  updateEmailAction,
  updatePasswordAction,
} from "../../../actions/login-form.action.js";
import { AuthContext } from "../../../context/Auth.context.jsx";

const API_URL = environments.API_URL;

const LoginForm = () => {
  const navigate = useNavigate();

  const authContextValue = useContext(AuthContext);

  const [loginFormState, dispatchLoginFormState] = useReducer(
    loginReducer,
    LOGIN_FORM_INITIAL_STATE
  );

  const handleEmailInput = (event) => {
    const emailInput = event.target.value.toLowerCase().trim();

    if (emailInput === "") {
      dispatchLoginFormState(
        updateEmailAction(emailInput, false, "*please enter your email addess")
      );

      return;
    }

    if (!isEmail(emailInput)) {
      dispatchLoginFormState(
        updateEmailAction(
          emailInput,
          false,
          "*please enter a valid email address"
        )
      );

      return;
    }

    dispatchLoginFormState(updateEmailAction(emailInput, true, ""));
  };

  const handlePasswordinput = (event) => {
    const passwordInput = event.target.value.trim();

    if (passwordInput === "") {
      dispatchLoginFormState(
        updatePasswordAction(passwordInput, false, "*please enter a password")
      );

      return;
    }

    if (!isStrongPassword(passwordInput)) {
      dispatchLoginFormState(
        updatePasswordAction(
          passwordInput,
          false,
          "*You must enter a password with at least 8 characters which includes one captial letter, number and specail character"
        )
      );

      return;
    }

    dispatchLoginFormState(updatePasswordAction(passwordInput, true, ""));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const values = loginFormState.values;
    const validities = loginFormState.validities;

    if (
      values.email === "" ||
      values.password === "" ||
      !validities.email ||
      !validities.password
    ) {
      return;
    }

    const loginFormValues = loginFormState.values;
    const data = {
      email: loginFormValues.email,
      password: loginFormValues.password,
    };
    try {
      const response = await fetch(`${API_URL}/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error();
      }

      const responseData = await response.json();
      const token = responseData.data.token;

      localStorage.setItem("user-token", token);
      authContextValue.setUserToken(token);

      navigate('books');
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <div className="main-login">
          <div className="login-box">
      <form onSubmit={handleSubmit}>
        <h1>Welcome Back!</h1>

        <div className="user-box">
          <input
            type="email"
            id="email"
            required={true}
            onInput={handleEmailInput}
          ></input>
          <label>Email:</label>
          {!loginFormState.validities.email && (
            <div>{loginFormState.errorMessages.email}</div>
          )}
        </div>

        <div className="user-box">
          <input
            type="password"
            id="password"
            required={true}
            onInput={handlePasswordinput}
          ></input>
          <label>Password:</label>
          {!loginFormState.validities.password && (
            <div>{loginFormState.errorMessages.password}</div>
          )}
        </div>

        <Link to="/signup" className="signup-link">
          Dont have an account? signup..
        </Link>

        <button type="submit" href="#">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          Login
        </button>
      </form>
    </div>
    </div>
  );
};

export default LoginForm;
