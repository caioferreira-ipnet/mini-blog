import styles from "../styles/styleComponents/postDetails/PostDetails.module.css";
import { Link } from "react-router-dom";
const PostDetails = ({ post }) => {
  return (
    <div className={styles.container}>
      <img src={post.image} alt={post.title} />
      <h2>{post.title}</h2>
      <p>{post.createdBy}</p>
      <div className={styles.post}>
        {post.tagsArray.map((tag) => (
          <p key={tag}>
            <span>#</span>
            {tag}
          </p>
        ))}
      </div>
      <Link to={`post/${post.id}`} className="btn btnOutline">
        Ir para Post
      </Link>
    </div>
  );
};

export default PostDetails;
