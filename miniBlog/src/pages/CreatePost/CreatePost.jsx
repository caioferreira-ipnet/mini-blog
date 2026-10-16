//Hooks
import { useState } from "react";
import { useAuthValue } from "../../hooks/useAuthValue.jsx";
import { useInsertDocument } from "../../hooks/useInsertDocument.jsx";
const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState("");
  const { insertDocument, response } = useInsertDocument();
  const { user } = useAuthValue();
  //Função de enviar formulário '
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    insertDocument({
      title,
      image,
      body,
      tags,
      uid: user.uid,
      createdBy: user.displayName,
    });
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
      </form>
    </div>
  );
};

export default CreatePost;
