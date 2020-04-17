import React from 'react';
import {Navbar} from 'react-bootstrap';
import {Nav} from 'react-bootstrap';
import {Form} from 'react-bootstrap';
import {FormControl} from 'react-bootstrap';
import {Button} from 'react-bootstrap';

class Header extends React.Component {
    render() {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Brand href="/"><span className="navbar-font">Movie World</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/movie"><span className="navbar-font">Movie</span></Nav.Link>
                        <Nav.Link href="/tv"><span className="navbar-font">TV</span></Nav.Link>
                        <Nav.Link href="/omdbAPI"><span className="navbar-font">OmdbAPI</span></Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default Header;