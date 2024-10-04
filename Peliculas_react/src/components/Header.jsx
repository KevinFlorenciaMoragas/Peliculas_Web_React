import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
export default function Header() {
  const {user, logout, role} = useAuth()
  const handleSearchSubmit = (event) => {
    event.preventDefault(); 

  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <Link to='/' className='navbar-brand'>Peliculas</Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarSupportedContent" 
          aria-controls="navbarSupportedContent" 
          aria-expanded="false" 
          aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            <li className='nav-item'>
              <Link to='/' className='nav-link'>Inicio</Link>
            </li>
            <li className='nav-item'>
              <Link to='/about' className='nav-link'>Sobre</Link>
            </li>
            <li className="nav-item dropdown">
              <Link 
                className="nav-link dropdown-toggle" 
                role="button" 
                data-bs-toggle="dropdown" 
                aria-expanded="false">
                Dropdown
              </Link>
              <ul className="dropdown-menu">
                <li><Link className="dropdown-item" to="#">Action</Link></li>
                <li><Link className="dropdown-item" to="#">Another action</Link></li>
                <li><Link className="dropdown-item" to="#">Something else here</Link></li>
              </ul>
            </li>
            {role === 'admin' && (
            <>
            <li className='nav-item'>
              <Link to='/admin' className='nav-link'>Panel Admin</Link>
            </li>
             </>
            )}
          </ul>
          <form className='d-flex' onSubmit={handleSearchSubmit}>
            <input className='form-control me-2' type='search' placeholder='Buscar' aria-label='Buscar' />
            <button className='btn btn-outline-secondary' type='submit'>Buscar</button>
          </form>
          <div className='ps-lg-5'>
            {user ? (
              <>
                <span className='navbar-text'>Hola, {user}</span>
                <button className='btn btn-danger m-1' onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <>
               <Link to='/login' className='btn btn-secondary m-1'>Login</Link>
               <Link to='/register' className='btn btn-primary m-1'>Register</Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}