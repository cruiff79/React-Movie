import React from 'react';
import VideoList from '../components/VideoList';
import {Container, Row, Col, Carousel, Nav} from 'react-bootstrap';
import mainImage1 from '../images/main-image1.jpg';
import mainImage2 from '../images/main-image2.jpg';
import mainImage3 from '../images/main-image3.jpg';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          popular: '',
          topRated: ''
        };
    }

    componentDidMount() {
        this.callPopular()
          .then(res => this.setState({popular: res}))
          .catch(err => console.log(err));

        this.callTopRated()
          .then(res => this.setState({topRated: res}))
          .catch(err => console.log(err));
    }

    callPopular = async () => {
        // const response = await fetch('/api/video/popular/' + this.props.types);
        const response = await fetch('/api/video/popular/movie');
        const body = await response.json();
        return body;
    }

    callTopRated = async () => {
        // const response = await fetch('/api/video/topRated/' + this.props.types);
        const response = await fetch('/api/video/topRated/movie');
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
                    <Carousel>
                        <Carousel.Item>
                            <img className="d-block w-100" src={mainImage1} alt="First slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={mainImage2} alt="Third slide" />
                        </Carousel.Item>
                        <Carousel.Item>
                            <img className="d-block w-100" src={mainImage3} alt="Third slide" />
                        </Carousel.Item>
                    </Carousel>
                    <Nav className="subTitle" variant="pills" defaultActiveKey="#first">
                        <Nav.Item className="navItem">
                            <h3>Popular</h3>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first">Movie</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">TV</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Row className="show-grid movie-list">
                        {this.state.popular ?
                            this.state.popular.map(item => {
                                return (
                                    <Col>
                                        <VideoList
                                            types={item.type}
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
                    <Nav className="subTitle" variant="pills" defaultActiveKey="#first">
                        <Nav.Item className="navItem">
                            <h3>Top Rated</h3>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#first">Movie</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="#link">TV</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Row className="show-grid movie-list">
                        {this.state.topRated ?
                            this.state.topRated.map(item => {
                                return (
                                    <Col>
                                        <VideoList
                                            types={item.type}
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
            </div>
        );
    }
}

export default Main;