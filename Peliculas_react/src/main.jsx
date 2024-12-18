import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Register from './pages/Register.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import RecoverPassword from './pages/RecoverPassword.jsx'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import MovieDetail from './pages/MovieDetail.jsx'
import RecoverPassoword from './pages/RecoverPassword.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ListMovie from './pages/ListMovie.jsx'
import { ThemeProvider } from './context/ThemeContext.jsx'
import LoadingPage from './pages/LoadingPage.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
      <ThemeProvider>
        <Header></Header>
        <div className='container-fluid main-container'>
        <Routes>
          <Route path='/' element={<App></App>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/admin' element={<AdminPanel></AdminPanel>}></Route>
            <Route path='/list' element={<ListMovie></ListMovie>}></Route>
            <Route path='/movie/:id' element={<MovieDetail></MovieDetail>}> </Route>
            <Route path='/recover-password' element={<RecoverPassword></RecoverPassword>}></Route>
          </Route>
        </Routes>
        </div>
        <Footer></Footer>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
    <App />
  </StrictMode>
)
