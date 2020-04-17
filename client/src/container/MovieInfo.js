import React from 'react';
import Header from '../components/Header';
import {Image} from 'react-bootstrap';
import Player from '../images/player.png';
import Youtube from '../apis/Youtube';
import VideoDetail from '../components/VideoDetail';

class MovieInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: '',
          selectedVideo: null
        };
    }

    componentDidMount() {
        this.callMovieDetail(this.props.id)
          .then(res => this.setState({movies: res}))
          .catch(err => console.log(err));

        this.handleSubmit(this.props.title);
    }

    callMovieDetail = async (id) => {
        const url = '/api/movie/' + id;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    handleSubmit = async (termFromSearchBar) => {
        const response = await Youtube.get('/search', {
            params: {
                q: termFromSearchBar + ' trailer'
            }
        });

        this.setState({
            selectedVideo: response.data.items[0]
        })
    };

    render() {
        return (
            <div>
                <Header />
                <div className="movie-detail">
                    {this.state.movies ?
                        <div className="container" key={this.props.id}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="card">
                                        <Image src={this.state.movies[0].poster} rounded className="poster-detail" />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h2 className="card-title">{this.state.movies[0].title}</h2>
                                        <p className="card-text">{this.state.movies[0].released}</p>
                                        <p className="card-text">{this.state.movies[0].runtime}</p>
                                        <p className="card-text">{this.state.movies[0].writer}</p>
                                        <p className="card-text">{this.state.movies[0].rating}/10</p>
                                        <p className="card-text">{this.state.movies[0].genre}</p>
                                        <p className="card-text"><a href="http://www.youtube.com" target="_blank"><Image src={Player} rounded className="player" /> Play Trailer</a></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : ''
                    }
                </div>
                <div>
                    {this.state.movies ?
                        <div className="container" key={this.props.id}>  
                            <div className="row"> 
                                <div className="col-6">
                                    <div className="card-body">
                                        <h3>Overview</h3>
                                        <p className="card-text">{this.state.movies[0].description}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card-body">
                                        <h3>Cast</h3>
                                        <p className="card-text">{this.state.movies[0].actors}</p>
                                    </div>
                                </div>
                            </div>
                            <VideoDetail video={this.state.selectedVideo}/>
                        </div>
                    : ''
                    }
                </div>
            </div>
        );
    }
}

export default MovieInfo;