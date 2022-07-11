import SignUpForm from "./sign-up-form/SignUpForm.component";
import Loader from "./../../components/shared/loader/Loader.component";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/Auth.context";
const SignUpPage = () => {
  const authContextValue = useContext(AuthContext);

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState();

  useEffect(() => {
    if (authContextValue.userToken) {
      navigate('/');
    }

    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  return isLoading ? <Loader /> : <SignUpForm />;
};

export default SignUpPage;
