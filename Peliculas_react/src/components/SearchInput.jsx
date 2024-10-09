import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const API_URL = import.meta.env.VITE_API_URL;

export default function SearchInput() {
    const [search, setSearch] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const getRelationTitles = async () => {
        event.preventDefault();

    }
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        console.log(search);
        fetch(API_URL + 'movie/movie-name/' + search)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage('Movie not found');
                } else {
                   const id = res.id;
                     navigate(`/movie/${id}`); 
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching movie');
                console.log(err);
            });
    }
    return (
        <form className='d-flex' onSubmit={handleSearchSubmit}>
            <input className='form-control me-2' type='search' placeholder='Buscar' aria-label='Buscar' onChange={(e) => setSearch(e.target.value)} />
            <button className='btn btn-outline-secondary' type='submit'>Buscar</button>
        </form>
    )
}
