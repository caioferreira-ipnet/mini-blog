import styles from "../../styles/stylePages/styleDashboard/Dashboard.module.css";
import { useAuthValue } from "../../hooks/useAuthValue.jsx";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.jsx";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { documents: posts, loading } = useFetchDocuments("posts", null, uid);
  const handleDelete = (id) => {
    if (loading) return <p>Carregando...</p>;

    // lógica para deletar o post

    console.log("Post deletado:", id);
  };
  return (
    <div className={styles.dash}>
      <h1>Meu DashBoard</h1>
      <h4>Gerencie seus posts</h4>
      {posts?.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts!</p>
          <Link to="/post/create" className="btn">
            Crie seu primeiro post
          </Link>
        </div>
      ) : (
        <div>
          {posts?.map((post) => (
            <div className={styles.post} key={post.id}>
              <h5>{post.title}</h5>

              <img src={post.image} alt={post.title} />
              <p>{post.body}</p>
              {post.tagsArray.map((tag) => (
                <span key={tag} className={styles.tag}>
                  {tag}
                </span>
              ))}
              <div className="editPost">
                <Link to={`/posts/${post.id}`} className="btn btnOutline">
                  Ver Post
                </Link>
                <Link to={`/posts/edit/${post.id}`} className="btn btnOutline ">
                  Editar Post
                </Link>
                <button
                  className="btn btnOutline btnDanger"
                  onClick={() => handleDelete(post.id)}
                >
                  Deletar Post
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Dashboard;
