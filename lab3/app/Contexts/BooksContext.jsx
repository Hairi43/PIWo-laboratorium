import { createContext, useState, useEffect } from "react";
import { listBooksByUser } from "../Services/AddBookService";
import { useUser } from "../Services/UserService";
import { collection, query, getDocs } from "firebase/firestore";
import { firestore } from "../Services/init";

export const BooksContext = createContext();

export const BooksProvider = ({ children }) => {
  // const [bookList, setBookList] = useState([
  //   {
  //     id: 1,
  //     title: "Dziecko Odyna",
  //     author: "Siri Petersen",
  //     coverType: "miękka",
  //     description: "Dobra książka",
  //     price: "69.99",
  //     pageCount: "321",
  //     coverImg: "/images/book1.jpg"
  //   },
  //   {
  //     id: 2,
  //     title: "Zgnilizna",
  //     author: "Siri Petersen",
  //     coverType: "twarda",
  //     description: "Książka o wiedźminie",
  //     price: "76.99",
  //     pageCount: "430",
  //     coverImg: "../images/book2.jpg"
  //   }
  // ]);

  const col = collection(firestore, "bookstore-001");

  const listBooks = async () => {
      const q = query(col); // show all books
      console.log(q);
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc) => doc.data());
  }

  const [bookList, setBookList] = useState([]);


  const [showUserBooks, setShowUserBooks] = useState(false);
  const user = useUser();

  const toggleUserBooks = (showBooks) => {
    console.log("inside book context, =", showBooks);
    setShowUserBooks(showBooks);
    console.log("after book context, show user books =", showUserBooks);
  }

  
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        if (showUserBooks && user) {
          console.log("showUserBooks && user = ", showUserBooks);
          const list = await listBooksByUser(user.uid).then((d) => setBookList(d));
          console.log(bookList);
        } else {
          const list = await listBooks().then((d) => setBookList(d));
          console.log(bookList);
        }
      } catch (err) {
        console.error("Błąd przy pobieraniu książek:", err);
        setBookList([]);
      }
    };

    fetchBooks();
  }, [user, showUserBooks]);

  return (
    <BooksContext.Provider value={{ bookList, setBookList, toggleUserBooks }}>
      {children}
    </BooksContext.Provider>
  );
};