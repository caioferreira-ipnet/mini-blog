//Hooks
import { useState } from "react";
import { useAuthValue } from "../../hooks/useAuthValue.jsx";
import { useInsertDocument } from "../../hooks/useInsertDocument.jsx";
import { useNavigate } from "react-router-dom";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { insertDocument, response } = useInsertDocument("posts");
  const { user } = useAuthValue();
  const navigate = useNavigate();
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
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });
    //Redirect to home page
    void navigate("/");
  };
  return (
    <div className="container">
      <div className="titles">
        <h1>Crie um post</h1>
        <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
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
            Criar Post
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
    </div>
  );
};

export default CreatePost;
