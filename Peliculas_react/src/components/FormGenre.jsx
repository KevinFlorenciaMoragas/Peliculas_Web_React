import React, { useState } from 'react'
import InputLabel from './InputLabel'

const API_URL = import.meta.env.VITE_API_URL;
export default function FormGenre() {
    const [genre, setGenre] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        const credentials = {
            genre
        };
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        };
        fetch(API_URL + "genre", options)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage("Error creating genre");
                } else {
                    setErrorMessage("Genre created successfully");
                    console.log(res);
                }
            })
            .catch((err) => {
                setErrorMessage('Error creating genre')
                console.log(err);
            });
    }


    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputLabel
                    labelFor="genre"
                    label="Genre Name"
                    inputType="text"
                    inputId="genre"
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                />

                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}