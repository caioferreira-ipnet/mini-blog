import { NavLink } from "react-router-dom";
import styles from "../styles/styleComponents/navBar/NavBar.module.css";

const links = [
  { path: "/", label: "Home" },
  { path: "/register", label: "Cadastre-se" },
  { path: "/login", label: "Login" },
  { path: "/about", label: "About" },
];

const NavBar = () => {
  const getLinkClass = ({ isActive }) => (isActive ? styles.active : "");

  return (
    <nav className={styles.nav}>
      <h3>Mini Blog</h3>
      <ul className={styles.brand}>
        {links.map(({ path, label }) => (
          <li key={path}>
            <NavLink className={getLinkClass} to={path}>
              {label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavBar;
