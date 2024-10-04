import React, { useState } from 'react';
import DropdownSelect from './DropdownSelect';
import InputLabel from './InputLabel';

const API_URL = import.meta.env.VITE_API_URL;

export default function FormMovie() {
    const [movieName, setMovieName] = useState("");
    const [duration, setDuration] = useState("");
    const [releaseDate, setReleaseDate] = useState("");
    const [score, setScore] = useState("");
    const [banner, setBanner] = useState("");
    const [trailer, setTrailer] = useState("");
    const [poster, setPoster] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [actors, setActors] = useState([]);
    const [dropdownActorNumber, setDropdownActorNumber] = useState(1);

    const handleActorChange = (index, value) => {
        const newActors = [...actors];
        newActors[index] = value; // Actualiza el actor en la posición correspondiente
        setActors(newActors);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const credentials = {
            movieName,
            duration,
            releaseDate,
            score,
            banner,
            trailer,
            poster,
            actors,
        };

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        };

        fetch(`${API_URL}movie`, options)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage("Error creating movie");
                } else {
                    setErrorMessage("Movie created successfully");
                    console.log(res);
                }
            })
            .catch((err) => {
                setErrorMessage('Error creating movie');
                console.log(err);
            });
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <InputLabel
                    labelFor="movieName"
                    label="Movie Name"
                    inputType="text"
                    inputId="movieName"
                    value={movieName}
                    onChange={(e) => setMovieName(e.target.value)}
                />
                <InputLabel
                    labelFor="duration"
                    label="Duration"
                    inputType="text"
                    inputId="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                />
                <InputLabel
                    labelFor="releaseDate"
                    label="Release Date"
                    inputType="text"
                    inputId="releaseDate"
                    value={releaseDate}
                    onChange={(e) => setReleaseDate(e.target.value)}
                />
                <InputLabel
                    labelFor="score"
                    label="Score"
                    inputType="text"
                    inputId="score"
                    value={score}
                    onChange={(e) => setScore(e.target.value)}
                />
                <InputLabel
                    labelFor="banner"
                    label="Banner URL"
                    inputType="text"
                    inputId="banner"
                    value={banner}
                    onChange={(e) => setBanner(e.target.value)}
                />
                <InputLabel
                    labelFor="trailer"
                    label="Trailer URL"
                    inputType="text"
                    inputId="trailer"
                    value={trailer}
                    onChange={(e) => setTrailer(e.target.value)}
                />
                <InputLabel
                    labelFor="poster"
                    label="Poster URL"
                    inputType="text"
                    inputId="poster"
                    value={poster}
                    onChange={(e) => setPoster(e.target.value)}
                />
                <input
                    type="number"
                    min="1"
                    value={dropdownActorNumber}
                    onChange={(e) => setDropdownActorNumber(e.target.value)}
                />
                {
                    Array.from({ length: dropdownActorNumber }, (_, i) => (
                        <DropdownSelect key={i} index={i} endpoint="actor" onChange={handleActorChange} />
                    ))
                }
                {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    );
}
