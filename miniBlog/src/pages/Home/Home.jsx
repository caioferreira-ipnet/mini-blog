//Styles
import styles from "../../styles/stylePages/styleHome/Home.module.css";
//Hooks
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useFetchDocuments } from "../../hooks/useFetchDocuments.jsx";
import PostDetails from "../../components/PostDetails";
const Home = () => {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { documents: posts, loading } = useFetchDocuments("posts");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };
  return (
    <div className={styles.container}>
      <h1>Veja nossos Posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <input
          type="text"
          placeholder="Ou busque por tags..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <button type="submit" className="btn btnDark">
          Pesquisar
        </button>
      </form>
      <div>
        <h1>Posts</h1>

        {loading && <p>Carregando...</p>}

        {posts?.map((post) => (
          <PostDetails key={post.id} post={post} />
        ))}
        {posts?.length === 0 && (
          <div className={styles.noPosts}>
            <p>Não foram encontrados posts</p>
            <Link to="/post/create" className="btn">
              {" "}
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
