import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from './Image';
export default function CarouselMovie({ movies }) {

    const imgStyle = {
        width: '100%',
        height: '400px',
        objectFit: 'cover',
        borderRadius: '10px',
        objectPosition: 'top'
        
    }
    return (
        <>
            <Carousel fade className='col-10'>
                {
                    movies.map((movie, index) => {
                        return (
                            <Carousel.Item>
                                <Image src={movie.banner} alt={movie.movieName} imgStyle={imgStyle}></Image>
                                <Carousel.Caption>
                                    <div style={{backgroundColor: 'rgba(0,0,0,0.5)', padding: '10px', borderRadius: '10px'}}>
                                    <h3>{movie.movieName}</h3>
                                    <p>{movie.synopsis}</p>
                                    </div>
                                </Carousel.Caption>
                            </Carousel.Item>
                        )
                    })
                }
            </Carousel>
        </>
    )
}
