import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import "./pagenotfound.style.css";

import Loader from "../../components/shared/loader/Loader.component";

const PageNotFound = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  }, []);

  const handleBackToHome = () => navigate("/");

  return isLoading ? (
    <Loader />
  ) : (
    <section className="error-page-area text-center">
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <h1>404</h1>
          <h2>Sorry, The Page Was Not Found!</h2>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          </p>
          
          <a onClick={handleBackToHome} className="btn btn-theme effect btn-md" href="#">Back To Home</a>
          <a onClick={handleBackToHome} className="btn btn-dark border btn-md" href="#">Contact Us</a>
        </div>
      </div>
    </div>
  </section>
  );
};

export default PageNotFound;
