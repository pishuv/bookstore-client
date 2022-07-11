import { useReducer } from "react";
import { Link ,useNavigate } from 'react-router-dom';

import signUpFormReducer, { SIGN_UP_FORM_INITIAL_STATE } from "../../../reducers/signup.reducer";
import * as SignupFormAction from '../../../actions/signup-form.action' 
import environments from "../../../environments/environments";

import isEmail from 'validator/lib/isEmail';
import isStrongPassword from 'validator/lib/isStrongPassword.js';
import { AuthContext } from "../../../context/Auth.context";
import { useContext } from "react";



const SignUpForm = () => {

  const navigate = useNavigate();

  const authContextValue = useContext(AuthContext)

  const [signUpFormState, dispatchSignUpFormState] = useReducer (signUpFormReducer,  SIGN_UP_FORM_INITIAL_STATE);
  console.log(signUpFormState)

  const API_URL = environments.API_URL

  const handleFirstNameInput = (event) => {
    const firstNameInput = event.target.value.trim();

    if (firstNameInput === '') {
      dispatchSignUpFormState(SignupFormAction.updateFirstName(firstNameInput, false, '*Please enter your first name'));

      return;
    }

    dispatchSignUpFormState(SignupFormAction.updateFirstName(firstNameInput, true, ''));
  };

  const handleLastNameInput = (event) => {
    const lastNameInput = event.target.value.trim();

    if (lastNameInput === '') {
      dispatchSignUpFormState(SignupFormAction.updateLastName(lastNameInput, false, '*Please enter your last name'))

      return;
    }

    dispatchSignUpFormState(SignupFormAction.updateLastName(lastNameInput, true, ''));
  };

  const handleEmailInput = (event) => {
    const emailInput = event.target.value.toLowerCase().trim();

    if (emailInput === '') {
      dispatchSignUpFormState(SignupFormAction.updateEmailAction(emailInput, false, '*Please enter an email address'));

      return;
    }

    if (!isEmail(emailInput)) {
      dispatchSignUpFormState(SignupFormAction.updateEmailAction(emailInput, false, '*Please enter a valid email address'));
      return;
    }

    dispatchSignUpFormState(SignupFormAction.updateEmailAction(emailInput, true, ''));
  };

  const handlePasswordinput = (event) => {
    const passwordInput = event.target.value.trim();
   
    if (passwordInput === '') {
 
      dispatchSignUpFormState(SignupFormAction.updatePasswordAction(passwordInput, false, '*Please enter a password'));

      return
    }
  
    if (!isStrongPassword(passwordInput)) {
      
      dispatchSignUpFormState(SignupFormAction.updatePasswordAction(passwordInput, false, '*You must enter a password with at least 8 characters which includes one captial letter, number and specail character' ));
     
      return;
    }
    dispatchSignUpFormState(SignupFormAction.updatePasswordAction(passwordInput, true, ''));
    
  };

  const handleRepeatedPasswordInput = (event) => {
    const repeatedPasswordInput = event.target.value.trim();

    if (repeatedPasswordInput === '') {
      dispatchSignUpFormState(SignupFormAction.updateReapeatedPasswordAction(repeatedPasswordInput, false, '*Please enter your password again'));

      return;
    }

    if (repeatedPasswordInput !== signUpFormState.values.password) {
      dispatchSignUpFormState(SignupFormAction.updateReapeatedPasswordAction(repeatedPasswordInput, false, '*Your passwords do not match'));

      return;
    }

    dispatchSignUpFormState(SignupFormAction.updateReapeatedPasswordAction(repeatedPasswordInput, true, ''));

  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const sss = signUpFormState.values
   
    if (
      !signUpFormState.validities.firstName ||
      !signUpFormState.validities.lastName ||
      !signUpFormState.validities.email ||
      !signUpFormState.validities.password ||
      !signUpFormState.validities.repeatedPassword ||
      signUpFormState.values.firstName === '' ||
      signUpFormState.values.lastName === '' ||
      signUpFormState.values.email === '' ||
      signUpFormState.values.password === '' ||
      signUpFormState.values.repeatedPassword === ''
  ) {
      return;
  }

    const signUpFormValues = signUpFormState.values
    const data = {
      firstName: signUpFormValues.firstName,
      lastName:signUpFormValues.lastName,
      email: signUpFormValues.email,
      password:signUpFormValues.password,
    };

    try {
      const response = await fetch(`${API_URL}/users/signup`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
      });

      if (response.status !== 201) {
          throw new Error();
      }

      const responseData = await response.json();
      const token = responseData.data.token;

      localStorage.setItem('user-token', token);
      authContextValue.setUserToken(token);

      navigate('books');
      

  } catch (err) {
    console.log(err)
      alert('Something went wrong!');
  }

  }


    return (
    <div className="main-signup" onSubmit={handleSubmit}>
    <form className="login-box">

<h1>Hello New User!</h1>

<div className="user-box">
    <input 
    type="text" 
    id="first-name" 
    required={true}
    onInput={handleFirstNameInput}
    ></input>
    <label>First Name:</label>

    {!signUpFormState.validities.firstName && <div className="error-msg">{signUpFormState.errorMessages.firstName}</div>}
  </div>

  <div className="user-box" >
    <input 
    type="text" 
    id="last-name" 
    required={true}
    onInput={handleLastNameInput}
    ></input>
    <label>Last Name:</label>
    {!signUpFormState.validities.lastName && <div>{signUpFormState.errorMessages.lastName}</div>}
  </div>

  <div className="user-box" >
    <input 
    type="email" 
    id="email" 
    required={true}
    onInput={handleEmailInput}
    ></input>
    <label>Email:</label>
    {!signUpFormState.validities.email && <div>{signUpFormState.errorMessages.email}</div>}
  </div>

  <div className="user-box" >
    <input 
    type="password" 
    id="password" 
    required={true}
    onInput={handlePasswordinput}
    ></input>
    <label>Password:</label>
    {!signUpFormState.validities.password && <div>{signUpFormState.errorMessages.password}</div>}
  </div>

  <div className="user-box">
    <input 
    type="password" 
    id="password"
    required={true}
    onInput={handleRepeatedPasswordInput}
    ></input>
    <label>Repeat Password:</label>
    {!signUpFormState.validities.repeatedPassword && <div>{signUpFormState.errorMessages.repeatedPassword}</div>}
  </div>

     <Link to='/login' className="login-link">
     Do you already have an account? Login..
    </Link> 

  <button type='submit' href="#">
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    Sign-Up
  </button>

</form>
      </div>
    )
};

export default SignUpForm;