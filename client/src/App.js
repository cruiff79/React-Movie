import React from 'react';
import './App.css';
import Movie from './components/Movie';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: ''
    };
  }

  componentDidMount() {
    this.timer = setInterval(this.progress, 20);
    this.callApi()
      .then(res => this.setState({movies: res}))
      .catch(err => console.log(err));
  }

  callApi = async () => {
    const response = await fetch('/movie');
    const body = await response.json();
    return body;
  }

  render() {
    return (
      <div className="App">
        {this.state.movies ? 
          this.state.movies.map(item => {
            return (
              <Movie key={item.imdbID} title={item.Title} poster={item.Poster} year={item.Year} />
            );
          })
          : ''
        }
      </div>
    );
  }
}

export default App;
