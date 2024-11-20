import React from 'react'
import { Link } from 'react-router-dom';
import GenreSpan from './GenreSpan';
import Image from './Image';
import infoSvg from '../assets/svg/info.svg';
import { ListGroup } from 'react-bootstrap';

export default function ListMovieComponent(props) {
    const movieCard = {
        backgroundColor: "#3B3B40",
        color: "#E8E9F3"
    }
    const imgCard = {
        width: "80px",
        height: "auto",
        borderRadius: "1em"
    }
    const svgStyle = {
        width: "1.5em",
        height: "1.5em",
    }

    return (
        <ListGroup.Item style={movieCard} as="li" className="d-flex justify-content-between align-items-start list-item">
            <Image src={props.poster} alt={props.movieName} imgStyle={imgCard}></Image>
            <div className="ms-2 me-auto">
                <div className="fw-bold my-1">{props.movieName}</div>
                {
                    props.directors.map((director) => {
                        return <span key={director.id}>{director.name} {director.lastName}</span>
                    })
                }
                <div className="d-flex my-1 flex-row">
                    {
                        props.actors.map((actor) => {
                            return <span key={actor.id} className='me-2 '>{actor.name} {actor.lastName}</span>
                        })
                    }
                </div>
                <div className="d-flex my-1 flex-row">
                    {
                        props.genres.map((genre) => {
                            return <GenreSpan key={genre.id} genre={genre.name} className='badge bg-primary me-2'></GenreSpan>
                        })
                    }
                </div>
            </div>

            <Link to={`../movie/${props.id}`}><Image imgStyle={svgStyle} src={infoSvg}></Image> </Link>

        </ListGroup.Item>

    )
}
