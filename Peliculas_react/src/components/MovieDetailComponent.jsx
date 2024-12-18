import React from 'react';
import CardRelationMovie from '../components/CardRelationMovie';
import LikeButton from '../components/LikeButton';
import fullLikeButton from '../assets/svg/like-full.svg';
import noFullLikeButton from '../assets/svg/like-nofull.svg';
import listCheckButton from '../assets/svg/list-check.svg';
import noListCheckButton from '../assets/svg/list-cross.svg';
import movieFullButton from '../assets/svg/movie-full.svg';
import movieNoFullButton from '../assets/svg/movie-nofull.svg';
import GenreSpan from '../components/GenreSpan';
import PersonCard from './PersonCard';
import Image from './Image';
import './MovieDetailComponent.css'
export default function MovieDetailComponent({ movie, userId, movieId }) {
    
    const imgStyle = {
        width: '100%',
        height: 'auto'
    };

    return (
        <section className='container-fluid'>
            <div className='row d-flex flex-row justify-content-between align-items-center'>
                <h2 className='py-2 col-md-8'>{movie.movieName}</h2>

            </div>

            <article className='row'>
                <div className='col-md-6'>
                    <Image src={movie.banner} alt={movie.movieName} imgStyle={imgStyle} />
                </div>
                <div className='col-md-6'>
                    <div className='d-flex flex-column'>
                        <span className='py-2'>{movie.synopsis}</span>
                        <div className='d-flex flex-row align-items-center justify-content-between'>
                            <div>
                                {movie.genres && movie.genres.map((genre, index) => (
                                    <GenreSpan key={index} genre={genre.name} className={"badge bg-primary my-1 me-1"} />
                                ))}
                            </div>
                            <div className='d-flex flex-row justify-content-start py-2 likeButtonSection'>
                                <LikeButton className="likeButton" userId={userId} movieId={movie.id} propertyName={"like"} fullButton={fullLikeButton} noFullButton={noFullLikeButton} />
                                <LikeButton className="likeButton" userId={userId} movieId={movie.id} propertyName={"watched"} fullButton={movieFullButton} noFullButton={movieNoFullButton} />
                                <LikeButton className="likeButton" userId={userId} movieId={movie.id} propertyName={"toSee"} fullButton={listCheckButton} noFullButton={noListCheckButton} />
                            </div>
                        </div>
                        <p className='col-md-4'>{`Release Date: ${movie.releaseDate}  Duration: ${movie.duration} min`}</p>
                    </div>
                    <section className='my-3 d-flex flex-column'>
                        <div className='d-flex justify-content-between'>
                            <div className='flex-fill'>
                                <h4>Director</h4>
                                <div className='d-flex flex-wrap'>
                                    {movie.directors && movie.directors.length > 0 ? movie.directors.map((director, index) => (
                                        <PersonCard key={index} person={director} />
                                    )) : <p>Without director available</p>}
                                </div>
                            </div>
                            <div className='flex-fill'>
                                <h4>Cast</h4>
                                <div className='d-flex flex-wrap'>
                                    {movie.actors && movie.actors.length > 0 ? movie.actors.map((actor, index) => (
                                        <PersonCard key={index} person={actor} />
                                    )) : <p>Without cast available</p>}
                                </div>
                            </div>
                            <div className='flex-fill'>
                                <h4>Screenwritters</h4>
                                <div className='d-flex flex-wrap'>
                                    {movie.screenwritters && movie.screenwritters.length > 0 ? movie.screenwritters.map((screenwriter, index) => (
                                        <PersonCard key={index} person={screenwriter} />
                                    )) : <p>Without screenwritters available</p>}
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </article>

            <section className='my-3'>
                <h3>Trailer</h3>
                {/* <YoutubeVideos trailer={movie.trailer} /> */}
            </section>
            <section className='my-2'>
                <h3>Related Movies</h3>
                <div className='row'>
                    {movie.genres && movie.genres.map((genre) => (
                        <CardRelationMovie key={genre.id} genreId={genre.id} movieId={movieId} />
                    ))}
                </div>
            </section>
        </section>
    )
}
