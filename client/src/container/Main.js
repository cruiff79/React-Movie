import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import VideoList from '../components/VideoList';
import {Container, Row, Col} from 'react-bootstrap';

class Main extends React.Component {
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
                <Header />
                <Container>
                    <Row className="show-grid movie-list">
                        {this.state.videos ?
                            this.state.videos.map(item => {
                                return (
                                    <Col>
                                        <VideoList
                                            types={this.props.types}
                                            getVideoInfo={this.getVideoInfo}
                                            key={item.id}
                                            id={item.id}
                                            title={item.title}
                                            poster={item.poster}
                                            year={item.year}
                                        />
                                    </Col>
                                );
                            })
                        : ''
                        }
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default Main;