import { useContext } from "react";
import "./books-cart.styles.css";

import { CartContext } from "../../../context/Cart.context.jsx";
import Cart from "../../../components/cart/Cart.component";

const CartBooks = () => {
  const cartContextValue = useContext(CartContext);
  console.log(cartContextValue);
  return (
    <div className="cart-books">
      {cartContextValue.cart.items.map((cartItem) => (
        <Cart
          id={cartItem.bookID._id}
          bookCover={cartItem.bookID.bookCover}
          title={cartItem.bookID.title}
          author={cartItem.bookID.author}
          price={cartItem.bookID.price}
        />
      ))}
    </div>
  );
};

export default CartBooks;
