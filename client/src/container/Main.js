import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MovieList from '../components/MovieList';
import {Container, Row, Col} from 'react-bootstrap';

class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          movies: ''
        };
    }

    componentDidMount() {
        this.callMovies()
          .then(res => this.setState({movies: res}))
          .catch(err => console.log(err));
    }

    callMovies = async () => {
        const response = await fetch('/api/movie');
        const body = await response.json();
        return body;
    }

    getMovieInfo = (id, title) => {
        this.props.handleMovieInfo(id, title);
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row className="show-grid movie-list">
                        {this.state.movies ?
                            this.state.movies.map(item => {
                                return (
                                    <Col>
                                        <MovieList
                                            getMovieInfo={this.getMovieInfo}
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