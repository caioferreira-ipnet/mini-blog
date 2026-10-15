//Styles
import { Link } from "react-router-dom";
import styles from "../../styles/stylePages/styleAbout/About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h1>Sobre a página...</h1>
      <p>
        Este sistema foi desenvolvido com ReactJs, React-Router no Front-End{" "}
        <strong>&</strong> Firebase no Back-End!
      </p>
      <Link to="/post/create" className="btn">
        Criar Post
      </Link>
    </div>
  );
};

export default About;
