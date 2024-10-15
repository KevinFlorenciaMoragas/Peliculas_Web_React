import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function LikeButton(props) {
    const [state, setState] = useState(null);
    const [propertyName, setPropertyName] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            }
        };

        fetch(`${API_URL}usermovie/${props.userId}/movie/${props.movieId}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage(`Error fetching data`);
                } else {
                    console.log(res)
                    setState(res);
                    setPropertyName(res.propertyName); 
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching data');
                console.error(err);
            });
    }, [props.userId, props.movieId]); 

    const clickButton = () => {
        const newPropertyValue = propertyName === "false" ? true : false; 
        console.log(newPropertyValue);
        console.log(props.propertyName)
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                userId: props.userId,
                movieId: props.movieId,
                propertyName: newPropertyValue 
            })
        };

        fetch(`${API_URL}/like`, options)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage(`Error updating data`);
                } else {
                    setState(res);
                    setPropertyName(res.propertyName);
                }
            })
            .catch((err) => {
                setErrorMessage('Error updating data');
                console.error(err);
            });
    };

    return (
        <div>
            {errorMessage && <p className="error">{errorMessage}</p>}
            <button onClick={clickButton}>
                {propertyName ? "Unlike" : "Like"}
            </button>
        </div>
    );
}
