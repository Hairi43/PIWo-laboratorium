import { NavLink } from "react-router";

export default function NavBar() {
    return (
        <nav className="nav">
            <NavLink to="/">Księgarnia PIWo</NavLink>
            <NavLink to="/new">Dodaj pozycję</NavLink>
            <NavLink to="/cart">Koszyk</NavLink>
            <NavLink to="/login">Logowanie</NavLink>
        </nav>
    );
}