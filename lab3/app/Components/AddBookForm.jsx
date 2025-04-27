import { useContext, useState } from "react";
import { BooksContext } from "../Contexts/BooksContext";

export default function AddBookForm() {
  const {bookList, setBookList } = useContext(BooksContext);

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState("");
  const [pages, setPages] = useState("");
  const [coverType, setCoverType] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");



  const handleNewBook = (e) => {
    e.preventDefault();
    if (!title || !author || !price || !pages || !coverType || !description || !image) return;

    const newBook = {
      id: bookList.length + 1,
      title,
      author,
      coverType: coverType === "soft" ? "miękka" : "twarda",
      description,
      price,
      pageCount: pages,
      coverImg: image ? URL.createObjectURL(image) : null,
    };
    setBookList((prev) => prev.concat([newBook]));

    console.log("Dodano książkę:", newBook);

    setTitle("");
    setAuthor("");
    setPrice("");
    setPages("");
    setCoverType("soft");
    setDescription("");
    setImage("");
  };

  return (
    <section className="form-container">
      <h2>Dodaj Książkę</h2>
      <form className="add-book-form" onSubmit={handleNewBook}>
        <section className="form-box">
          <label htmlFor="title">Tytuł książki:</label>
          <input
            type="text"
            // id="title"
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
            // id="author"
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
            // id="price"
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
            // id="pages"
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
            // id="cover"
            className="cover"
            value={coverType}
            onChange={(e) => setCoverType(e.target.value)}
            required
          >
            <option value="soft">Miękka</option>
            <option value="hard">Twarda</option>
          </select>
        </section>

        <section className="form-box">
          <label htmlFor="description">Opis książki:</label>
          <textarea
            // id="description"
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
            // id="image"
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
