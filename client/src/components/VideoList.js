import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';

class VideoList extends React.Component {
    setVideoInfo = () => {
        this.props.getVideoInfo(this.props.id, this.props.title);
    }

    render() {
        return (
            <div>
                <Link to={`/${this.props.types}/${this.props.id}`} onClick={this.setVideoInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
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