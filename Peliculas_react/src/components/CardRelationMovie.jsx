import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

export default function CardRelationMovie({ movieId, genreId }) {
  const [relationMovies, setRelationMovies] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`${API_URL}movie/genre/${genreId}/movieId/${movieId}`, options)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Datos no correctos");
        } else {
          setRelationMovies(res);
          console.log(res);
        }
      })
      .catch(() => {
        setErrorMessage('Fallo al cargar las películas relacionadas.');
      });
  }, [genreId, movieId]);

  if (errorMessage) {
    return <p>{errorMessage}</p>;
  }

  if (relationMovies.length === 0) {
    return <h1>Cargando...</h1>;
  }
  const linkStyle = {
    color: 'white',
    textDecoration: 'none'
  }
  return (
    <div className="row">
      {relationMovies.map((movie) => (
        <div className="col-6 col-md-4" key={movie.id}>
          <div className="card">
            <img src={movie.poster} className="card-img-top" alt={`${movie.movieName} poster`} />
            <div className="card-body">
              <h5 className="card-title">{movie.movieName}</h5>
              {
                movie.directors.map((director, index) => (
                  <span key={index} className="badge bg-secondary">{director.name} {director.lastName}</span>
                ))
              }
              <br></br>
              <Link to={`/movie/${movie.id}`} style={linkStyle} className="badge bg-primary my-2">Ver</Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}