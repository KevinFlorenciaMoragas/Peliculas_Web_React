import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function LikeButton(props) {
    const [state, setState] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const propertyName = props.propertyName;
    let [propertyValue, setPropertyValue] = useState(false);

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
                    console.log(res[propertyName]);
                    setState(res);
                    setPropertyValue(res[propertyName]); // Accede directamente a res[propertyName]
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching data');
                console.error(err);
            });
    }, [propertyValue]); // Agrega las props relevantes como dependencias

    const clickButton = () => {
        console.log(propertyValue);
        let newPropertyValue 
        if(propertyValue === false){
            newPropertyValue = true;
        }else{
            newPropertyValue = false;
        }
        console.log(propertyName); 
        const options = {
            method: 'POST',
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                userId: props.userId,
                movieId: props.movieId,
                [propertyName]: newPropertyValue 
            })
        };

        fetch(`${API_URL}/like`, options)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage(`Error updating data`);
                } else {
                    setPropertyValue(propertyValue); // Actualiza propertyValue tras la respuesta exitosa
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
                {propertyValue ? "Unlike" : "Like"} {/* Cambié aquí para usar propertyValue */}
            </button>
        </div>
    );
}