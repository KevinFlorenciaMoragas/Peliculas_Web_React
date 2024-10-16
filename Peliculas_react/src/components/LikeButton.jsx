import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function LikeButton(props) {
    const [state, setState] = useState({});
    const [errorMessage, setErrorMessage] = useState("");
    const propertyName = props.propertyName;
    let [propertyValue, setPropertyValue] = useState(false);
    const buttonStyle = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: 'pointer',
        height: '2em',
        width: '2em'
        
    };
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
                    setState(res);
                    setPropertyValue(res[propertyName]); 
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching data');
                console.error(err);
            });
    }, [propertyValue]);

    const clickButton = () => {
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

        fetch(`${API_URL}/${props.propertyName}`, options)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage(`Error updating data`);
                } else {
                    setPropertyValue(newPropertyValue); 
                }
            })
            .catch((err) => {
                setErrorMessage('Error updating data');
                console.error(err);
            });
    };

    return (
            <button style={buttonStyle} onClick={clickButton}>
                <img className='img-fluid' src={propertyValue ? props.fullButton : props.noFullButton} alt="Like button" />
            </button>
        
    );
}