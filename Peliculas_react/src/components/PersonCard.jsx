import React from 'react';
import Image from './Image';

export default function PersonCard({ person }) {
    const imgStyle = {
        width: '100px',
        height: 'auto',
        objectFit: 'cover',
        borderRadius: '5%',
        marginBottom: '10px', 
    };
    
    const cardStyle = {
        width: '100px',
        height: '200px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
    };

    const nameStyle = {
        whiteSpace: 'nowrap', 
        overflow: 'hidden',    
        textOverflow: 'ellipsis',
        width: '100%', 
    };

    return (
        <div style={cardStyle} className='me-2'>
            <Image src={person.photo} alt={person.name } imgStyle={imgStyle} />
            <p style={nameStyle}>{person.name} {person.lastName}</p>
        </div>
    );
}