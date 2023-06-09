import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignUpPage() {
  const [form, setForm] = useState({name:"",email: "", password:"",confirmPassword:""})
  const navigate = useNavigate();

  const handleForm = (e)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }
  const handleSignUp = async(e) => {
    e.preventDefault();
    try{
      await axios.post("https://my-wallet-node.onrender.com/cadastro",form)
      navigate("/")

    }catch (err){
      console.log(err)
      switch (err.response.status) {
        case 409:
          alert("Usuário ja cadastrado");
          break;
        case 422:
          alert(err.response.data);
          break;
        case 500:
          alert("Erro interno do servidor");
          break;
        default:
          console.log(err);
      }

    }
  };
  return (
    <SingUpContainer>
      <form onSubmit={handleSignUp}>
        <MyWalletLogo />
        <input
          required
          onChange={handleForm}
          value={form.name}
          name="name"
          placeholder="Nome"
          type="text"
        />
        <input
          required
          onChange={handleForm}
          value={form.email}
          name="email"
          placeholder="E-mail"
          type="email"
        />
        <input
          required
          onChange={handleForm}
          value={form.password}
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
        />
        <input
          required
          onChange={handleForm}
          value={form.confirmPassword}
          name="confirmPassword"
          placeholder="Confirme a senha"
          type="password"
          autocomplete="new-password"
        />
        <button type="submit">Cadastrar</button>
      </form>

      <Link to="/">Já tem uma conta? Entre agora!</Link>
    </SingUpContainer>
  );
}

const SingUpContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
