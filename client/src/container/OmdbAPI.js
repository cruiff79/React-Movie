import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { post } from 'axios';
import {Container, Row, Col} from 'react-bootstrap';

class OmdbAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movie: null
        };
    }

    handleValueChange = (e) => {
        this.setState({ search: e.target.value });
    }

    handleGetJSON = () => {
        fetch("http://www.omdbapi.com/?apikey=e5afa179&plot=full&t=" + this.state.search)
            .then(res => res.json())
            .then((result) => {
                this.setState({
                    movie: result
                });
            }).catch(err => console.log(err));
    }

    handleFormSubmit = () => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        post(
            '/api/video',
            { movie: this.state.movie },
            {config}
        )
    }

    render() {
        return (
            <div>
                <Header />
                <Container>
                    <Row className="movie-list">
                        <Col xs={12}>
                            <input type="text" name="searchJSON" onChange={this.handleValueChange}/>
                            <button onClick={this.handleGetJSON}>Get JSON</button><br/>
                            <div>{this.state.movie ? JSON.stringify(this.state.movie) : ''}</div>
                            <button onClick={this.handleFormSubmit}>Submit to DB</button>
                        </Col>
                    </Row>
                </Container>
                <Footer />
            </div>
        );
    }
}

export default OmdbAPI;