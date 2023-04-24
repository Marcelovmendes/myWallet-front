import styled from "styled-components"
import { BiExit } from "react-icons/bi"
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai"
import { useEffect, useState,useContext } from "react"
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";


export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await axios.get("http://localhost:5000/home", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setTransactions(response.data);
      } catch (err) {
        console.log(err);
        if(!user.token){
          alert("Faça login")
        }
      }
    } 

    fetchTransactions();
  }, []);

  useEffect(() => {
    const totalIncome = transactions
      .filter((t) => t.tipo === "entrada")
      .reduce((acc, t) => acc + t.value, 0);
    const totalExpense = transactions
      .filter((t) => t.tipo === "saida")
      .reduce((acc, t) => acc + t.value, 0);
    setBalance(totalIncome - totalExpense);
  }, [transactions]);

  console.log(balance)

  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit />
      </Header>

      <TransactionsContainer>
        <ul>
          {transactions.map((t)=>(
          <ListItemContainer key={t._id}>
            <div>
              <span>{t.date}</span>
              <strong>{t.message}</strong>
            </div>
            <Value color={t.tipo ==='saida'?"negativo": "positivo"}>{t.value}</Value>
          </ListItemContainer>
          ))}
        </ul>

        <article>
          <strong>Saldo</strong>
          <Value color={"positivo"}>{balance.toFixed(2)}</Value>
        </article>
      </TransactionsContainer>


      <ButtonsContainer>
        
        <button>
        <Link to="/nova-transacao/entrada">
          <AiOutlinePlusCircle />
          <p>Nova <br /> entrada</p>
          </Link>
        </button>
        <button>
          <Link to="/nova-transacao/saida">
          <AiOutlineMinusCircle />
          <p>Nova <br />saída</p>
          </Link>
        </button>
      </ButtonsContainer>

    </HomeContainer>
  )
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-radius: 5px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  article {
    display: flex;
    justify-content: space-between;   
    strong {
      font-weight: 700;
      text-transform: uppercase;
    }
  }
`
const ButtonsContainer = styled.section`
  margin-top: 15px;
  margin-bottom: 0;
  display: flex;
  gap: 15px;
  
  button {
    width: 50%;
    height: 115px;
    font-size: 22px;
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p {
      font-size: 18px;
    }
  }
`
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`
const ListItemContainer = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  color: #000000;
  margin-right: 10px;
  div span {
    color: #c6c6c6;
    margin-right: 10px;
  }
`