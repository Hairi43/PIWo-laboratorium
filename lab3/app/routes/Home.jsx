import { useContext } from "react";
import { useState, useEffect } from "react";
import FilterSidebar from "../Components/FilterSidebar";
import { BooksContext } from "../Contexts/BooksContext";
import BookTile from "../Components/BookTile";
import BookListing from "../Components/BookListing";
import FilterBooks from "../Components/FilterBooks";
import { useUser } from "../Services/UserService";

export function meta() {
  return [
    { title: "Księgarnia PIWo" },
    { name: "description", content: "Księgarnia" },
  ];
}

export default function Home() {
  const { bookList, setBookList } = useContext(BooksContext);
  
  const [filters, setFilters] = useState({
    author: "",
    coverType: "",
    priceFrom: "",
    priceTo: "",
    pagesFrom: "",
    pagesTo: "",
    description: "",
  });
  
  const [filteredBooks, setFilteredBooks] = useState(bookList);
  const [showUserBooks, setShowUserBooks] = useState(false);

  const handleFilterChange = (filter) => {
    setFilters(filter);
    console.log("after setFilters");

    if (
      filters.author === "" &&
      filters.coverType === "" &&
      filters.priceFrom === "" &&
      filters.priceTo === "" &&
      filters.pagesFrom === "" &&
      filters.pagesTo === "" &&
      filters.description === ""
    ) {
      setFilteredBooks(bookList);
      return;
    }
  
    const filteredBooks = FilterBooks(bookList, filters);
  
    setFilteredBooks(filteredBooks, filters);
  };


  useEffect(() => {
    const noFilters =
      filters.author === "" &&
      filters.coverType === "" &&
      filters.priceFrom === "" &&
      filters.priceTo === "" &&
      filters.pagesFrom === "" &&
      filters.pagesTo === "" &&
      filters.description === "";
  
    if (bookList.length && noFilters) {
      setFilteredBooks(bookList);
    }
  }, [bookList, filters]);

  return (
    <main>
      <FilterSidebar onFilterChange={handleFilterChange} />
      <BookListing filteredBooks={filteredBooks} filter={filters} />
    </main>
  );
}
