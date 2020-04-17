import React from 'react';
import {Link} from "react-router-dom";
import {Image} from 'react-bootstrap';

class Movie extends React.Component {
    setMovieId = () => {
        this.props.getMovieId(this.props.id);
    }

    render() {
        return (
            <div>
                <Link to={`/movie/${this.props.id}`} onClick={this.setMovieId}><Image src={this.props.poster} rounded className="poster" /></Link>
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