import React from 'react'

export default function YoutubeVideos(props) {
    const getVideoId = (url) => {
        const regex = /[?&]v=([^&#]*)/;
        const matches = url.match(regex);
        return matches ? matches[1] : null;
    };
    return (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden' }}>
            <iframe
                src={`https://www.youtube.com/embed/${getVideoId(props.trailer)}`}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
                frameBorder="0"
                allowFullScreen
                title="YouTube Video"
            />
        </div>
    );
}
