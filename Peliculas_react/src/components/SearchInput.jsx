import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CardMovie from './CardMovie';
import { Link } from 'react-router-dom';
import './SearchInput.css'; // Asegúrate de usar el CSS adaptado
const API_URL = import.meta.env.VITE_API_URL;

export default function SearchInput() {
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [movieList, setMovieList] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const navigate = useNavigate();

    // Debounce para limitar las llamadas a la API
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (search) {
                fetchMovies(search);
                setShowDropdown(true);
            } else {
                setMovieList([]);
                setErrorMessage('');
                setShowDropdown(false);
            }
        }, 300); // Esperar 300ms antes de realizar la búsqueda

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    const fetchMovies = (searchTerm) => {
        fetch(`${API_URL}movie/suggestions/${searchTerm}`)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage('Película no encontrada');
                    setMovieList([]);
                } else {
                    setMovieList(res);
                    setErrorMessage('');
                }
            })
            .catch((err) => {
                setErrorMessage('Error al buscar películas');
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

    const handleBlur = () => {
        // Ocultar dropdown cuando el campo pierde foco
        setTimeout(() => setShowDropdown(false), 200);
    };

    return (
        <div className="search-container">
            <form className="search-form" onSubmit={handleSearchSubmit}>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Buscar..."
                    aria-label="Buscar"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={handleBlur}
                />
                <button className="search-button" type="submit">Buscar</button>
            </form>

            {/* Dropdown de resultados */}
            {showDropdown && (
                <div className="results-dropdown">
                    {errorMessage && <h2 className="error-message">{errorMessage}</h2>}
                    <ul className="results-list">
                        {movieList.length > 0 ? (
                            movieList.map((movie) => (
                                <li className="result-item" key={movie.id}>
                                    <Link to={`/movie/${movie.id}`}>
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
                            search && <li className="result-item">No se encontraron resultados.</li>
                        )}
                    </ul>
                </div>
            )}
        </div>
    );
}