import React from "react";
import { Navbar, Banner } from "./components";
import urls from "./utils/request_urls";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Homepage, Tvpage, Moviespage, TvInfoPage, MovieInfoPage, SearchPage } from "./pages";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route path="/tv/:id">
            <TvInfoPage />
          </Route>
          <Route path="/movie/:id">
            <MovieInfoPage />
          </Route>
          <Route path="/tv">
            <Banner urls={[urls.latest_tv]} />
            <Tvpage />
          </Route>
          <Route path="/movie">
            <Banner urls={[urls.latest_movie]} />
            <Moviespage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
