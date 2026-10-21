import styles from "../../styles/stylePages/styleDashboard/Dashboard.module.css";
import { useAuthValue } from "../../hooks/useAuthValue.jsx";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.jsx";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const posts = [];
  return (
    <div className={styles.dash}>
      <h1>Meu DashBoard</h1>
      <h4>Gerencie seus posts</h4>
      {posts && posts.length === 0 ? (
        <div>
          <p>Não foram encontrados posts!</p>
          <Link to="/post/create" className="btn">
            Crie seu primeiro post
          </Link>
        </div>
      ) : (
        <div>
          <p>Tem posts</p>
        </div>
      )}
    </div>
  );
};
export default Dashboard;
