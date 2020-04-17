import React from 'react';
import Header from '../components/Header';
import MovieList from '../components/MovieList';
import {Container, Row, Col} from 'react-bootstrap';

class MovieHome extends React.Component {
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

    getMovieId = (id) => {
        this.props.handleMovieId(id);
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
                                            getMovieId={this.getMovieId}
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

export default MovieHome;