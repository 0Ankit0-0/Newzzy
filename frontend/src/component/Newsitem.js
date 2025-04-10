import React from "react";
import moon from "./moons.png";
import news from "./news.png";

const Newsitem = (props) => {
    let { title, description, imageUrl, newsUrl, mode } = props;

    // Function to choose between two images based on the mode
    const getBackgroundImage = () => {
        return mode === "dark" ? moon : news;
    };

    return (
        <div
            className="my-3"
            style={{ color: mode === "dark" ? "white" : "black" }}
        >
            <div className="card" style={{ aspectRatio: "3/2" }}>
                <img
                    src={
                        imageUrl ||
                        getBackgroundImage() ||
                        "https://via.placeholder.com/300"
                    }
                    className="card-img-top"
                    alt="news"
                />
                <div className={`card-body `}>
                    <h5 className="card-title">{title}</h5>
                    <p className={`card-text`}>{description}</p>
                    <a
                        rel="noreferrer"
                        href={newsUrl}
                        target="_blank"
                        className={`btn btn-sm btn-dark`}
                    >
                        Read More
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Newsitem;
