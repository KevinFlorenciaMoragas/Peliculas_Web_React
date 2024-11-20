import React from 'react'
import github from '../assets/svg/github.svg'
import linkedin from '../assets/svg/linkedin.svg'
export default function Footer() {
    const date = new Date().getFullYear()
    
    const svgStyle = {
        height: "2em",
        width: "2em",
        marginRight: "1em"
    }
    return (
        <footer className='mt-2 d-flex flex-row justify-content-between' >
            <div className='p-2'>
                <h4>@ PelisCorp {date} </h4>
            </div>
            <div className='p-2 d-flex'>
               <a href='https://github.com/KevinFlorenciaMoragas'> <img style={svgStyle} src={github}></img> </a>
               <a href='https://www.linkedin.com/in/kevin-florencia-moragas/' ><img style={svgStyle} src={linkedin}></img> </a>
            </div>
        </footer>
    )
}
