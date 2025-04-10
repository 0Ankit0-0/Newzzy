import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./login.module.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginForm = ({ mode }) => {
    const [credentials, setCredentials] = useState({
        username: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                "https://newzzy-1.onrender.com/api/auth/login",
                credentials
            );

            if (response.data && response.data.success) {
                toast.success("Login successful!", { autoClose: 2000 });

                setTimeout(() => {
                    navigate("/");
                }, 2000);
            } else {
                toast.error("Invalid username or password");
            }
        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        }
    };

    return (
        <div
            className={`${styles.loginContainer} ${mode === "dark" ? styles.dark : ""
                }`}
        >
            <form className={styles.loginForm} onSubmit={handleLogin}>
                <ToastContainer />
                <center>
                    <h2>Login</h2>
                </center>

                <div className={styles.inputGroup}>
                    <label htmlFor="username">Username</label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        value={credentials.username}
                        onChange={handleChange}
                        placeholder="Enter your username"
                        required
                    />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="password">Password</label>
                    <div className={styles.inputWrapper}>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            name="password"
                            value={credentials.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                        />
                        <button
                            type="button"
                            className={styles.passwordToggle}
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? (
                                <FiEye className={styles.toggleIcon} />
                            ) : (
                                <FiEyeOff className={styles.toggleIcon} />
                            )}
                        </button>
                    </div>
                </div>

                <center>
                    <p className={styles.forgotPassword}>
                        <Link to="/f_password">Forgot password?</Link>
                    </p>
                    <br />
                    <p>
                        Not Registered Yet?
                        <Link to="/signup" className={styles.sign}>
                            {" "}
                            Sign Up{" "}
                        </Link>
                        Now
                    </p>
                    <br />
                    <button type="submit" className={styles.loginButton}>
                        Login
                    </button>
                </center>
            </form>
        </div>
    );
};

export default LoginForm;
