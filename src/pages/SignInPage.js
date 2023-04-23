import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useState } from "react";
import axios from "axios";

export default function SignInPage() {
  const [form, setForm] = useState({email: "", password:""})
  const navigate = useNavigate();

  const handleForm=(e)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }
  const handleLogin = async(e) => {
    e.preventDefault();
     try{
     await axios.post("http://localhost:5000/",form)
     }catch(err){
     console.log(err.response.data)
     alert (err.response.data)
     }
   // navigate("/home");
  };
  return (
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleForm}/>
        <input
          name="password"
          placeholder="Senha"
          type="password"
          autocomplete="new-password"
          value={form.password}
          onChange={handleForm}
        />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/cadastro">Primeira vez? Cadastre-se!</Link>
    </SingInContainer>
  );
}

const SingInContainer = styled.section`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
