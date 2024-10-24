import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardMovie from './CardMovie';
import { Link } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL;

export default function SearchInput() {
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const navigate = useNavigate();

    // Debounce para limitar las llamadas a la API
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                fetchMovies(search);
            } else {
                setMovieList([]);
                setErrorMessage('');
            }
        }, 300); // Esperar 300ms antes de realizar la búsqueda

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const fetchMovies = (searchTerm) => {
        fetch(`${API_URL}movie/suggestions/${searchTerm}`)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage('Movie not found');
                    setMovieList([]);
                } else {
                    setMovieList(res);
                    setErrorMessage('');
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching movie');
                console.log(err);
            });
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        if (movieList.length > 0) {
            const firstMovieId = movieList[0].id; // Tomar el primer resultado
            navigate(`/movie/${firstMovieId}`);
        }
    };

    return (
        <>
            <form className='d-flex' onSubmit={handleSearchSubmit}>
                <input
                    className='form-control me-2'
                    type='search'
                    placeholder='Buscar'
                    aria-label='Buscar'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button className='btn btn-outline-secondary' type='submit'>Buscar</button>
            </form>
            <section className='mt-2'>
                {errorMessage && <h2>{errorMessage}</h2>}
                <ul className='list-group'>
                    {
                        movieList.length > 0 ? (
                            movieList.map((movie) => (
                                <li className='list-group-item' key={movie.id}>
                                    <Link to={`/movieDetails/${movie.id}`}>
                                        <CardMovie
                                            genres={movie.genres}
                                            movieName={movie.movieName}
                                            directors={movie.directors}
                                            actors={movie.actors}
                                            poster={movie.poster}
                                        />
                                    </Link>
                                </li>
                            ))
                        ) : (
                            search && <li className='list-group-item'>No se encontraron resultados.</li>
                        )
                    }
                </ul>
            </section>
        </>
    );
}
