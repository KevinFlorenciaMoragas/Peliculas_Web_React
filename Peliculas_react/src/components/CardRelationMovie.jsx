import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Image from './Image';
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
  const cardTitleStyle = {
    fontSize: "1.1rem",
    fontWeight: "bold",
  }
  const imageStyle = {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    objectPosition: 'top',
    borderRadius: '10px',
    cover: 'no-repeat',
  }
  const cardStyle = {
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    overflow: 'hidden',
    backgroundColor: '#3B3B40'
  }
  return (
    <>
    {relationMovies.map((movie) => (
      <div className="col-6 col-md-4 col-lg-3 mb-4" key={movie.id}>
        <div className="p-2" style={cardStyle}>
          <Image src={movie.poster} alt={movie.movieName} imgStyle={imageStyle} />
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
            <h5 style={cardTitleStyle} className="py-1">{movie.movieName}</h5>
            <span className="badge bg-primary">{movie.releaseDate}</span>
            </div>
            <div className='d-flex align-items-center justify-content-between'>
            {movie.directors.map((director, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {director.name} {director.lastName}
              </span>
            ))}
            <Link to={`/movie/${movie.id}`} style={linkStyle} className="badge bg-primary my-2">Ver</Link>
            </div>
          </div>
        </div>
      </div>
    ))}
  </>
  );
}