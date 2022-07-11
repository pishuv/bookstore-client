import "./book-page.styles.css";
import environments from "../../environments/environments.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Loader from "../../components/shared/loader/Loader.component";

import { AuthContext } from "../../context/Auth.context";

const API_URL = environments.API_URL;

const BookPage = () => {
  const params = useParams();
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);

  const [book, setBook] = useState(null);

  const authContextValue = useContext(AuthContext);
  console.log(authContextValue);

  const bookID = params.bookID;
  const data = { bookID: bookID };

  const handleAddToCart = async () => {
    if (authContextValue.userToken === null) {
      alert('You must be logged in to your account');

      return;
    }

    try {
      const respone = await fetch(`${API_URL}/cart/add-to-cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: authContextValue.userToken,
        },

        body: JSON.stringify(data),
      });

      if (!respone.ok) {
        throw new Error();
      }

      const responeObj = await respone.json();
      const message = responeObj.message;

      alert(message);
    } catch (err) {
      alert("Something went wrong!");
    }
  };

  const getBookDetails = async () => {
    try {
      const respone = await fetch(`${API_URL}/books/${bookID}`);

      if (!respone.ok) {
        throw new Error();
      }

      const responeObj = await respone.json();
      setBook(responeObj.data.book);

      setTimeout(() => {
        setIsLoading(false);
      }, 2000);
    } catch (err) {
      console.log(err);
      navigate("*");
    }
  };

  useEffect(() => {
    getBookDetails();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="book-details">
      <div className="book-cover">
        <img src={book.bookCover} alt={book.title} />
      </div>
<div className="main-book">
<div className="book-title-author">
        <h3>{book.title}</h3>

        <h4>{book.author}</h4>
      </div>

      <div className="book-data-description">
        <p>{book.description}</p>
      </div>

      <div className="book-data-span">
        <div>
          <span>Pages: </span>
          <span>{book.pages}</span>
        </div>

      <div>
          <span>Price: </span>
          <span>{book.price}</span>
        </div>
      </div>

      <div>
        <button
          className="add-to-cart-btn"
          type="button"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>
      </div>

</div>
    </div>
  );
};

export default BookPage;
