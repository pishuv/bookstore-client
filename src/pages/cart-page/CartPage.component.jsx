import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../context/Auth.context";
import { CartContext } from "../../context/Cart.context";
import { useNavigate } from "react-router-dom";
import "./cart-page.styles.css";
import environments from "../../environments/environments.js";
import Loader from "../../components/shared/loader/Loader.component";

import CartBooks from "./books-cart/CartBooks.component";
import { useEffect } from "react";
import { checkoutAction, initCartAction } from "../../actions/cart.action";

const API_URL = environments.API_URL;

const CartPage = () => {
  const navigate = useNavigate();

  const authContextValue = useContext(AuthContext);
  const cartContextValue = useContext(CartContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCart = async () => {
      try {
        const respone = await fetch(`${API_URL}/cart`, {
          headers: {
            Authorization: authContextValue.userToken,
          },
        });

        if (!respone.ok) {
          throw new Error();
        }

        const responeObj = await respone.json();
        const cart = responeObj.data.cart;

        const action = initCartAction(cart.books);
        cartContextValue.dispatchCart(action);

        setTimeout(() => {
          setIsLoading(false);
        }, 1500);
      } catch (err) {
        console.log(err);
        navigate("*");
      }
    };

    const userToken = localStorage.getItem("user-token");

    if (!userToken) {
      navigate("/");

      return;
    }
    getCart();
  }, []);

  const handleCheckOut = async () => {
    try {
      const respone = await fetch(`${API_URL}/cart/checkOut`, {
        method: "POST",
        headers: {
          Authorization: authContextValue.userToken,
        },
      });

      if (!respone.ok) {
        throw new Error();
      }

      const responeObj = await respone.json();
      const message = responeObj.message;

      alert(message);

      const action = checkoutAction();
      cartContextValue.dispatchCart(action);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  

  return isLoading ? (
    <Loader />
  ) : cartContextValue.cart.items.length === 0 ? (
    <div className="cart-page">
      <h1>Your Cart Is Empty!</h1>
    </div>
    
  ) : (
    <div className="cart-page">
      <CartBooks />

      <div>
        <h3>{`Total Price: $${cartContextValue.cart.price}`}</h3>

        <button type="button" className="btn-checkout" onClick={handleCheckOut}>
          Checkout
        </button>
      </div>
    </div>
  );
};
export default CartPage;
