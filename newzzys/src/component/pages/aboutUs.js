import React from "react";
import "./aboutUs.css";

const AboutUs = (props) => {
    let { mode } = props;
    return (
        <div
            className="about-us"
            style={{ color: mode === "dark" ? "white" : "black" }}
        >
            <section className="hero">
                <h1>About Us</h1>
                <p>Learn more about our journey and what drives us.</p>
            </section>

            <section className="our-mission">
                <h2>Our Mission</h2>
                <p>
                    We aim to make the world a better place by building amazing software
                    that solves real-world problems.
                </p>
            </section>

            <section className="our-mission">
                <h2>Description</h2>
                <p>
                    This web-app is my first project design by me. This was made with the
                    little-bit help You-tube (@codewithharry) & (@chatgpt). Thank You for
                    visting the website.
                </p>
            </section>

            <section className="our-team">
                <h2>Meet the Team</h2>
                <div className="team-members">
                    {/* <div className="team-member">
            <img src="team-member1.jpg" alt="John Doe" />
            <h3>Ankit Vishwakarma</h3>
            <p>Founder </p>
          </div> */}
                    <div className="team-member">
                        {/* <img src="team-member2.jpg" alt="" /> */}
                        <h3>Ankit Vishwaarma</h3>
                        <p>Lead Developer</p>
                    </div>
                    {/* Add more team members */}
                </div>
            </section>

            <section className="our-values">
                <h2>Our Values</h2>
                <ul>
                    <li>Integrity</li>
                    <li>Innovation</li>
                    <li>Customer Centricity</li>
                    {/* More values */}
                </ul>
            </section>
        </div>
    );
};

export default AboutUs;
