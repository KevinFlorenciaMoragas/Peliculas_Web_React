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
    const [synopsis, setSynopsis] = useState("");
    const [poster, setPoster] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [actorsId, setActorsId] = useState([]);
    const [directorId, setDirectorId] = useState([]);
    const [genreId, setGenreId] = useState([]);
    const [screenwritterId, setScreenwritterId] = useState([]);
    const [dropdownActorNumber, setDropdownActorNumber] = useState(1);
    const [dropdownDirectorNumber, setDropdownDirectorNumber] = useState(1);
    const [dropdownScreenwritterNumber, setDropdownScreenwritterNumber] = useState(1);
    const [dropdownGenreNumber, setDropdownGenreNumber] = useState(1);

    const handleActorChange = (index, value) => {
        const newActors = [...actorsId];
        newActors[index] = value; // Actualiza el actor en la posición correspondiente
        setActorsId(newActors);
    };
    const handleDirectorChange = (index, value) => {
        const newDirector = [...directorId];
        newDirector[index] = value;
        setDirectorId(newDirector);
    };
    const handleScreenwritterChange = (index, value) => {
        const newScreenwritter = [...screenwritterId];
        newScreenwritter[index] = value;
        setScreenwritterId(newScreenwritter);
    }
    const handleGenreChange = (index, value) => {
        const newGenre = [...genreId];
        newGenre[index] = value;
        setGenreId(newGenre);
    }

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
            synopsis,
            directorId,
            actorsId,
            screenwritterId,
            genreId
        };

        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(credentials)
        };

        fetch(`${API_URL}/movie`, options)
            .then((res) => {
                if (!res.ok) {
                    // Manejar el código de estado 400 (Bad Request)
                    if (res.status === 400) {
                        return res.json().then(errorData => {
                            throw new Error(errorData.message || "Error creating movie");
                        });
                    }
                    throw new Error("Error creating movie");
                }
                return res.json();
            })
            .then(res => {
                setErrorMessage("Movie created successfully");
                console.log(res);
            })
            .catch((err) => {
                setErrorMessage(err.message); // Muestra el mensaje de error recibido
                console.log(err);
            });
    };

    return (
        <>
            <section className='d-flex justify-content-center align-items-center my-1'>
                <form onSubmit={handleSubmit} className='col-12 col-md-6 col-lg-4'>
                    <InputLabel
                        labelFor="movieName"
                        label="Movie Name"
                        inputType="text"
                        inputId="movieName"
                        value={movieName}
                        onChange={(e) => setMovieName(e.target.value)}
                    />
                    <InputLabel
                        labelFor="synopsis"
                        label="Synopsis"
                        inputType="text"
                        inputId="synopsis"
                        value={synopsis}
                        onChange={(e) => setSynopsis(e.target.value)}
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
                    <div className='col-2'>
                    <input
                        type="number"
                        min="1"
                        className='form-control'
                        value={dropdownActorNumber}
                        onChange={(e) => setDropdownActorNumber(e.target.value)}
                    />
                    </div>
                    {
                        Array.from({ length: dropdownActorNumber }, (_, i) => (
                            <DropdownSelect key={i} index={i} name="Actor" endpoint="actor" onChange={handleActorChange} />
                        ))
                    }
                    <div className='col-2'>
                    <input
                        type="number"
                        min="1"
                        className='form-control'
                        value={dropdownDirectorNumber}
                        onChange={(e) => setDropdownDirectorNumber(e.target.value)}
                    />
                    </div>
                    {
                        Array.from({ length: dropdownDirectorNumber }, (_, i) => (
                            <DropdownSelect key={i} index={i} name="Director" endpoint="director" onChange={handleDirectorChange} />
                        ))
                    }
                    <div className='col-2'> 
                    <input
                        type="number"
                        min="1"
                        className='form-control my-2'
                        value={dropdownScreenwritterNumber}
                        onChange={(e) => setDropdownScreenwritterNumber(e.target.value)}
                    />
                    </div>
                    {
                        Array.from({ length: dropdownScreenwritterNumber }, (_, i) => (
                            <DropdownSelect key={i} index={i} name="Screenwritter" endpoint="screenwritter" onChange={handleScreenwritterChange} />
                        ))
                    }
                    <div className='col-2'>
                        <input
                            type="number"
                            min="1"
                            className='form-control '
                            value={dropdownGenreNumber}
                            onChange={(e) => setDropdownGenreNumber(e.target.value)}
                        />
                    </div>
                    {
                        Array.from({ length: dropdownGenreNumber }, (_, i) => (
                            <DropdownSelect key={i} index={i} name="Genre" endpoint="genre" onChange={handleGenreChange} />
                        ))
                    }

                    {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </section>
        </>
    );
}
