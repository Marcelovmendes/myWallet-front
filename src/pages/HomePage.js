import styled from "styled-components";
import { BiExit } from "react-icons/bi";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();
  const [noTransactions, setNoTransactions] = useState(false);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        if (!user?.token) return alert("faça login");
        const response = await axios.get("http://localhost:5000/home", {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });

        setTransactions(response.data.reverse());
      } catch (err) {
        if (err.response.status === 422) setNoTransactions(true);
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

  async function handleLogout() {
    try {
      await axios.post(
        "http://localhost:5000/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      navigate("/");
      localStorage.removeItem("user");
    } catch (err) {
      console.log(user.token);
      console.log(err);
      alert(err.response.data);
    }
  }
  return (
    <HomeContainer>
      <Header>
        <h1>Olá, {user.name}</h1>
        <BiExit onClick={handleLogout} />
      </Header>

      <TransactionsContainer>
        {noTransactions ? (
          <NoTransactions>
            <span>Não há registros de entrada ou saída </span>
          </NoTransactions>
        ) : (
          <ul>
            {transactions.map((t) => (
              <ListItemContainer key={t._id}>
                <div>
                  <span>{t.date}</span>
                  <strong>{t.message}</strong>
                </div>
                <Value color={t.tipo === "saida" ? "negativo" : "positivo"}>
                  {t.value}
                </Value>
              </ListItemContainer>
            ))}
          </ul>
        )}
      </TransactionsContainer>
      <SaldoContainer>
        <strong>Saldo</strong>
        <ValueSaldo color={"positivo"}>{balance.toFixed(2)}</ValueSaldo>
      </SaldoContainer>
      <ButtonsContainer>
        <button>
          <Link to="/nova-transacao/entrada">
            <AiOutlinePlusCircle />
            <p>
              Nova <br /> entrada
            </p>
          </Link>
        </button>
        <button>
          <Link to="/nova-transacao/saida">
            <AiOutlineMinusCircle />
            <p>
              Nova <br />
              saída
            </p>
          </Link>
        </button>
      </ButtonsContainer>
    </HomeContainer>
  );
}
const NoTransactions = styled.div`
  height: 46px;
  width: 180px;
  border-radius: nullpx;
  margin-top: 150px;
  margin-left: 75px;
  span {
    color: #868686;
    font-family: Raleway;
    font-size: 20px;
    font-weight: 400;
    line-height: 23px;
    letter-spacing: 0em;
    text-align: center;
  }
`;
const SaldoContainer = styled.article`
display: flex;
justify-content: space-between;
border-bottom-left-radius:5px;
border-bottom-right-radius:5px;
background-color: #FFFFFF;

strong{
font-family: Raleway;
font-size: 17px;
font-weight: 700;
line-height: 20px;
letter-spacing: 0em;
text-align: left;
margin-left: 10px;
}

`
const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100vh - 50px);
`;
const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 2px 5px 2px;
  margin-bottom: 15px;
  font-size: 26px;
  color: white;
`;
const TransactionsContainer = styled.article`
  flex-grow: 1;
  background-color: #fff;
  color: #000;
  border-top-left-radius:5px;
  border-top-right-radius:5px;
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
  max-height: 400px;
  overflow-y: auto;
  ::-webkit-scrollbar {
    width: 3px;
    height: 8px;
    background-color: #FFFFFF;
    border-radius: 5px;
  }
`;
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
`;
const Value = styled.div`
  font-size: 16px;
  text-align: right;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
const ValueSaldo = styled.div`
margin-bottom: 15x;
  font-size: 16px;
  text-align: right;
  margin-right: 10px;
  color: ${(props) => (props.color === "positivo" ? "green" : "red")};
`;
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
`;
