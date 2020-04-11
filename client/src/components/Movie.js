import React from 'react';

class Movie extends React.Component {
    render() {
        return (
            <div>
                <a href=""><img src={this.props.poster} alt="Poster" style={{width:128, height:192}}/></a>
                <h4>{this.props.title}</h4>
                {this.props.year}
            </div>
        );
    }
}

export default Movie;