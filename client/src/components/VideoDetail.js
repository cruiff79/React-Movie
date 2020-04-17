import React from 'react';

const VideoDetail = ({video}) => {
    if (!video) {
        return <div>Loading ...</div>;
    }

    const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;
    console.log(typeof(video));
    return (
        <div>
            <div className='ui embed'>
                <div className="container">  
                    <div className="row"> 
                        <div className="col-12">
                            <iframe src={videoSrc} allowFullScreen title='Video player' width="100%" height="500"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default VideoDetail;