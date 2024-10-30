import React, { useState } from 'react'
import InputLabel from '../components/InputLabel'
import { useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL

export default function RecoverPassword() {
  const [email, setEmail] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [number, setNumber] = useState("")
  const [password, setPassword] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [okMessage, setOkMessage] = useState("")
  const navigate = useNavigate()
  const show = {
    opacity: 1,
    display:"block"
  }
  const hide = {
    opacity: 0,
    TransitionEnd:{
      display: 'none'
    }
  }
  const handleSubmitRecoverPassowrd = (e) => {
    e.preventDefault()
    const credentials = {
      email
    }
    const options = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }
    fetch(API_URL + "recoverpassword", options)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Email no correcto")
        } else {
          console.log(res)
          setIsVisible(true)
          setNumber(res.newPassword)
          console.log(isVisible)
        }
      }).catch(err => {
        setErrorMessage(err)
      })
  }
  const handleSubmitNewPassowrd = (e) => {
    e.preventDefault()
    const credentials = {
      email,
      number,
      newPassword: password
    }
    const options = {
      method: 'PUT',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    }
    fetch(API_URL+"changepassword",options)
    .then(res => res.json())
    .then(res => {
      if(res.error){
        setErrorMessage("No coinciden los datos")
      }
      setOkMessage("Contraseña cambiada correctamente")

    })
  }
  function showPasswordForm() {
    return (
      <>
        {number && <h3>{number}</h3>} 
        {!isVisible ? (
          <form onSubmit={handleSubmitRecoverPassowrd} className="col-12 col-lg-4">
            <InputLabel
              labelFor="email"
              label="Email"
              inputType="email"
              inputId="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button className="btn btn-secondary">Recuperar contraseña</button>
            <span>{errorMessage}</span>
          </form>
        ) : (
          <form onSubmit={handleSubmitNewPassowrd} className="col-12 col-lg-4">
            <InputLabel
              labelFor="password"
              label="Contraseña"
              inputType="password"
              inputId="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="btn btn-secondary">Cambiar Contraseña</button>
            <span>{okMessage}</span>

          </form>
        )}
      </>
    );
  }
  const formStyle = {
    height: "80vh"
  }
  return (
    <section style={formStyle} className='d-flex flex-column justify-content-center align-items-center'>
      {
        showPasswordForm()
      }
    </section>
  )
}
