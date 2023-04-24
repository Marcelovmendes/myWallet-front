import { BrowserRouter, Routes, Route } from "react-router-dom"
import styled from "styled-components"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import TransactionsPage from "./pages/TransactionPage"
import { useEffect, useState } from "react"
import { UserContext } from "./contexts/UserContext"
import { useNavigate } from "react-router-dom"

export default function App() {
  const lsUser=JSON.parse(localStorage.getItem("user"))
  const [user ,setUser]= useState(lsUser) 

  return (
    <PagesContainer>
      <BrowserRouter>
      <UserContext.Provider value={{user,setUser}}>

        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/cadastro" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/nova-transacao/:tipo" element={<TransactionsPage />} />
        </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </PagesContainer>
  )
}

const PagesContainer = styled.main`
  background-color: #8c11be;
  width: calc(100vw - 50px);
  max-height: 100vh;
  padding: 25px;
`
