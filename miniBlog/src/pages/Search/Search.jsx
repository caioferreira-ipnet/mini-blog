import { Link } from "react-router-dom";
import PostDetails from "../../components/PostDetails.jsx";
import { useFetchDocuments } from "../../hooks/useFetchDocuments";
import { useQuery } from "../../hooks/useQuery.jsx";
import styles from "../../styles/stylePages/styleSearch/Search.module.css";
const Search = () => {
  const query = useQuery();
  const search = query.get("q");
  const { documents: posts, loading } = useFetchDocuments("posts", search);
  return (
    <div className={styles.container}>
      <h1>Search</h1>
      <p>{search}</p>
      {loading && <p>Carregando resultados...</p>}
      {!loading && (
        <div className={styles.posts}>
          {posts?.length === 0 && (
            <>
              <p>Não foram encontrados posts a partir da sua busca...</p>
              <Link to="/" className="btn btnDark">
                Voltar
              </Link>
            </>
          )}

          {posts?.map((post) => (
            <PostDetails key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Search;
