import { NavLink } from "react-router";
import { loginWithGoogle, logOut } from "../Services/UserService";
import { useUser } from "../Services/UserService";
import { useContext, useState } from "react";
import FavoritesContext from "../Contexts/FavoritesContext";
import FavoritiesDropdown from "./FavoritesDropdown";

export default function NavBar() {
  const user = useUser();
  const { favorites, removeFavorite } = useContext(FavoritesContext);
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <nav className="nav">
      <FavoritiesDropdown />

      <NavLink to="/">Księgarnia PIWo</NavLink>
      <NavLink to="/new">Dodaj pozycję</NavLink>
      <NavLink to="/cart">Koszyk</NavLink>
      <NavLink to="/login">Logowanie</NavLink>
      <NavLink onClick={loginWithGoogle}>Logowanie z Google</NavLink>
      {user && <NavLink className="userName">Witaj, {user.displayName}</NavLink>}
      {user && <NavLink className="userName" onClick={logOut}>Wyloguj</NavLink>}
    </nav>
  );
};
