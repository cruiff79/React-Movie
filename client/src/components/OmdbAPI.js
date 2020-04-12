import React from 'react';
import { post } from 'axios';

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
        const response = post(
            '/movie',
            { movie: this.state.movie },
            {config}
        )
    }

    render() {
        return (
            <div>
                <input type="text" name="searchJSON" onChange={this.handleValueChange}/>
                <button onClick={this.handleGetJSON}>Get JSON</button><br/>
                <div>{this.state.movie ? JSON.stringify(this.state.movie) : ''}</div>
                <button onClick={this.handleFormSubmit}>Submit to DB</button>
            </div>
        );
    }
}

export default OmdbAPI;