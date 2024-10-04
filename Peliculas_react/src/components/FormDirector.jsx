import React, { useState } from 'react'
import InputLabel from './InputLabel'

const API_URL = import.meta.env.VITE_API_URL;
export default function FormDirector() {
  const date = new Date();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [photo, setPhoto] = useState("");
  const [biography, setBiography] = useState("");
  const [birthPlace, setBirthPlace] = useState("");
  const [birthDate, setBirthDate] = useState(date.toISOString().split("T")[0]);
  const [errorMessage, setErrorMessage] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const credentials = {
      name,
      lastName,
      photo,
      biography,
      birthPlace,
      birthDate
    };
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(credentials)
    };
    fetch(API_URL + "director", options)
      .then((res) => res.json())
      .then(res => {
        if (res.error) {
          setErrorMessage("Error creating director");
        } else {
            setErrorMessage("Director created successfully");
          console.log(res);
        }
      })
      .catch((err) => { setErrorMessage('Error creating director')
        console.log(err);   
       });
    }
  

  return (
    <>
      <form onSubmit={handleSubmit}>
        <InputLabel
          labelFor="name"
          label="Director Name"
          inputType="text"
          inputId="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputLabel
          labelFor="lastName"
          label="Last Name"
          inputType="text"
          inputId="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputLabel
          labelFor="photo"
          label="Photo URL"
          inputType="text"
          inputId="photo"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
        />
        <InputLabel
          labelFor="biography"
          label="Biography"
          inputType="textarea"
          inputId="biography"
          value={biography}
          onChange={(e) => setBiography(e.target.value)}
        />
        <InputLabel
          labelFor="birthPlace"
          label="Birth Place"
          inputType="text"
          inputId="birthPlace"
          value={birthPlace}
          onChange={(e) => setBirthPlace(e.target.value)}
        />
        <InputLabel
          labelFor="birthDate"
          label="Birth Date"
          inputType="date"
          inputId="birthDate"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </>
  );
}