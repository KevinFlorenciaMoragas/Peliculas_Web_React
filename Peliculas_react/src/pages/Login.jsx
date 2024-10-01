import React, { useState } from 'react'
import InputLabel from '../components/InputLabel'

const API_URL = import.meta.env.VITE_API_URL;
export default function Login() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [errorMessage, setErrorMessage] = useState("")
    // const navigate = useNavigate()

    const login = (e) => {
        e.preventDefault()
        const credentials = {
            username,
            password
        }
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        }
        fetch(API_URL + "login", options)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage("Usuario o contraseña equivocados")
                } else {
                    Cookie.set('token', res, { expires: 180000 })
                    // navigate('')
                }
            })
            .catch((err) => { setErrorMessage('Fallo al iniciar sesión') })
    }
    return (
        <>
            <section className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
                <form className='' onSubmit={login}>
                    <InputLabel
                        labelFor="username"
                        label="Usuario"
                        inputType="text"
                        inputId="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
