import React from 'react';
import VideoList from './VideoList';
import {Row, Col, Nav} from 'react-bootstrap';

class MainVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          videos: '',
          type: 'movie'
        };
    }

    componentDidMount() {
        this.handleVideo(this.state.type);
    }

    shouldComponentUpdate(nextProps, nextState) {
        if(this.state.type !== nextState.type) {
            this.handleVideo(nextState.type);
        }
        return true;
    }

    handleVideo = (type) => {
        this.callVideos(type)
          .then(res => this.setState({videos: res}))
          .catch(err => console.log(err));
    }

    callVideos = async (type) => {
        let url = `/api/video/${this.props.title}/${type}`;
        const response = await fetch(url);
        const body = await response.json();
        return body;
    }

    getVideoInfo = (id, title) => {
        this.props.getVideoInfo(id, title);
    }

    render() {
        let subTitle = 'Popular';
        if(this.props.title === 'topRated') subTitle = 'Top Rated';
        return (
            <div>
                <Nav className="subTitle" variant="pills" defaultActiveKey="#movie">
                    <Nav.Item className="navItem">
                        <h3>{subTitle}</h3>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#movie" onClick={() => {this.setState({type: 'movie'});}}>Movie</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#tv" onClick={() => {this.setState({type: 'tv'});}}>TV</Nav.Link>
                    </Nav.Item>
                </Nav>
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
            </div>
        );
    }
}

export default MainVideo;