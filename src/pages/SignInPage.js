import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import MyWalletLogo from "../components/MyWalletLogo";
import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";


export default function SignInPage() {
  const [form, setForm] = useState({email: "", password:""})
  const {setUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleForm=(e)=>{
    setForm({...form,[e.target.name]: e.target.value})
  }
  const handleLogin = async(e) => {
    e.preventDefault();
     try{
     const res = await axios.post("",form)
     const {token,user} =res.data
     const {name,email,_id} =user
     setUser({_id,name,email,token})
     localStorage.setItem("user",JSON.stringify({_id,name,email,token}))
     navigate("/home");
     
     }catch(err){
      switch (err.response.status) {
        case 404:
          alert("Usuário não encontrado");
          break;
        case 422:
          alert("Preencha todos os campos corretamente");
          break;
        case 401:
          alert("Senha incorreta, digite novamente");
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
    <SingInContainer>
      <form onSubmit={handleLogin}>
        <MyWalletLogo />
        <input name="email" placeholder="E-mail" type="email" value={form.email} onChange={handleForm}/>
        <input
          name="password"
          placeholder="Senha"
          type="password"
          autoComplete="new-password"
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
