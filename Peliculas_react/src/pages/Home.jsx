import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import GenreSpan from '../components/GenreSpan';
import './Home.css';
import CarouselMovie from '../components/CarouselMovie';
import PersonCard from '../components/PersonCard';
const API_URL = import.meta.env.VITE_API_URL;

export default function Home() {
  const [order, setOrder] = useState("movieName");
  const [movies, setMovies] = useState([]);
  const [random, setRandom] = useState(null);

  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch(`${API_URL}movie/order/${order}`, options)
      .then(res => res.json())
      .then(res => {
        setMovies(res);
        if (res.length > 0) {
          setRandom(Math.floor(Math.random() * res.length));
        }
      })
      .catch(err => {
        console.error("Error fetching movies:", err);
      });
  }, [order]);

  if (movies.length === 0) {
    return <h1>Cargando...</h1>;
  }

  return (
    <>
      <section className='row py-5'>
        <div className='d-flex justify-content-center'>
          <article className='col-12 col-lg-7 main p-5'>
            <div className='d-flex align-items-start'>
              <div className='d-flex flex-column'>
                {random !== null && movies[random] && (
                  <>
                    <h3>{movies[random].movieName}</h3>
                    <section className='d-flex flex-row'>
                    <strong className='me-2'>Director: </strong>
                    {movies[random].directors.map((director, index) => (
                      <span key={index}> {director.name} {director.lastName} </span>
                    ))}
                    </section>
                    <p className='py-2'>{movies[random].synopsis}</p>
                    <div className='d-flex flex-wrap'>
                      {movies[random].actors.map((actor, index) => (
                        <PersonCard key={index} person={actor} />
                      ))}
                    </div>
                    <section className='d-flex flex-row'>
                    {movies[random].genres.map((genre, index) => (
                      
                        <GenreSpan genre={genre.name} className={" badge bg-primary mx-1"} />
                      
                    ))}
                    </section>
                  </>
                )}
              </div>
              <div className='d-none d-md-block col-sm-5'>
                {random !== null && movies[random] && (
                  <img className='img-fluid' src={movies[random].poster} alt={movies[random].title} />
                )}
              </div>
            </div>
          </article>
        </div>
      </section>
      <section className='row d-flex justify-content-center'>
        <CarouselMovie movies={movies} />
      </section>
    </>
  );
}