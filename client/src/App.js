import React from 'react';
import './App.css';
import Main from './container/Main';
import VideoHome from './container/VideoHome';
import VideoInfo from './container/VideoInfo';
import OmdbAPI from './container/OmdbAPI';
import Header from './components/Header';
import Footer from './components/Footer';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import SearchVideo from './container/SearchVideo';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      videoId: 0,
      videoTitle: '',
      search: ''
    }
  }

  handleVideoInfo = (id, title) => {
    this.setState({
      videoId: id,
      videoTitle: title
    });
  }

  handleSearch = (search) => {
    this.setState({search: search});
  }

  render() {
    return (
      <Router>
        <Header handleSearch={this.handleSearch} />
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
          <Route exact path="/search/:search">
            <SearchVideo types='search' handleVideoInfo={this.handleVideoInfo} search={this.state.search} />
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
        <Footer />
      </Router>
    );
  }
}

export default App;
