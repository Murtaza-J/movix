import React from "react";
import { Banner, Row } from "../components";
import urls from "../utils/request_urls";

const Homepage = () => {
  return (
    <div>
      <Banner urls={[urls.latest_movie, urls.latest_tv]} />
      <Row title="Trending" urls={[urls.trending_movie, urls.trending_tv]} />
      <Row title="Popular" urls={[urls.popular_movie, urls.popular_tv]} />
      <Row title="Top Rated" urls={[urls.top_rated_movie, urls.top_rated_tv]} />
      <Row title="Action" urls={[urls.action_movie, urls.action_tv]} />
      <Row title="Horror" urls={[urls.horror_movie, urls.horror_tv]} />
      <Row
        title="Thriller &amp; Mystery"
        urls={[urls.thriller_movie, urls.mystery_tv]}
      />
      <Row title="Science Fiction" urls={[urls.sci_fi_movie, urls.sci_fi_tv]} />
      <Row title="Romance" urls={[urls.romance_movie]} />
    </div>
  );
};

export default Homepage;
