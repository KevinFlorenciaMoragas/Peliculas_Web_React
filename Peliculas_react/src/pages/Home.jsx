import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import GenreSpan from '../components/GenreSpan';
import './Home.css'

import CarouselMovie from '../components/CarouselMovie';
const API_URL = import.meta.env.VITE_API_URL;
export default function Home() {
  const [count, setCount] = useState(0)
  const [random, setRandom] = useState(0)
  const [movies, setMovies] = useState([])
  useEffect(() => {
    const options = {
      method: 'GET',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      }
    };

    fetch(`${API_URL}/movie`, options)
      .then(res => res.json())
      .then(res => {
        setCount(res.length)
        console.log(count)
        setRandom(Math.floor(Math.random() * count))
        setMovies(res)
        console.log(res)
      })
  }, [])

  if (movies.length === 0) {
    return <h1>Cargando...</h1>;
  }
  return (
    <>
      <section className=' row py-5'>
        <div className=' d-flex justify-content-center'>
          <article className='col-12 col-lg-5 main p-5'>
            <div className='d-flex align-items-start'>
              <div className='d-flex flex-column'>
                {random !== null && movies[random] && (
                  <>
                    <h3>{movies[random].movieName}</h3>
                    {
                      movies[random].directors.map((director, index) => (<span key={index}> {director.name} {director.lastName} </span>))
                    }
                    <p className='py-2'>{movies[random].synopsis}</p>

                    <div>
                      {
                        movies[random].actors.map((actor, index) => (<span className='me-2 actor' key={index}> {actor.name} {actor.lastName}</span>))
                      }
                    </div>

                    {
                      movies[random].genres.map((genre, index) => (
                        <div className=''><GenreSpan genre={genre.name} className={"badge bg-primary col-4 col-md-3 my-2"} />
                        </div>))
                    }
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
      <section className='row'>
        <CarouselMovie movies = {movies}></CarouselMovie>
      </section>
    </>
  )
}
