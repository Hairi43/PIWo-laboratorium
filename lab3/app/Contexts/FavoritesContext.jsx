import React, { createContext, useReducer, useContext } from "react";

const favoritesReducer = (state, action) => {
  switch (action.type) {
    case "ADD_FAVORITE":
      if (state.find(b => b.id === action.book.id)) return state;
      return [...state, action.book];
    case "REMOVE_FAVORITE":
      return state.filter(b => b.id !== action.id);
    default:
      return state;
  }
};

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, dispatch] = useReducer(favoritesReducer, []);

  const addFavorite = (book) => dispatch({ type: "ADD_FAVORITE", book });
  const removeFavorite = (id) => dispatch({ type: "REMOVE_FAVORITE", id });

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesContext;