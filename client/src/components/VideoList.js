import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';

class VideoList extends React.Component {
    setVideoInfo = () => {
        this.props.getVideoInfo(this.props.id, this.props.title);
    }

    render() {
        let type = this.props.types;
        if(type === 'series') type = 'tv';
        return (
            <div>
                <Link to={`/${type}/${this.props.id}`} onClick={this.setVideoInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
                <div className="poster-title">
                    {this.props.title}
                </div>
                <div className="poster-year">
                    {this.props.year}
                </div>
            </div>
        );
    }
}

export default VideoList;