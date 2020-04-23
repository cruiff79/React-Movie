import React from 'react';
import VideoList from '../components/VideoList';
import {Container, Row} from 'react-bootstrap';

class SearchVideo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          videos: ''
        };
    }

    componentDidMount() {
        this.handleSearch(this.props.search);
    }

    shouldComponentUpdate(nextProps) {
        if(this.props.search !== nextProps.search) {
            this.handleSearch(nextProps.search);
        }
        return true;
    }

    handleSearch = (search) => {
        this.searchVideos(search)
            .then(res => this.setState({videos: res}))
            .catch(err => console.log(err));
    }

    searchVideos = async (search) => {
        const response = await fetch('/api/video/search/' + search);
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
                    <div className="subTitle"><h2>Result for: {this.props.search}</h2></div>
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

export default SearchVideo;