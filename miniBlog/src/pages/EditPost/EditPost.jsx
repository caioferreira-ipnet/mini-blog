//Hooks
import { useEffect, useState } from "react";
import { useAuthValue } from "../../hooks/useAuthValue.jsx";
import { useUpdatePost } from "../../hooks/useUpdatePost.jsx";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchDocument } from "../../hooks/useFetchDocument.jsx";

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument("posts", id);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { updateDocument, response } = useUpdatePost("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setImage(post.image);
      const textTags = post.tagsArray.join(", ");
      setTags(textTags);
    }
  }, [post]);
  //Função de enviar formulário '
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma URL");
      console.log(error);
    }
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());
    if (!title || !image || !tags || !body) {
      setFormError("Por favor preencha todos os campos");
    }
    if (formError) {
      console.log("Erro ao enviar fomulário");
      return;
    }
    const data = {
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    };
    updateDocument(id, data);
    //Redirect to home page
    void navigate("/dashboard");
  };
  return (
    <div className="container">
      {post && (
        <>
          <div className="titles">
            <h1>Edite seu Post</h1>
          </div>
          <form className="form" onSubmit={handleSubmit}>
            <label>
              <span>Título</span>
              <input
                type="text"
                name="title"
                required
                placeholder="Título"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
              />
            </label>
            <label>
              <span>URL da imagem</span>
              <input
                type="text"
                name="image"
                required
                placeholder="Insira uma imagem"
                onChange={(e) => setImage(e.target.value)}
                value={image}
              />
            </label>
            <label>
              <span>Conteúdo</span>
              <textarea
                name="body"
                required
                placeholder="Insira o conteúdo do post"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </label>
            <label>
              <span>Tags</span>
              <input
                type="text"
                name="tags"
                placeholder="Insira alguma tag, Ex: #react_router"
                onChange={(e) => setTags(e.target.value)}
                value={tags}
              />
            </label>
            {!response.loading && (
              <button className="btn" type="submit">
                Salvar Alterações
              </button>
            )}
            {response.loading && (
              <button className="btn" type="submit" disabled>
                Aguarde...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
