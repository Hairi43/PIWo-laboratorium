import { NavLink } from "react-router";
import { loginWithGoogle, logOut } from "../Services/UserService";
import { useUser } from "../Services/UserService";

export default function NavBar() {
    const user = useUser();

    return (
        <nav className="nav">
            <NavLink to="/">Księgarnia PIWo</NavLink>
            <NavLink to="/new">Dodaj pozycję</NavLink>
            <NavLink to="/cart">Koszyk</NavLink>
            <NavLink to="/login">Logowanie</NavLink>
            <NavLink onClick={loginWithGoogle}>Logowanie z Google</NavLink>
            {user && 
                <NavLink class="userName">Witaj, {user.displayName}</NavLink>
            }
            {user && 
                <NavLink class="userName" onClick={logOut}>Wyloguj</NavLink>
            }
        </nav>
    );
};