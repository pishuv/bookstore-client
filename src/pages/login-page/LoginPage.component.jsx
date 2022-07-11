import React, { useState } from "react";
import "./loginpage.styles.css";

import LoginForm from "./login-form/LoginForm.component";
import Loader from "../../components/shared/loader/Loader.component";

const LoginPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  setTimeout(() => {
    setIsLoading(false);
  }, 2000);

  return isLoading ? <Loader /> : <LoginForm />;
};

export default LoginPage;
