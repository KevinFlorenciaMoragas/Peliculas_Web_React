import React from 'react'
import InputLabel from '../components/InputLabel'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
const API_URL = import.meta.env.VITE_API_URL;

export default function Register() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const [active, setActive] = useState(true)
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()

    const register = (e) => {
        e.preventDefault()
        const credentials = {
            username,
            password,
            email,
            active
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
        fetch(API_URL + "register", options)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage("Datos no correctos")
                } else {
                     navigate('/login')
                }
            })
            .catch((err) => { setErrorMessage('Fallo al iniciar sesión') })
    }
  return (
    <>
        <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
        <form className='' onSubmit={register}>
            <InputLabel
                labelFor="username"
                label="Usuario"
                inputType="text"
                inputId="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />
            <InputLabel
                labelFor="email"
                label="Email"
                inputType="email"
                inputId="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />

            <InputLabel
                labelFor="password"
                label="Contraseña"
                inputType="password"
                inputId="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
            <button type="submit" className="btn btn-primary w-100">Iniciar Sesión</button>
        </form>
    </section>
</>
  )
}
