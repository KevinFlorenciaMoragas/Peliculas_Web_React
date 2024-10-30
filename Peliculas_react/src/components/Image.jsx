
export default function Image({ src, alt, imgStyle }) {
    return (
        <img src={src} alt={alt} style={imgStyle} className='img-fluid' />
    )
}
