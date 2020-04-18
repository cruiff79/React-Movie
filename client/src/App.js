import React from 'react';
import './App.css';
import Main from './container/Main';
import VideoHome from './container/VideoHome';
import VideoInfo from './container/VideoInfo';
import OmdbAPI from './container/OmdbAPI';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: 0,
      videoTitle: ''
    }
  }

  handleVideoInfo = (id, title) => {
    this.setState({
      videoId: id,
      videoTitle: title
    });
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Main types='movie' handleVideoInfo={this.handleVideoInfo} />
          </Route>
          <Route exact path="/movie">
            <VideoHome types='movie' handleVideoInfo={this.handleVideoInfo} />
          </Route>
          <Route exact path="/tv">
            <VideoHome types='tv' handleVideoInfo={this.handleVideoInfo} />
          </Route>
          <Route exact path="/movie/:videoId">
            <VideoInfo id={this.state.videoId} title={this.state.videoTitle} />
          </Route>
          <Route exact path="/tv/:videoId">
            <VideoInfo id={this.state.videoId} title={this.state.videoTitle} />
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
