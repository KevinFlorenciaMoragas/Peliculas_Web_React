import './App.css'
import Header from './components/Header';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { Outlet } from 'react-router-dom'
function App() {
 

  return (
    <>
    <Outlet></Outlet>
    </>
  )
}

export default App
