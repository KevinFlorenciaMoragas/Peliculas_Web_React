import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <>
    <nav className='navbar navbar-expanded-lg bg-body-tertiary'>
        <Link to={'/login'}></Link>
    </nav>
    </>
  )
}
