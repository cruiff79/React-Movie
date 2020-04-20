import React from 'react';
import {Image} from 'react-bootstrap';
import Youtube from '../apis/Youtube';
import VideoDetail from '../components/VideoDetail';
import calendar from '../images/calendar.png';
import clock from '../images/clock.png';
import director from '../images/director.png';
import genre from '../images/genre.png';
import star from '../images/star.png';
import ReactPlayer from 'react-player';

class VideoInfo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          videos: '',
          selectedVideo: null
        };
    }

    componentDidMount() {
        this.callVideoDetail()
          .then(res => this.setState({videos: res}))
          .catch(err => console.log(err));

        this.handleSubmit(this.props.title);
    }

    callVideoDetail = async () => {
        const url = '/api/video/' + this.props.id;
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
                <div className="movie-detail">
                    {this.state.videos ?
                        <div className="container" key={this.props.id}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="card">
                                        <Image src={this.state.videos[0].poster} rounded className="poster-detail" />
                                    </div>
                                </div>
                                <div className="col-8">
                                    <div className="card-body">
                                        <h2 className="card-title movie-title">{this.state.videos[0].title}</h2>
                                        <p className="card-text"><Image src={calendar} className="movie-info-icon" />&nbsp; {this.state.videos[0].released}</p>
                                        <p className="card-text"><Image src={clock} className="movie-info-icon" />&nbsp; {this.state.videos[0].runtime}</p>
                                        <p className="card-text"><Image src={director} className="movie-info-icon" />&nbsp; {this.state.videos[0].director}</p>
                                        <p className="card-text"><Image src={star} className="movie-info-icon" />&nbsp; {this.state.videos[0].rating}</p>
                                        <p className="card-text"><Image src={genre} className="movie-info-icon" />&nbsp; {this.state.videos[0].genre}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    : ''
                    }
                </div>
                <div>
                    {this.state.videos ?
                        <div className="container" key={this.props.id}>  
                            <div className="row"> 
                                <div className="col-6">
                                    <div className="card-body">
                                        <h3>Overview</h3>
                                        <p className="card-text">{this.state.videos[0].description}</p>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <div className="card-body">
                                        <h3>Cast</h3>
                                        <p className="card-text">{this.state.videos[0].actors}</p>
                                    </div>
                                </div>
                            </div>
                            {this.state.selectedVideo ? <VideoDetail video={this.state.selectedVideo}/> : <ReactPlayer url='https://www.youtube.com/watch?v=9ZfN87gSjvI' width="100%" height="500px" />}
                        </div>
                    : ''
                    }
                </div>
            </div>
        );
    }
}

export default VideoInfo;