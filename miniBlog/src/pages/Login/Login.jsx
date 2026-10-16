import { useAuthentication } from "../../hooks/useAuthentication";
import styles from "../../styles/stylePages/styleLogin/Login.module.css";
import { useState } from "react";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const { loading, login, error: authError } = useAuthentication();

  //Função de enviar formulário
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    const user = {
      email,
      password,
    };
    await login(user);
  };
  return (
    <div className={styles.container}>
      <form className="form" onSubmit={handleSubmit}>
        <div className="titles">
          <h1>Login</h1>
          <h4>Faça o Login para entrar no sistema!</h4>
        </div>
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
        {!loading && (
          <button type="submit" className="btn">
            Entrar
          </button>
        )}
        {loading && (
          <button type="submit" className="btn" disabled>
            Aguarde...
          </button>
        )}
        {authError && <p className="error">{authError}</p>}
      </form>
    </div>
  );
};

export default Login;
