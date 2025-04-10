import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
        country: "us",
        pageSize: 10,
        category: "science",
    };

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    };

    constructor() {
        super();
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
        };
    }

    async componentDidMount() {
        this.updateNews();
    }

    updateNews = async () => {
        const { country, category, pageSize } = this.props;
        const { page } = this.state;

        try {
            this.setState({ loading: true });
            const url = `https://localhost:5001/api/news?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}`;
            const data = await fetch(url);
            const parsedData = await data.json();
            if (parsedData && Array.isArray(parsedData.articles)) {
                this.setState({
                    articles: parsedData.articles,
                    totalResults: parsedData.totalResults || 0,
                    loading: false,
                });
            } else {
                this.setState({
                    articles: [],
                    totalResults: 0,
                    loading: false,
                });
                console.warn("Unexpected API response:", parsedData);
            }
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ articles: [], loading: false });
        }
    };

    handleNextClick = async () => {
        this.setState(
            (prevState) => ({ page: prevState.page + 1 }),
            this.updateNews
        );
    };

    handlePreviousClick = async () => {
        this.setState(
            (prevState) => ({ page: prevState.page - 1 }),
            this.updateNews
        );
    };

    render() {
        const { articles, loading, page, totalResults } = this.state;
        const { pageSize, mode } = this.props;

        return (
            <div className="container my-3">
                <h1 className="text-center">Newszzy - Top Headlines</h1>
                {loading && <Spinner />}
                <div className="row">
                    {!loading &&
                        Array.isArray(articles) &&
                        articles.map((element) => (
                            <div className="col-md-4 my-3" key={element.url}>
                                <Newsitem
                                    style={{ color: mode === "dark" ? "white" : "black" }}
                                    title={element.title || ""}
                                    description={element.description || ""}
                                    imageUrl={element.urlToImage}
                                    newsUrl={element.url}
                                />
                            </div>
                        ))}
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePreviousClick}
                        disabled={page <= 1}
                    >
                        &larr; Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                        disabled={page >= Math.ceil(totalResults / pageSize)}
                    >
                        Next &rarr;
                    </button>
                </div>
            </div>
        );
    }
}

export default News;
