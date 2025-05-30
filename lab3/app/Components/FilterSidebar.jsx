import { useState, useContext } from "react";
import { useUser } from "../Services/UserService";
import { BooksContext } from "../Contexts/BooksContext";

export default function FilterSidebar({ onFilterChange }) {
  const [author, setAuthor] = useState("");
  const [coverType, setCoverType] = useState("");
  const [description, setDescription] = useState("");
  const [priceFrom, setPriceFrom] = useState("");
  const [priceTo, setPriceTo] = useState("");
  const [pagesFrom, setPagesFrom] = useState("");
  const [pagesTo, setPagesTo] = useState("");

  const [filters, setFilters] = useState(null);

  const [showUserBooks, setShowUserBooks] = useState(false);

  const handleFilter = () => {
    const filter = {
      author,
      coverType,
      priceFrom,
      priceTo,
      pagesFrom,
      pagesTo,
      description,
    };
    onFilterChange(filter);
    // setFilters(filters);
  };

  const { toggleUserBooks } = useContext(BooksContext);

  const toggleUserBooksHandler = () => {
    console.log("inside sidebar");
    setShowUserBooks((prev) => {
      console.log("inside prev", prev);
      const newValue = !prev;
      toggleUserBooks(newValue);
      console.log("after return");
      return newValue;
    });
  };



  const user = useUser();
  

  return (
    <nav className="filterNav">
      <p className="filter">Filtry</p>

      <label htmlFor="inputAuthor">Autor książki</label>
      <input
        type="text"
        id="inputAuthor"
        className="inputAuthor"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />

      <label>Typ okładki</label>
      <section className="inputGroupCover">
        <label>
        <input
            type="radio"
            value="miękka"
            checked={coverType === "miękka"}
            onChange={(e) => setCoverType(e.target.value)}
          />
          <p>miękka</p>
        </label>
        <label>
        <input
            type="radio"
            value="twarda"
            checked={coverType === "twarda"}
            onChange={(e) => setCoverType(e.target.value)}
          />
          <p>twarda</p>
        </label>
        <label>
        <input
            type="radio"
            value=""
            checked={coverType === ""}
            onChange={(e) => setCoverType(e.target.value)}
          />
          <p>dowolna</p>
        </label>
      </section>

      <label>Cena</label>
      <section className="inputGroup">
        <input
          type="text"
          className="inputPrice"
          placeholder="od"
          value={priceFrom}
          onChange={(e) => setPriceFrom(e.target.value)}
        />
        <p>-</p>
        <input
          type="text"
          className="inputPrice"
          placeholder="do"
          value={priceTo}
          onChange={(e) => setPriceTo(e.target.value)}
        />
      </section>

      <label>Ilość stron</label>
      <section className="inputGroup">
        <input
          type="text"
          className="inputPages"
          placeholder="od"
          value={pagesFrom}
          onChange={(e) => setPagesFrom(e.target.value)}
        />
        <p>-</p>
        <input
          type="text"
          className="inputPages"
          placeholder="do"
          value={pagesTo}
          onChange={(e) => setPagesTo(e.target.value)}
        />
      </section>

      <label htmlFor="inputDescription">Słowo w opisie</label>
      <input
        type="text"
        id="inputDescription"
        className="inputDesc"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button className="filterNavBtn" onClick={handleFilter}>
        Filtruj
      </button>

      {user && (
        <button className="filterNavBtn" onClick={toggleUserBooksHandler}>
          Moje Książki
        </button>
      )}
    </nav>
  );
}
