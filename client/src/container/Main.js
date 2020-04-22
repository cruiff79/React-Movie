import React from 'react';
import MainVideo from '../components/MainVideo';
import {Container, Carousel} from 'react-bootstrap';
import mainImage1 from '../images/main-image1.jpg';
import mainImage2 from '../images/main-image2.jpg';
import mainImage3 from '../images/main-image3.jpg';

class Main extends React.Component {
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
                    <MainVideo title='popular' getVideoInfo={this.getVideoInfo} />
                    <MainVideo title='topRated' getVideoInfo={this.getVideoInfo} />
                </Container>
            </div>
        );
    }
}

export default Main;