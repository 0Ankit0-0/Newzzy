import React, { Component } from "react";
import Newsitem from "./Newsitem";
import Spinner from "./spinner";
import PropTypes from "prop-types";

export class News extends Component {
    static defaultProps = {
        country: `us`,
        pageSize: `10`,
        category: `science`,
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
        };
    }
    async componentDidMount() {
        if (!this.state.loading) {
            this.updateNews();
        } else {
            this.noneNews();
        }
    }

    updateNews = async () => {
        const { country, category, pageSize } = this.props;
        const { page } = this.state;
        try {
            let url = `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apiKey=a747e705b6344eaba5f78c91acad30c4&page=${page}&pageSize=${pageSize}`;
            this.setState({ loading: true });
            let data = await fetch(url);
            let parsedData = await data.json();
            this.setState({
                articles: parsedData.articles,
                totalResults: parsedData.totalResults,
                loading: false,
            });
        } catch (error) {
            console.error("Error fetching news:", error);
            this.setState({ loading: false });
        }
    };

    noneNews = async () => {
        const { pageSize } = this.props;
        const { page } = this.state;
        let url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=a747e705b6344eaba5f78c91acad30c4&page=${page}&pageSize=${pageSize}`;
        this.setState({ loading: true });
        let data = await fetch(url);
        let parsedData = await data.json();
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false,
        });
    };

    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, this.updateNews);
    };

    handlePreviousClick = async () => {
        this.setState({ page: this.state.page - 1 }, this.updateNews);
    };

    render() {
        return (
            <div className="container my-3">
                <h1 className="text-center">Newszzy - Top Headlines</h1>
                {this.state.loading && <Spinner />}
                <div className="row">
                    {!this.state.loading &&
                        this.state.articles.map((element) => {
                            return (
                                <div className="col-md-4 my-3" key={element.url}>
                                    <Newsitem
                                        style={{
                                            color: this.props.mode === "dark" ? "white" : "black",
                                        }}
                                        title={element.title ? element.title : ""}
                                        description={element.description ? element.description : ""}
                                        imageUrl={element.urlToImage}
                                        newsUrl={element.url}
                                    />
                                </div>
                            );
                        })}
                </div>
                <div className="d-flex justify-content-between">
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handlePreviousClick}
                        disabled={this.state.page <= 1}
                    >
                        &larr; Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-dark"
                        onClick={this.handleNextClick}
                        disabled={
                            this.state.page + 1 >
                            Math.ceil(this.state.totalResults / this.props.pageSize)
                        }
                    >
                        Next &rarr;

                    </button>
                </div>
            </div>
        );
    }
}

export default News;
