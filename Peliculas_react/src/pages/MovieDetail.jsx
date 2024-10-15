import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from 'react-bootstrap/esm/Tabs';
import CardRelationMovie from '../components/CardRelationMovie';

const API_URL = import.meta.env.VITE_API_URL;

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [moviesRelation, setMoviesRelation] = useState({})
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`${API_URL}movie/${id}`, options)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Datos no correctos");
        } else {
          setMovie(res);
          console.log(res);
        }
      })
      .catch(() => {
        setErrorMessage('Fallo al cargar la película');
      });

  }, [id]);

  const imgStyle = {
    width: '20%',
    height: 'auto'
  };

  if (movie == null) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Tabs>
      <Tab eventKey="Info Pelicula" title="Película">
        <section className='row d-flex justify-content-center'>
          <h2 className='pt-2'>{movie.movieName}</h2>
          <span className='pt-2'>Año {movie.releaseDate} | Duración {movie.duration} min</span>
          <img className='img-fluid d-lg-block' src={movie.banner} alt={`${movie.movieName} banner`} />
          <article className='col-12 col-md-5 col-lg-12 p-3 d-flex'>
            <img className='img-fluid' src={movie.poster} style={imgStyle} alt={`${movie.movieName} poster`} />
            <div className='p-2 flex-column'>
              <div className='d-flex'>
                {movie.genres && movie.genres.map((genre, index) => (
                  <span key={index} className='badge bg-primary m-1'>{genre.name}</span>
                ))}
              </div>
              <p>{movie.synopsis}</p>
            </div>
          </article>
          <section className='col-12 col-md-5 col-lg-4 p-3'>
            <h3>Director</h3>
            {movie.directors && movie.directors.length > 0 ? (
              movie.directors.map((directors, index) => (
                <span key={index}> {directors.name} {directors.lastName} </span>
              ))
            ) : (
              <span>Sin actores disponibles</span>
            )}
            <h3>Actores</h3>
            <div>
              {movie.actors && movie.actors.length > 0 ? (
                movie.actors.map((actor, index) => (
                  <span key={index}> {actor.name} {actor.lastName} </span>
                ))
              ) : (
                <span>Sin actores disponibles</span>
              )}
            </div>
            <h3>Escritores</h3>
            <div>
              {movie.screenwritters && movie.screenwritters.length > 0 ? (
                movie.screenwritters.map((screenwritters, index) => (
                  <span key={index}> {screenwritters.name} {screenwritters.lastName} </span>
                ))
              ) : (
                <span>Sin escritores disponibles</span>
              )}
            </div>
          </section>
          <section className='col-12 col-md-5 col-lg-4 p-3'>
            <h3>Trailer</h3>
            <iframe width="100%" height="auto" src={movie.trailer} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </section>
          <section className=''>
            <CardRelationMovie></CardRelationMovie>
          </section>
        </section>
      </Tab>
    </Tabs>
  );
}