import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
export default function CarouselMovie({ movies }) {

    const imgStyle = {
        width: '100%',
        height: 'auto'
    }
    return (
        <>
            <Carousel fade>
                {
                    movies.map((movie, index) => {
                        return (
                            <Carousel.Item>
                                <img src={movie.banner} style={imgStyle}  className='img-fluid'/>
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
