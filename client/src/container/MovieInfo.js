import React from 'react';
import Header from '../components/Header';
import {Image} from 'react-bootstrap';
import Player from '../images/player.png';
import ReactPlayer from 'react-player'

class MovieInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: ''
        };
    }

    componentDidMount() {
        this.callMovieDetail(this.props.id)
          .then(res => this.setState({movies: res}))
          .catch(err => console.log(err));
    }

    callMovieDetail = async (id) => {
        const url = '/api/movie/' + id;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    render() {
        return (
            <div>
                <Header />
                <div className="movie-detail">
                    {this.state.movies ?
                        this.state.movies.map(item => {
                            return (
                                <div className="container" key={item.id}>
                                    <div className="row">
                                        <div className="col-4">
                                            <div className="card">
                                                <Image src={item.poster} rounded className="poster-detail" />
                                            </div>
                                        </div>
                                        <div className="col-8">
                                            <div className="card-body">
                                                <h2 className="card-title">{item.title}</h2>
                                                <p className="card-text">{item.released}</p>
                                                <p className="card-text">{item.runtime}</p>
                                                <p className="card-text">{item.writer}</p>
                                                <p className="card-text">{item.rating}/10</p>
                                                <p className="card-text">{item.genre}</p>
                                                <p className="card-text"><a href="http://www.youtube.com" target="_blank"><Image src={Player} rounded className="player" /> Play Trailer</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    : 'no movie'
                    }
                </div>
                <div>
                    {this.state.movies ?
                            this.state.movies.map(item => {
                                return (
                                    <div className="container" key={item.id}>  
                                        <div className="row"> 
                                            <div className="col-6">
                                                <div className="card-body">
                                                    <h3>Overview</h3>
                                                    <p className="card-text">{item.description}</p>
                                                </div>
                                            </div>
                                            <div className="col-6">
                                                <div className="card-body">
                                                    <h3>Cast</h3>
                                                    <p className="card-text">{item.actors}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <ReactPlayer url='https://www.youtube.com/watch?v=7C2z4GqqS5E' controls/>
                                    </div>
                                );
                            })
                        : ''
                        }
                </div>
            </div>
        );
    }
}

export default MovieInfo;