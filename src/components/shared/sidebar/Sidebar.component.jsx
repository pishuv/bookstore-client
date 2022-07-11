import "./siderbar.styles.css";
import environments from "../../../environments/environments";
import { Link,  useNavigate } from "react-router-dom";
import { useContext } from "react";
import {AuthContext} from '../../../context/Auth.context'

const API_URL = environments.API_URL;

const Sidebar = (props) => {

  const navigate= useNavigate();

  const authContextValue = useContext (AuthContext)

  const handleLogout = async () => {

    try {
      const respone = await fetch (`${API_URL}/users/logout`,{
        method: 'POST',
        headers: {
          'Authorization' : authContextValue.userToken,
        },
      });

      if(!respone.ok) {
        throw new Error();
      }
   
      const responeObj = await respone.json();
      const message = responeObj.message;
      alert (message);

      localStorage.removeItem('user-token');
      authContextValue.setUserToken(null);
      props.hideSidebar();
     
      navigate('books');
    } catch (err) {
      alert ('Something went wrong');
    }
  };

  return (
    <div className={`background ${props.className}`}>
      <div className="side-bar">
        <button type="button" className="close-btn" onClick={props.hideSidebar}>
          X
        </button>

        <ul className="side-bar-items" >
          <li className="side-bar-item">
            <Link to="books" onClick={ () => props.hideSideBar() }>
              Home
            </Link>
          </li>

        {!authContextValue.userToken && ( <li className="side-bar-item">
            <Link to="/login" onClick={ () => props.hideSideBar() }>
              Login
            </Link>
          </li>)}

        {authContextValue.userToken && (
        <li className="side-bar-item">
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </li>)}

         {authContextValue.userToken && (
           <li className="side-bar-item">
            <Link to="/cart" onClick={ () => props.hideSideBar() }>
              Cart
            </Link>
          </li>)}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
