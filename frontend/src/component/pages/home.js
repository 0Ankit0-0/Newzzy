import React, { Component } from "react";
import Newsitem from "../Newsitem";
import Spinner from "../spinner";
import PropTypes from "prop-types";

export class Home extends Component {
  static defaultProps = {
    pageSize: 10,
    mode: "light",
    country: "us",
    category: "general",
  };

  static propTypes = {
    pageSize: PropTypes.number,
    mode: PropTypes.string,
    country: PropTypes.string,
    category: PropTypes.string,
  };

  state = {
    articles: [],
    loading: false,
    page: 1,
    totalResults: 0,
    error: null,
  };

  componentDidMount() {
    this.updateNews();
  }

  updateNews = async () => {
    const { pageSize, country, category } = this.props;
    const { page } = this.state;

    const url = `http://localhost:5001/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;

    this.setState({ loading: true });

    try {
      const response = await fetch(url);
      const parsedData = await response.json();
      console.log("API response:", parsedData);

      if (!response.ok || parsedData.status !== "ok") {
        throw new Error(parsedData.message || "Failed to fetch news.");
      }

      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.error("Error fetching news:", error);
      this.setState({ loading: false, error: error.message });
    }
  };

  handleNextClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page + 1 }),
      this.updateNews
    );
  };

  handlePreviousClick = () => {
    this.setState(
      (prevState) => ({ page: prevState.page - 1 }),
      this.updateNews
    );
  };

  render() {
    const { articles, loading, page, totalResults, error } = this.state;
    const { pageSize, mode } = this.props;

    return (
      <div className="container my-3">
        <h1 className="text-center my-4">Newszzy - Top Headlines</h1>

        {loading && <Spinner />}
        {error && <p className="text-danger text-center">{error}</p>}

        <div className="row">
          {!loading &&
            articles.map((element) => (
              <div className="col-md-4 my-3" key={element.url}>
                <Newsitem
                  style={{ color: mode === "dark" ? "white" : "black" }}
                  title={element.title || ""}
                  description={element.description || ""}
                  imageUrl={element.urlToImage || "https://via.placeholder.com/150"}
                  newsUrl={element.url}
                />
              </div>
            ))}
        </div>

        <div className="d-flex justify-content-between my-4">
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handlePreviousClick}
            disabled={page <= 1 || loading}
          >
            &larr; Previous
          </button>
          <button
            type="button"
            className="btn btn-dark"
            onClick={this.handleNextClick}
            disabled={page * pageSize >= totalResults || loading}
          >
            Next &rarr;
          </button>
        </div>
      </div>
    );
  }
}

export default Home;
