import './App.css';
import React, { Component } from "react";
import Navbar from "./component/navbar";
import News from "./component/News";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Head from "./component/head";
import LoginForm from "./Forms/login/login";
import SignUpForm from "./Forms/signup/signUp";
import AboutUs from "./component/pages/aboutUs";
import ContactUs from "./component/pages/contactUs";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "light",
    };
  }

  toggleMode = () => {
    const newMode = this.state.mode === "light" ? "dark" : "light";
    this.setState({ mode: newMode });
    document.body.style.backgroundColor =
      newMode === "light" ? "white" : "#000000";
  };

  render() {
    return (
      <Router>
        <div>
          <Head mode={this.state.mode} toggleMode={this.toggleMode} />
          <Navbar mode={this.state.mode} toggleMode={this.toggleMode} />
          <Routes>
            <Route path="/" element={<News pageSize={15} country="us" />} />
            <Route
              exact
              path="/general"
              element={
                <News
                  key="general"
                  pageSize={15}
                  country="us"
                  category="general"
                />
              }
            />
            <Route
              exact
              path="/science"
              element={
                <News
                  key="science"
                  pageSize={15}
                  country="us"
                  category="science"
                />
              }
            />
            <Route
              exact
              path="/technology"
              element={
                <News
                  key="technology"
                  pageSize={15}
                  country="us"
                  category="technology"
                />
              }
            />
            <Route
              exact
              path="/sports"
              element={
                <News
                  key="sports"
                  pageSize={15}
                  country="us"
                  category="sports"
                />
              }
            />
            <Route
              exact
              path="/business"
              element={
                <News
                  key="business"
                  pageSize={15}
                  country="us"
                  category="business"
                />
              }
            />
            <Route
              exact
              path="/health"
              element={
                <News
                  key="health"
                  pageSize={15}
                  country="us"
                  category="health"
                />
              }
            />
            <Route
              exact
              path="/entertainment"
              element={
                <News
                  key="entertainment"
                  pageSize={15}
                  country="us"
                  category="entertainment"
                />
              }
            />
            <Route
              exact
              path="/login"
              element={
                <LoginForm
                  mode={this.state.mode}
                  toggleMode={this.toggleMode}
                />
              }
            />
            <Route
              exact
              path="/signUp"
              element={
                <SignUpForm
                  mode={this.state.mode}
                  toggleMode={this.toggleMode}
                />
              }
            />
            <Route
              exact
              path="/about"
              element={
                <AboutUs mode={this.state.mode} toggleMode={this.toggleMode} />
              }
            />
            <Route
              exact
              path="/contact"
              element={
                <ContactUs
                  mode={this.state.mode}
                  toggleMode={this.toggleMode}
                />
              }
            />
          </Routes>
        </div>
      </Router>
    );
  }
}
