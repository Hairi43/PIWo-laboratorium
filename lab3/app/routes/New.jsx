import { useContext } from "react";
import { useState } from "react";
import FilterSidebar from "../Components/FilterSidebar";
import { BooksContext } from "../Contexts/BooksContext";
import BookTile from "../Components/BookTile";
import BookListing from "../Components/BookListing";
import FilterBooks from "../Components/FilterBooks";
import AddBookForm from "../Components/AddBookForm";

export function meta() {
  return [
    { title: "Księgarnia PIWo" },
    { name: "description", content: "Księgarnia" },
  ];
}

export default function New() {
  return (
    <main>
        <AddBookForm />
    </main>
  );
}
