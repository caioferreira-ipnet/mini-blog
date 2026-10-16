import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "../../styles/stylePages/styleRegister/Register.module.css";
import { useState } from "react";

const Register = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formError, setFormError] = useState("");

  const { createUser, error: authError, loading } = useAuthentication();

  const displayError = formError || authError;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");

    const user = {
      displayName,
      email,
      password,
    };

    if (password !== confirmPassword) {
      setFormError("As senhas precisam ser iguais");
      return;
    }

    const res = await createUser(user);
    console.log(res);
    console.log("Enviei o formulário");
  };

  return (
    <div className={styles.container}>
      <div className="titles">
        <h1>Cadastre-se para postar!</h1>
        <h3>Crie seu usuário e compartilhe as suas histórias!</h3>
      </div>

      <form className="form" onSubmit={handleSubmit}>
        <label>
          <span>Nome: </span>
          <input
            type="text"
            name="nome"
            required
            value={displayName}
            placeholder="Digite seu nome"
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </label>
        <label>
          <span>E-mail: </span>
          <input
            type="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
          />
        </label>
        <label>
          <span>Senha: </span>
          <input
            type="password"
            name="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite a sua senha"
          />
        </label>
        <label>
          <span>Confirmação de senha: </span>
          <input
            type="password"
            name="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirme a sua senha"
          />
        </label>
        {!loading && (
          <button className="btn" type="submit">
            Cadastrar
          </button>
        )}
        {loading && (
          <button className="btn" type="submit" disabled>
            Aguarde...
          </button>
        )}
        {displayError && <p className="error">{displayError}</p>}
      </form>
    </div>
  );
};

export default Register;
