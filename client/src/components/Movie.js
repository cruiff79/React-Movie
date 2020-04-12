import React from 'react';

class Movie extends React.Component {      
    render() {
        const { classes } = this.props;
        return (
            <div className="grid_poster">
                <a href=""><img src={this.props.poster} alt="Poster" className="poster" /></a>
                <strong>{this.props.title}</strong><br/>
                {this.props.year}
            </div>
        );
    }
}

export default Movie;