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
import Header from './components/Header.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Header></Header>
        <Routes>
          <Route path='/' element={<App></App>}>
            <Route index element={<Home></Home>}></Route>
            <Route path='/login' element={<Login></Login>}></Route>
            <Route path='/register' element={<Register></Register>}></Route>
            <Route path='/admin' element={<AdminPanel></AdminPanel>}></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
    <App />
  </StrictMode>
)
