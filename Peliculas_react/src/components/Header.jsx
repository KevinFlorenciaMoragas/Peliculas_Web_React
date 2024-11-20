import React from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext';
import SearchInput from './SearchInput';
import { useTheme } from '../context/ThemeContext';
import Image from './Image';
import logo from '../assets/svg/movie-full.svg'
import Sun from '../assets/svg/sun.svg'
import Moon from '../assets/svg/moon.svg'
export default function Header() {
  const { user, logout, role } = useAuth()
  const { theme, changeTheme } = useTheme()

  const handleSearchSubmit = (event) => {
    event.preventDefault();

  };
  const imgStyle = {
    width: '2em',
    height: '2em',
    display: 'block'
  }

  return (
    <header>
      <nav className='d-flex align-items-center navbar navbar-expand-lg header' >
        <Link to='/' className='navbar-brand ms-3 d-flex align-items-center'>
          <Image src={logo} imgStyle={imgStyle}></Image>
          <h3 className="ms-2 my-0">Peliculas</h3>
        </Link>
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
            {/* <li className='nav-item'>
              <Link to='/' className='nav-link'>Inicio</Link>
            </li> */}
            <li className='nav-item'>
              <Link to='/list' className='nav-link'>Movie List</Link>
            </li>
            {/* <li className="nav-item dropdown">
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
            </li> */}
            {role === 'admin' && (
              <>
                <li className='nav-item'>
                  <Link to='/admin' className='nav-link'>Panel Admin</Link>
                </li>
              </>
            )}
          </ul>
          <SearchInput></SearchInput>
          <div className='ps-lg-5 me-3'>
            {user ? (
              <>
                <button className='btn btn-danger m-1' onClick={logout}>Cerrar sesión</button>
              </>
            ) : (
              <>
                <Link to='/login' className='btn btn-secondary m-1'>Login</Link>
                <Link to='/register' className='btn btn-primary m-1'>Register</Link>
              </>
            )}
          </div>
          <button onClick={changeTheme} className='btn btn-primary m-1'>  {theme === 'dark' ?
            <Image alt={"Modo Día"} imgStyle={imgStyle} src={Sun}></Image>
            :
            <Image alt={"Modo Noche"} imgStyle={imgStyle} src={Moon}></Image>} </button>
        </div>
      </nav>
    </header>
  );
}