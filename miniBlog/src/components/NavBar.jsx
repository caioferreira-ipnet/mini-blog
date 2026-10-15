import { NavLink } from "react-router-dom";
import styles from "../styles/styleComponents/navBar/NavBar.module.css";
import { useAuthValue } from "../hooks/useAuthValue.jsx";
//Links
import { links } from "../constants/navLinks.js";
const NavBar = () => {
  const { user } = useAuthValue();
  const getLinkClass = ({ isActive }) => (isActive ? styles.active : "");

  const visibleLinks = links.filter((link) => {
    if (link.auth === undefined) return true;
    if (link.auth === false) return !user;
    if (link.auth === true) return !!user;
  });
  return (
    <nav className={styles.nav}>
      <h3>Mini Blog</h3>
      <ul className={styles.brand}>
        {visibleLinks.map(({ path, label }) => (
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
