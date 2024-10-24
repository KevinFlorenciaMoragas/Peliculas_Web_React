import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import GenreSpan from './GenreSpan';
import infoSvg from '../assets/svg/info.svg';
import { Badge, ListGroup } from 'react-bootstrap';
const API_URL = import.meta.env.VITE_API_URL;
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
        <ListGroup.Item style={movieCard} as="li" className="d-flex justify-content-between align-items-start">
            <img src={props.poster} className="img-fluid" style={imgCard}></img>
            <div className="ms-2 me-auto">
                <div className="fw-bold my-1">{props.movieName}</div>
                {
                    props.directors.map((director) => {
                        return <span>{director.name} {director.lastName}</span>
                    })
                }
                <div className="d-flex my-1 flex-row">
                    {
                        props.actors.map((actor) => {
                            return <span className='me-2 '>{actor.name} {actor.lastName}</span>
                        })
                    }
                </div>
                <div className="d-flex my-1 flex-row">
                    {
                        props.genres.map((genre) => {
                            return <GenreSpan genre={genre.name} className='badge bg-primary me-2'></GenreSpan>
                        })
                    }
                </div>
            </div>

            <Link to={`../movie/${props.id}`}>   <img style={svgStyle} src={infoSvg}></img> </Link>

        </ListGroup.Item>

    )
}
