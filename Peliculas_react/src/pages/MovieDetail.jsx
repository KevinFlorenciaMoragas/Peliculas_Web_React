import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from 'react-bootstrap/esm/Tabs';
import CardRelationMovie from '../components/CardRelationMovie';
import LikeButton from '../components/LikeButton';
import fullLikeButton from '../assets/svg/like-full.svg';
import noFullLikeButton from '../assets/svg/like-nofull.svg';
import listCheckButton from '../assets/svg/list-check.svg';
import noListCheckButton from '../assets/svg/list-cross.svg';
import movieFullButton from '../assets/svg/movie-full.svg';
import movieNoFullButton from '../assets/svg/movie-nofull.svg';
import { useAuth } from '../context/AuthContext';
import YoutubeVideos from '../components/YoutubeVideos';
const API_URL = import.meta.env.VITE_API_URL;

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const { userId } = useAuth();

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
    width: '100%',
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
              <section className='col-12 col-md-5 col-lg-4 d-flex flex-row'>
                <LikeButton userId={userId} movieId={movie.id} propertyName={"like"} fullButton={fullLikeButton} noFullButton={noFullLikeButton} />
                <LikeButton userId={userId} movieId={movie.id} propertyName={"watched"} fullButton={movieFullButton} noFullButton={movieNoFullButton} />
                <LikeButton userId={userId} movieId={movie.id} propertyName={"toSee"} fullButton={listCheckButton} noFullButton={noListCheckButton} />
              </section>
            </div>
          </article>
          <section className='col-12 col-md-5 col-lg-4 p-3'>
            <h3>Director</h3>
            {movie.directors && movie.directors.length > 0 ? (
              movie.directors.map((director, index) => (
                <span key={index}> {director.name} {director.lastName} </span>
              ))
            ) : (
              <span>Sin directores disponibles</span>
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
                movie.screenwritters.map((screenwriter, index) => (
                  <span key={index}> {screenwriter.name} {screenwriter.lastName} </span>
                ))
              ) : (
                <span>Sin escritores disponibles</span>
              )}
            </div>
          </section>
          <section className='col-12 col-md-5 col-lg-4'>
            <h3>Trailer</h3>
             <YoutubeVideos trailer={movie.trailer}></YoutubeVideos> 
          </section>
          <section className=''>
            {
              movie.genres && movie.genres.map((genre) => (
                <CardRelationMovie key={genre.id} genreId={genre.id} movieId={id} />
              ))
            }
          </section>
        </section>
      </Tab>
      <Tab eventKey="Comments" title="Comentario">

      </Tab>
    </Tabs>
  );
}
