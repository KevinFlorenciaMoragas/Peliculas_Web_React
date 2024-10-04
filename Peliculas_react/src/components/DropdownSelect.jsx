import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

export default function DropdownSelect({ endpoint, index, onChange }) {
    const [dropdownGet, setDropdownGet] = useState([]);
    const [selected, setSelected] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        fetch(`${API_URL}${endpoint}`)
            .then((res) => res.json())
            .then(res => {
                if (res.error) {
                    setErrorMessage(`Error fetching ${endpoint}`);
                } else {
                    setDropdownGet(res);
                }
            })
            .catch((err) => {
                setErrorMessage('Error fetching data');
                console.log(err);
            });
    }, [endpoint]);

    const handleSelectChange = (e) => {
        const value = e.target.value;
        setSelected(value);
        onChange(index, value); // Llama a la función onChange pasada desde el componente padre
    };

    return (
        <>
            <select className='form-select' value={selected} onChange={handleSelectChange}>
                <option value="">Select an Actor</option>
                {dropdownGet.map((item) => (
                    <option key={item.id} value={item.name}>{item.name}</option>
                ))}
            </select>
            {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
        </>
    );
}