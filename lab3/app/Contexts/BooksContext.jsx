import { createContext, useState } from "react";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  const [bookList, setBookList] = useState([
    {
      id: 1,
      title: "Dziecko Odyna",
      author: "Siri Petersen",
      coverType: "miękka",
      description: "Dobra książka",
      price: "69.99",
      pageCount: "321",
      coverImg: "/images/book1.jpg"
    },
    {
      id: 2,
      title: "Zgnilizna",
      author: "Siri Petersen",
      coverType: "twarda",
      description: "Książka o wiedźminie",
      price: "76.99",
      pageCount: "430",
      coverImg: "../images/book2.jpg"
    }
  ]);

  return (
    <BooksContext.Provider value={{ bookList, setBookList }}>
      {children}
    </BooksContext.Provider>
  );
};