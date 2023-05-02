import axios from "axios";
import styled from "styled-components";
import { useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserContext } from "../contexts/UserContext";

export default function TransactionsPage() {
  const { user } = useContext(UserContext); 
  const [newTransaction, setNewTransaction] = useState({
    value: "",
    message: "",
  });
  const { tipo } = useParams();
  const navigate = useNavigate();

  const handleTransaction = (e) => {
    setNewTransaction({ ...newTransaction, [e.target.name]: e.target.value });
  };
  const postTransactions = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `https://my-wallet-node.onrender.com/nova-transacao/${tipo}`,
        newTransaction,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      navigate("/home");
    } catch (err) {
      alert(err.response.data)
    }
  };
  return (
    <TransactionsContainer>
      <h1>Nova TRANSAÇÃO</h1>
      <form onSubmit={postTransactions}>
        <input
          required
          name="value"
          type="number"
          placeholder="Valor"
          value={newTransaction.value}
          onChange={handleTransaction}
        />
        <input
          required
          name="message"
          type="text"
          placeholder="Descrição"
          value={newTransaction.message}
          onChange={handleTransaction}
        />
        <button type="submit">Salvar TRANSAÇÃO</button>
      </form>
    </TransactionsContainer>
  );
}

const TransactionsContainer = styled.main`
  height: calc(100vh - 50px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  h1 {
    align-self: flex-start;
    margin-bottom: 40px;
  }
  input{
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
  -webkit-appearance: none;
   margin: 0;  
 }}
`;
