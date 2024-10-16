import React, { useEffect, useState } from 'react';
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

  return (
    <div className="row">
      {relationMovies.map((movie) => (
        <div className="col-12 col-md-4" key={movie.id}>
          <div className="card">
            <img src={movie.poster} className="card-img-top" alt={`${movie.movieName} poster`} />
            <div className="card-body">
              <h5 className="card-title">{movie.movieName}</h5>
              <p className="card-text">{movie.synopsis}</p>
              <a href="#" className="btn btn-primary">Go</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}