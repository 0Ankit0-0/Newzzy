import React, { useState } from "react";
import "./contactUs.css";

const ContactUs = (props) => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });
    let { mode } = props;
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form submitted", formData);
    };

    return (
        <div
            className="contact-us"
            style={{ color: mode === "dark" ? "white" : "black" }}
        >
            <section className="contact-info">
                <h1>Contact Us</h1>
                <p>
                    We'd love to hear from you! Reach out to us for any inquiries or
                    feedback.
                </p>
                <ul>
                    <li>Email: hw278101@gmail.com</li>
                    <li>Phone: +91 88798 59552</li>
                    <li>Address: 1234 Street Name, City, Country</li>
                </ul>
            </section>

            <section
                className="contact-form"
                style={{ color: mode === "dark" ? "white" : "black" }}
            >
                <h2>Send Us a Message</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Name:</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Message:</label>
                        <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </section>
        </div>
    );
};

export default ContactUs;
