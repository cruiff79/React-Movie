import React from 'react';
import { post } from 'axios';
import {Container, Row, Col, Image, Modal, Button} from 'react-bootstrap';
import { MDBCol, MDBFormInline, MDBBtn } from "mdbreact";

class OmdbAPI extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            movie: null,
            show: false,
            text: ''
        };
    }

    handleValueChange = (e) => {
        this.setState({ search: e.target.value });
    }

    handleGetJSON = (e) => {
        e.preventDefault();
        if(!this.state.search) {
            this.handleShow('Please enter title!');
            return false;
        }

        fetch("http://www.omdbapi.com/?apikey=e5afa179&plot=full&t=" + this.state.search)
            .then(res => res.json())
            .then((result) => {
                if(result.Response === 'True') {
                    this.setState({movie: result});
                } else {
                    this.setState({movie: null});
                }
            })
            .catch(err => console.log(err));
    }

    handleFormSubmit = () => {
        if(!this.state.movie) {
            this.handleShow('Please search movie!');
            return false;
        }

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        
        post(
            '/api/video',
            { movie: this.state.movie },
            {config}
        ).then(res => {
            this.setState({
                search: '',
                movie: null
            });
            this.handleShow('Submited');
        })
    }

    handleClose = () => {
        this.setState({show: false});
    }

    handleShow = (text) => {
        this.setState({
            show: true,
            text: text
        });
    }

    render() {
        return (
            <div className="omdbAPI">
                <Container>
                    <Row className="movie-list">
                        <Col md={4}></Col>
                        <Col md={4}>  
                            <MDBCol md="12">
                                <MDBFormInline className="md-form mr-auto mb-4">
                                    <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" onChange={this.handleValueChange} />
                                    <MDBBtn gradient="aqua" rounded size="sm" type="submit" className="mr-auto" onClick={this.handleGetJSON}>Search</MDBBtn>
                                </MDBFormInline>
                                {/* <div>{this.state.movie ? JSON.stringify(this.state.movie.Poster) : ''}</div> */}
                                <div>
                                    {this.state.movie ?
                                        <div>
                                            <div><h2>{this.state.movie.Title}</h2></div>
                                            <div><Image src={this.state.movie.Poster} /></div>
                                        </div>
                                    : 'There is no data.'
                                    }
                                </div>
                                <MDBBtn color="unique" rounded size="sm" type="submit" className="mr-auto" onClick={this.handleFormSubmit}>Submit to DB</MDBBtn>
                            </MDBCol>
                        </Col>
                        <Col md={4}></Col>
                    </Row>
                </Container>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                    <Modal.Title>Notice!!</Modal.Title>
                    </Modal.Header>
                        <Modal.Body>{this.state.text}</Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

export default OmdbAPI;