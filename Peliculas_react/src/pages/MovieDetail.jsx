import { Tab } from 'bootstrap/dist/js/bootstrap.bundle.min';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Tabs from 'react-bootstrap/esm/Tabs';
import { useAuth } from '../context/AuthContext';
import CommentsComponent from '../components/CommentsComponent';
import MovieDetailComponent from '../components/MovieDetailComponent';
import LoadingPage from './LoadingPage';
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
    <LoadingPage></LoadingPage>
  }

  return (
    <Tabs>
      <Tab eventKey="Movie" title="Movie">
        <MovieDetailComponent movie={movie} userId={userId} movieId={id} />
      </Tab>
      <Tab eventKey="Comments" title="Comments">
        <CommentsComponent comments={comments} userId={userId} movieId={id} onNewComment={handleNewComment} />
      </Tab>
    </Tabs>
  );
}