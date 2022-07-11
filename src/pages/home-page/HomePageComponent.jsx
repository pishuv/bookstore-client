import { useState } from "react";
import { useEffect } from "react";
import "./homepage.style.css";

import Catalog from "./catalog/CatalogBooks.jsx";
import Loader from "../../components/shared/loader/Loader.component";



const Homepage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=> {
    setTimeout(() => {
    setIsLoading(false);
  }, 2000);
  })
  

  return isLoading ? <Loader /> : <Catalog />;
};

export default Homepage;
