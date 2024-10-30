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
import GenreSpan from '../components/GenreSpan';
const API_URL = import.meta.env.VITE_API_URL;

export default function MovieDetail() {

  const {user, logout, role} = useAuth()

  const [movie, setMovie] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [comments, setComments] = useState([]);
  const [inputComment, setInputComment] = useState("");
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
      getComments();
    
  }, [id]);
  const getComments = () => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    };
    fetch(`${API_URL}comment/${id}`, options)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Datos no correctos");
        } else {
          setComments(res);
          console.log(res);
        }
      });
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      comment: inputComment,
      movieId: id,
      userId: userId
    };
    
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(comment)
    };
    
    fetch(`${API_URL}comment`, options)
      .then(res => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Datos no correctos");
        } else {
          setComments((prevComments) => [...prevComments, res]);
          setInputComment("");
          getComments();
        }
      })
      .catch(() => {
        setErrorMessage("Fallo al enviar el comentario");
      });
  }
  const spanTitle ={
    color: '#CECECE',
    fontWeight:'bold',
  }
  const spanText ={
    color: '#E8E9F3',
  }

  const imgStyle = {
    width: '30%',
    height: 'auto'
  };
  const commentStyle = {
    backgroundColor: '#1C1C1C',
    color: '#E8E9F3',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0'
  };
  const alertStyle = {
    backgroundColor: '#1C1C1C',
    color: '#E8E9F3',
    fontSize: '2em',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    marginTop:'3em'
  }
  if (movie == null || comments == null) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Tabs>
      <Tab eventKey="Info Pelicula" title="Película">
        <section className='container'>
          <h2 className='py-2 text-center'>{movie.movieName}</h2>
          <span className='py-1 text-center d-block'>Año {movie.releaseDate} | Duración {movie.duration} min</span>
          <img className='img-fluid' src={movie.banner} alt={`${movie.movieName} banner`} style={{ width: '100%', height: 'auto' }} />          <article className='row p-3'>
            <div className='col-md-4 d-none d-md-block'>
              <img className='img-fluid' src={movie.poster} style={imgStyle} alt={`${movie.movieName} poster`} />
            </div>
            <div className='col-md-8'>
              <div className='d-flex flex-column align-items-start'>
                <div className='d-flex flex-wrap'>
                  {movie.genres && movie.genres.map((genre, index) => (
                    <GenreSpan key={index} genre={genre.name} className={"badge bg-primary my-1 me-1"} />
                  ))}
                </div>
                <p className='py-2'>{movie.synopsis}</p>
                <div className='d-flex flex-row justify-content-start py-2'>
                  <LikeButton userId={userId} movieId={movie.id} propertyName={"like"} fullButton={fullLikeButton} noFullButton={noFullLikeButton} />
                  <LikeButton userId={userId} movieId={movie.id} propertyName={"watched"} fullButton={movieFullButton} noFullButton={movieNoFullButton} />
                  <LikeButton userId={userId} movieId={movie.id} propertyName={"toSee"} fullButton={listCheckButton} noFullButton={noListCheckButton} />
                </div>
              </div>
            </div>
          </article>
          <section className='row my-3'>
            <div className='col-md-4'>
              <h4>Director</h4>
              <p>{movie.directors && movie.directors.length > 0 ? movie.directors.map((director, index) => (
                <span key={index}>{director.name} {director.lastName}{index < movie.directors.length - 1 ? ', ' : ''}</span>
              )) : "Sin directores disponibles"}</p>
            </div>
            <div className='col-md-4'>
              <h4>Reparto</h4>
              <p>{movie.actors && movie.actors.length > 0 ? movie.actors.map((actor, index) => (
                <span key={index}>{actor.name} {actor.lastName}{index < movie.actors.length - 1 ? ', ' : ''}</span>
              )) : "Sin reparto disponibles"}</p>
            </div>
            <div className='col-md-4'>
              <h4>Escritores</h4>
              <p>{movie.screenwritters && movie.screenwritters.length > 0 ? movie.screenwritters.map((screenwriter, index) => (
                <span key={index}>{screenwriter.name} {screenwriter.lastName}{index < movie.screenwritters.length - 1 ? ', ' : ''}</span>
              )) : "Sin escritores disponibles"}</p>
            </div>
          </section>
          <section className='my-3'>
            <h3>Trailer</h3>
            <YoutubeVideos trailer={movie.trailer} />
          </section>
          <section className='my-2'>
            <h3>Películas Relacionadas</h3>
            {movie.genres && movie.genres.map((genre) => (
              <CardRelationMovie key={genre.id} genreId={genre.id} movieId={id} />
            ))}
          </section>
        </section>
      </Tab>
      <Tab eventKey="Comments" title="Comentario">
        <section className='d-flex flex-column justify-content-center align-items-center'>
          <article className='col-12 col-md-6 col-lg-6'>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div className='my-2 ' style={commentStyle} key={comment.id}>
                {comment.user && comment.user.username ? <h4>{comment.user.username}</h4> : <h4>Usuario eliminado</h4>}
                <p>{comment.comment}</p>
              </div>
            ))
          ) : (
            <span>Sin comentarios</span>
          )}
          </article>
        </section>
        <section className='row d-flex justify-content-center'>
          <div className='col-12 col-md-6 col-lg-6'>
            {
              user ? (<form onSubmit={handleSubmit}>
              <div className='my-3'>
                <label htmlFor='comment' className='form-label' style={spanTitle}>Comentario</label>
                <textarea className='form-control' id='comment' rows='3' onChange={(e) => setInputComment(e.target.value)}></textarea>
              </div>
              <button type='submit' className='btn btn-secondary'>Enviar</button>
            </form> )
            : (<span style={alertStyle}>Inicia sesión para poder comentar</span>)
            }
            
          </div>
        </section>
      </Tab>
    </Tabs>
  );
}