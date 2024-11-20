import React from 'react'
import { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import './ListMovie.css'
import ListMovieComponent from '../components/ListMovieComponent';
import LoadingPage from './LoadingPage';
const API_URL = import.meta.env.VITE_API_URL;
export default function ListMovie() {
    const [movies, setMovies] = useState([]);
    const [order, setOrder] = useState("score");
    const [genreSelected, setGenreSelected] = useState(null);
    const [genres, setGenres] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(5);
    let routeWithParams = '';

    useEffect(() => {
        const params = new URLSearchParams({
            limit: limit,
            page: page,
            order: order,
        });
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },

        };
        routeWithParams = API_URL + '/movies?' + params.toString();
        fetch(`${API_URL}/genre`, options)
            .then(res => res.json())
            .then(res => {
                setGenres(res)
            })
            .catch(error => console.log(error))
        if (genreSelected == null) {
            fetch(routeWithParams, options)
                .then(res => res.json())
                .then(res => {
                    setTotalPages(res.totalPages)
                    setMovies(res.movies)
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
    }, [genreSelected, order, page])
    if (movies.length === 0) {
        <LoadingPage />
    }
    return (
        <>

            <section className='row d-flex justify-content-center my-2'>
                <div className='col-12 col-md-6 col-lg-2 d-flex flex-column'>
                    <select
                        value={order}
                        className="form-select my-2"
                        onChange={(e) => setOrder(e.target.value)}
                        aria-label="Ordenar por">
                        <option value="movieName">Title</option>
                        <option value="score">Score</option>
                        <option value="duration">Duration</option>
                    </select>
                    {
                        genres.map((genre, index) => {
                            return (
                                <button className='btn btn-secondary my-2 filter ' key={genre.id} onClick={() => { setGenreSelected(genre.id) }}>{genre.name}</button>
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
                                        key={movie.id}
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
                    {
                        totalPages > 1 && <div className='d-flex justify-content-center'>
                            <button className='btn btn-secondary' onClick={() => { setPage(page - 1) }} disabled={page === 1}>Anterior</button>
                            <button className='btn btn-secondary' onClick={() => { setPage(page + 1) }} disabled={page === totalPages}>Siguiente</button>
                        </div>
                    }
                </div>
            </section>
        </>
    )
}
