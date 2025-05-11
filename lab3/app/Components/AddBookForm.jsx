import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";
import { addBook } from "../Services/AddBookService";
import { useUser } from "../Services/UserService";

export default function AddBookForm() {
  const {bookList, setBookList } = useContext(BooksContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [coverType, setCoverType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const user = useUser();


  const handleNewBook = (e) => {
    e.preventDefault();
    if (!title || !author || !price || !pages || !coverType || !description || !image) return;

    const newBook = {
      // id: bookList.length + 1,
      title,
      author,
      coverType,
      description,
      price,
      pageCount: pages,
      // coverImg: image
      coverImg: image ? URL.createObjectURL(image) : null,
      uid: user.uid,
    };
    addBook(newBook, user); // to firestore
    setBookList((prev) => prev.concat([newBook]));

    console.log("Dodano książkę:", newBook);

    setTitle("");
    setAuthor("");
    setPrice("");
    setPages("");
    setCoverType("");
    setDescription("");

    // Przy dodawaniu książki i wybraniu okładki do niej, plik powinien zostać nadpisany przez null,
    // ale tak się nie dzieje. Nie wiem gdzie jest błąd. Aby dodać drugą książkę trzeba wybrać inny obraz.
    setImage(null);

    console.log(image);
  };

  return (
    <section className="form-container">
      <h2>Dodaj Książkę</h2>
      <form className="add-book-form" onSubmit={handleNewBook}>
        <section className="form-box">
          <label htmlFor="title">Tytuł książki:</label>
          <input
            type="text"
            className="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </section>

        <section className="form-box">
          <label htmlFor="author">Autor:</label>
          <input
            type="text"
            className="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </section>

        <section className="form-box">
          <label htmlFor="price">Cena (zł):</label>
          <input
            type="number"
            className="price"
            min="0"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </section>

        <section className="form-box">
          <label htmlFor="pages">Liczba stron:</label>
          <input
            type="number"
            className="pages"
            min="1"
            value={pages}
            onChange={(e) => setPages(e.target.value)}
            required
          />
        </section>

        <section className="form-box">
          <label htmlFor="cover">Typ okładki:</label>
          <select
            className="cover"
            value={coverType}
            onChange={(e) => setCoverType(e.target.value)}
            required
          >
          <option value="" hidden></option>
          <option value="miękka">Miękka</option>
          <option value="twarda">Twarda</option>
          </select>
        </section>

        <section className="form-box">
          <label htmlFor="description">Opis książki:</label>
          <textarea
            className="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </section>

        <section className="form-box">
          <label htmlFor="image">Okładka książki:</label>
          <input
            type="file"
            className="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
              
            required
          />
        </section>

        <section className="form-box">
          <button type="submit" className="navBtn">Dodaj książkę</button>
        </section>
      </form>
    </section>
  );
}
