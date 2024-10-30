import React from 'react'
import GenreSpan from './GenreSpan'
import Image from './Image'
export default function CardMovie(props) {
    const imgStyle = {
        width: '10%',
        height: 'auto',
        objectFit: "cover"
    }
    const aStyle = {
        textDecoration: 'none',
        color: 'black'

    }
    return (
        <>
            <div className='col-12 col-md-12 d-flex align-items-start'>
                <Image src={props.poster} alt={props.movieName} imgStyle={imgStyle} className="img-fluid"></Image>
                <div className='d-flex flex-column justify-content-start px-2'>
                    <h3>{props.movieName}</h3>
                    <div className='d-flex flex-row'>
                        {
                            props.genres.map((genre) => (
                                <GenreSpan genre={genre.name} className='badge bg-secondary'></GenreSpan>
                            ))
                        }
                    </div>
                    {
                        props.directors.map((director) => (
                            <a className='me-2' style={aStyle} key={director.id}>{director.name} {director.lastName}</a>
                        ))
                    }
                    <div className='d-flex flex-row'>
                    {
                        props.actors.map((actor) => (
                            <a className='me-2' style={aStyle} key={actor.id}>{actor.name} {actor.lastName} </a>
                        ))
                    }
                    </div>
                </div>
            </div>
        </>
    )
}
