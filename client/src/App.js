import React from 'react';
import './App.css';
import Main from './container/Main';
import MovieHome from './container/MovieHome';
import MovieInfo from './container/MovieInfo';
import OmdbAPI from './components/OmdbAPI';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieId: 0
    }
  }

  handleMovieId = (id) => {
    this.setState({movieId: id});
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main handleMovieId={this.handleMovieId} />
          </Route>
          <Route exact path="/movie">
            <MovieHome handleMovieId={this.handleMovieId} />
          </Route>
          <Route exact path="/movie/:movieId">
            <MovieInfo id={this.state.movieId} />
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
