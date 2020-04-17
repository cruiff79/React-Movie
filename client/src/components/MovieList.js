import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';

class Movie extends React.Component {
    setMovieInfo = () => {
        this.props.getMovieInfo(this.props.id, this.props.title);
    }

    render() {
        return (
            <div>
                <Link to={`/movie/${this.props.id}`} onClick={this.setMovieInfo}><Image src={this.props.poster} rounded className="poster" /></Link>
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

export default Movie;