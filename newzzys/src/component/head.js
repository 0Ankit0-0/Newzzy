import React, { Component } from "react";
import news from "./news.png";
import moon from "./moons.png";
import "./Head.css";

export default class Hell extends Component {
    componentDidMount() {
        this.updateBodyStyles();
    }

    componentDidUpdate(prevProps) {
        if (prevProps.mode !== this.props.mode) {
            this.updateBodyStyles();
        }
    }

    updateBodyStyles = () => {
        document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
        document.body.style.backgroundColor =
            this.props.mode === "dark" ? "#343a40" : "#f8f9fa";
        document.body.style.color = this.props.mode === "dark" ? "white" : "black";
    };

    render() {
        return (
            <header className="hell-header">
                <h1
                    className="text-center hell-title"
                    style={{
                        background:
                            "linear-gradient(169deg, rgba(0,0,0,1) 0%, rgba(4,25,56,1) 46%, rgba(8,174,227,1) 98%)",
                        color: this.props.mode === "dark" ? "white" : "black",
                        padding: "10px",
                    }}
                >
                    <img
                        src={this.props.mode === "dark" ? moon : news}
                        alt="Newszzy"
                        height={"150px"}
                        width={"150px"}
                        className="hell-logo"
                    />
                    <u>Newszzy</u>
                </h1>
            </header>
        );
    }
}