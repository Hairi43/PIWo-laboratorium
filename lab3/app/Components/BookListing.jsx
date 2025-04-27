import { useContext } from "react";
import { BooksContext } from "../Contexts/BooksContext";
import BookTile from "./BookTile";
import FilterBooks from "./FilterBooks";

export default function BookListing({ filteredBooks }) {
    return (
        <section className="bookListing">
            {filteredBooks.map((book) => (<BookTile key={book.id} book={book} />))}
        </section>
    );
}