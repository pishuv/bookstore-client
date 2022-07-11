import React, { useState , useEffect } from "react";
import "./catalog-books.styles.css";

import Book from "../../../components/book/Book.component";
import { useNavigate } from "react-router-dom";
import environments from "../../../environments/environments.js";

const API_URL = environments.API_URL;

const Catalog = () => {
  const navigate = useNavigate();

  const [books, setBooks] = useState([]);


  useEffect(() => {
    const getBooks = async () => {
        try {
            const response = await fetch(`${API_URL}/books`);

            if (!response.ok) {
                throw new Error();
            }

            const responseObj = await response.json();
            const books = responseObj.data.books;

            setBooks(books);

        } catch (err) {
            console.log(err);
            navigate('*');
        }
    };

    getBooks();
}, []);

  return (
    <div className="catalog-books">
      {books.map((book) => {
        return (
          <Book
            key={book._id}
            id={book._id}
            bookCover={book.bookCover}
            title={book.title}
            author={book.author}
            price={book.price}
            pages={book.pages}
          />
        );
      })}
    </div>
  );
};

export default Catalog;
