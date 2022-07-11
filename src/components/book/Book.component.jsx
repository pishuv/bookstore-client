import { useNavigate } from "react-router-dom";
import "./book.styles.css";

const Book = (props) => {
  console.log(props);

  const navigate = useNavigate();

  const handleChooseBookClick = () => navigate(`/books/${props.id}`);

  return (
<div className="books">
<div className="book" onClick={handleChooseBookClick}>
      <div className="book-information">
        <img src={props.bookCover} alt={props.title} />

        <h3>{props.title}</h3>

        <h4>{props.author}</h4>
      </div>
    </div>
</div>
  );
};

export default Book;
