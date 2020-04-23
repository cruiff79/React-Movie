import React from 'react';
import VideoList from '../components/VideoList';
import {Container, Row} from 'react-bootstrap';

class VideoHome extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          videos: ''
        };
    }

    componentDidMount() {
        this.callVideos()
          .then(res => this.setState({videos: res}))
          .catch(err => console.log(err));
    }

    callVideos = async () => {
        const response = await fetch('/api/video/type/' + this.props.types);
        const body = await response.json();
        return body;
    }

    getVideoInfo = (id, title) => {
        this.props.handleVideoInfo(id, title);
    }

    render() {
        return (
            <div>
                <Container>
                    <Row className="show-grid">
                        {this.state.videos ?
                            this.state.videos.map(item => {
                                return (
                                    <div className="movie-list">
                                        <VideoList
                                            types={item.type}
                                            getVideoInfo={this.getVideoInfo}
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            poster={item.poster}
                                            year={item.year}
                                            rating={item.imdbRating}
                                        />
                                    </div>
                                );
                            })
                        : ''
                        }
                    </Row>
                </Container>
            </div>
        );
    }
}

export default VideoHome;