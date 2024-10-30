import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
const API_URL = import.meta.env.VITE_API_URL;
export default function CommentsComponent({ comments, onNewComment, movieId, userId }) {
  const { user } = useAuth();
  const [inputComment, setInputComment] = useState("");

  const spanTitle = {
    color: '#CECECE',
    fontWeight: 'bold',
  };

  const commentStyle = {
    backgroundColor: '#1C1C1C',
    color: '#E8E9F3',
    padding: '10px',
    borderRadius: '10px',
    margin: '10px 0',
  };

  const alertStyle = {
    backgroundColor: '#1C1C1C',
    color: '#E8E9F3',
    fontSize: '1em',
    padding: '10px',
    borderRadius: '10px',
    display: 'flex',
    justifyContent: 'center',
    marginTop: '1em',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const comment = {
      comment: inputComment,
        movieId: movieId,
        userId: userId
    };

    fetch(`${API_URL}comment`, {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment),
    })
      .then(res => res.json())
      .then(data => {
        if (!data.error) {
          onNewComment(data);
          setInputComment("");
        }
      })
      .catch(() => {
        console.log('Error al enviar el comentario');
      });
  };

  return (
    <>
      <section className='d-flex flex-column justify-content-center align-items-center'>
        <article className='col-12 col-md-6 col-lg-6'>
          {comments && comments.length > 0 ? (
            comments.map((comment) => (
              <div className='my-2' style={commentStyle} key={comment.id}>
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
          {user ? (
            <form onSubmit={handleSubmit}>
              <div className='my-3'>
                <label htmlFor='comment' className='form-label' style={spanTitle}>Comentario</label>
                <textarea className='form-control' id='comment' rows='3' value={inputComment} onChange={(e) => setInputComment(e.target.value)}></textarea>
              </div>
              <button type='submit' className='btn btn-secondary'>Enviar</button>
            </form>
          ) : (
            <span style={alertStyle}>Inicia sesión para poder comentar</span>
          )}
        </div>
      </section>
    </>
  );
}