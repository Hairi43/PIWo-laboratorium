import { useContext, useState } from "react";
import FavoritesContext from "../Contexts/FavoritesContext";

export default function FavoritiesDropdown() {
    const { favorites, removeFavorite } = useContext(FavoritesContext);
    const [showFavorites, setShowFavorites] = useState(false);

    return (
        <div className="favorites-container" style={{ position: "relative" }}>
        <button className="navBtn" onClick={() => setShowFavorites(!showFavorites)}>
          Ulubione ({favorites.length})
        </button>
        {showFavorites && (
          <div className="favorites-dropdown">
            {favorites.length === 0 ? (
              <div>Brak ulubionych książek</div>
            ) : (
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                {favorites.map((book) => (
                  <li
                    key={book.id}
                    style={{
                      padding: "0.5em 0",
                      borderBottom: "1px solid #eee",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div className="navBtn">
                      <div><strong>{book.title}</strong></div>
                      <div>Autor: {book.author}</div>
                      <div>Cena: {book.price} zł</div>
                    </div>
                    <button
                      className="filterNavBtn"
                      onClick={() => removeFavorite(book.id)}
                      aria-label={`Usuń ${book.title} z ulubionych`}
                    >
                    X
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    );
}
