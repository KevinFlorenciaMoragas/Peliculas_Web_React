import React from 'react'
import { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import ListMovieComponent from '../components/ListMovieComponent';
const API_URL = import.meta.env.VITE_API_URL;
export default function ListMovie() {
    const [movies, setMovies] = useState([]);
    const [order, setOrder] = useState("movieName")
    const [genreSelected, setGenreSelected] = useState(null);
    const [genres, setGenres] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        };
        if (genreSelected == null) {
            fetch(`${API_URL}/genre`, options)
                .then(res => res.json())
                .then(res => {
                    setGenres(res)
                })
                .catch(error => console.log(error))

            fetch(`${API_URL}/movie/order/${order}`, options)
                .then(res => res.json())
                .then(res => {
                    setMovies(res)
                })
                .catch(error => console.log(error))
        }
        if (genreSelected != null) {
            fetch(`${API_URL}/movie/genre/${genreSelected}`, options)
                .then(res => res.json())
                .then(res => {
                    setMovies(res)
                })
                .catch(error => console.log(error))
        }
    }, [genreSelected, order])

    return (
        <>

            <section className='row d-flex justify-content-center my-2'>
                <div className='col-12 col-md-6 col-lg-2 d-flex flex-column'>
                    <select className="form-select my-2" value={"movieName"} onChange={(e) => { setOrder(e.target.value) }} aria-label="">
                        <option selected value="movieName">Titulo</option>
                        <option value="score">Puntuación</option>
                        <option value="duration">Duration</option>
                    </select>
                    {
                        genres.map((genre, index) => {
                            return (
                                <button className='btn btn-secondary my-2 ' key={index} onClick={() => {
                                    console.log(genre.id)
                                    setGenreSelected(genre.id)
                                }
                                } >{genre.name}</button>
                            )
                        })

                    }
                    <button className='btn btn-secondary my-2' onClick={() => { setGenreSelected(null) }} >Borrar</button>

                </div>

                <div className='col-12 col-md-6 col-lg-4'>
                    <ListGroup className='my-2'>
                        {
                            movies.map((movie, index) => {
                                return (
                                    <ListMovieComponent
                                        key={index}
                                        id={movie.id}
                                        poster={movie.poster}
                                        movieName={movie.movieName}
                                        directors={movie.directors}
                                        actors={movie.actors}
                                        genres={movie.genres}
                                    ></ListMovieComponent>
                                )
                            })
                        }

                    </ListGroup>
                </div>
            </section>
        </>
    )
}
