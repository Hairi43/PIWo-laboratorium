import { useContext } from "react";
import { useState } from "react";
import FilterSidebar from "../Components/FilterSidebar";
import { BooksContext } from "../Contexts/BooksContext";
import BookTile from "../Components/BookTile";
import BookListing from "../Components/BookListing";
import FilterBooks from "../Components/FilterBooks";

export function meta() {
  return [
    { title: "Księgarnia PIWo" },
    { name: "description", content: "Księgarnia" },
  ];
}

export default function Home() {
  const { bookList, setBookList } = useContext(BooksContext);
  
  const [filters, setFilters] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState(bookList);

  const handleFilterChange = (filters) => {
    setFilters(filters);

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
  
    setFilteredBooks(filteredBooks);
  };

  return (
    <main>
      <FilterSidebar onFilterChange={handleFilterChange}/>
      <BookListing filteredBooks={filteredBooks}/>
    </main>
  );
}
