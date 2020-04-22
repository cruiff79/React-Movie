import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';

class VideoList extends React.Component {
    setVideoInfo = () => {
        this.props.getVideoInfo(this.props.id, this.props.title);
    }

    render() {
        let title = this.props.title;
        let type = this.props.types;
        console.log('title.length: ', title.length);
        if(title.length > 20) title = title.substring(0,23) + '...'; 
        if(type === 'series') type = 'tv';
        
        return (
            <div>
                <Link to={`/${type}/${this.props.id}`} onClick={this.setVideoInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
                <div className="poster-title">
                    {title}
                </div>
                <div className="poster-year">
                    {this.props.year}
                </div>
            </div>
        );
    }
}

export default VideoList;