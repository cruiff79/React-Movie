import React from 'react';
import './App.css';
import Main from './container/Main';
import MovieHome from './container/MovieHome';
import MovieInfo from './container/MovieInfo';
import OmdbAPI from './container/OmdbAPI';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: 0,
      movieTitle: ''
    }
  }

  handleMovieInfo = (id, title) => {
    this.setState({
      movieId: id,
      movieTitle: title
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main handleMovieInfo={this.handleMovieInfo} />
          </Route>
          <Route exact path="/movie">
            <MovieHome handleMovieInfo={this.handleMovieInfo} />
          </Route>
          <Route exact path="/movie/:movieId">
            <MovieInfo id={this.state.movieId} title={this.state.movieTitle} />
          </Route>
          <Route path="/omdbAPI">
            <OmdbAPI />
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
