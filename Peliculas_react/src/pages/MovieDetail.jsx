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
import CommentsComponent from '../components/CommentsComponent';
import MovieDetailComponent from '../components/MovieDetailComponent';
const API_URL = import.meta.env.VITE_API_URL;

export default function MovieDetail() {
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
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
    const fetchMovie = async () => {
      const response = await fetch(`${API_URL}movie/${id}`, options);
      const data = await response.json();
      setMovie(data);
    };

    const fetchComments = async () => {
      const response = await fetch(`${API_URL}comment/${id}`, options);
      const data = await response.json();
      setComments(data);
    };

    fetchMovie();
    fetchComments();
  }, [id]);
  const handleNewComment = (newComment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  };


  if (movie == null || comments == null) {
    return <h1>Cargando...</h1>;
  }

  return (
    <Tabs>
      <Tab eventKey="Info Pelicula" title="Película">
        <MovieDetailComponent movie={movie} userId={userId} movieId={id} />
      </Tab>
      <Tab eventKey="Comments" title="Comentario">
        <CommentsComponent comments={comments} userId={userId} movieId={id} onNewComment={handleNewComment} />
      </Tab>
    </Tabs>
  );
}