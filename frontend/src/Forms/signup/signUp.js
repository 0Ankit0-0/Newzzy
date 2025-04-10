import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FiEye, FiEyeOff } from "react-icons/fi";
import styles from "./signUp.module.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignUpForm = ({ mode }) => { // Receive 'mode' as a prop
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobileNo: "",
        username: "",
        password: "",
        confirmPassword: "",
    });

    const [errors, setErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validateForm = () => {
        const formErrors = {};
        if (!formData.name.trim()) formErrors.name = "Full name is required";
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email.trim()) {
            formErrors.email = "Email is required";
        } else if (!emailPattern.test(formData.email)) {
            formErrors.email = "Invalid email format";
        }

        if (!formData.mobileNo.trim()) {
            formErrors.mobileNo = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobileNo)) {
            formErrors.mobileNo = "Mobile number must be 10 digits";
        }

        if (!formData.username.trim()) {
            formErrors.username = "Username is required";
        } else if (formData.username.length < 4) {
            formErrors.username = "Username must be at least 4 characters";
        }

        if (!formData.password) {
            formErrors.password = "Password is required";
        } else if (formData.password.length < 8) {
            formErrors.password = "Password must be at least 8 characters";
        }

        if (!formData.confirmPassword) {
            formErrors.confirmPassword = "Confirm password is required";
        } else if (formData.password !== formData.confirmPassword) {
            formErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(formErrors);

        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {
            try {
                await axios.post("https://probable-spork-v6xq79g69xpfpx5g-5001.app.github.dev/api/auth/signup", {
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    mobileNo: formData.mobileNo,
                    name: formData.name,
                });
                toast.success("Signup successful!", { autoClose: 2000 });
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } catch (error) {
                toast.error(error.response?.data?.error || "Something went wrong!", {
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className={`${styles.signupContainer} ${mode === "dark" ? styles.dark : ""}`}>
            <form className={styles.signupForm} onSubmit={handleSubmit}>
                <ToastContainer />
                <center>
                    <h2>Sign Up</h2>
                </center>
                {Object.keys(formData).map((key) => (
                    <div className={styles.inputGroup} key={key}>
                        <label htmlFor={key}>
                            {key.charAt(0).toUpperCase() +
                                key.slice(1).replace(/([A-Z])/g, " $1")}
                        </label>
                        <div className={styles.inputWrapper}>
                            <input
                                type={
                                    key.includes("password")
                                        ? key === "password"
                                            ? showPassword
                                                ? "text"
                                                : "password"
                                            : showConfirmPassword
                                                ? "text"
                                                : "password"
                                        : "text"
                                }
                                id={key}
                                name={key}
                                value={formData[key]}
                                onChange={handleChange}
                                placeholder={`Enter your ${key
                                    .replace(/([A-Z])/g, " $1")
                                    .toLowerCase()}`}
                                required
                            />
                            {key.includes("password") && (
                                <button
                                    type="button"
                                    className={styles.passwordToggle}
                                    onClick={() =>
                                        key === "password"
                                            ? setShowPassword(!showPassword)
                                            : setShowConfirmPassword(!showConfirmPassword)
                                    }
                                >
                                    {key === "password" ? (
                                        showPassword ? (
                                            <FiEye className={styles.toggleIcon} />
                                        ) : (
                                            <FiEyeOff className={styles.toggleIcon} />
                                        )
                                    ) : showConfirmPassword ? (
                                        <FiEye className={styles.toggleIcon} />
                                    ) : (
                                        <FiEyeOff className={styles.toggleIcon} />
                                    )}
                                </button>
                            )}
                        </div>
                        {errors[key] && <p className={styles.error}>{errors[key]}</p>}
                    </div>
                ))}
                <center>
                    <button type="submit" className={styles.signupButton}>
                        Sign Up
                    </button>
                </center>
            </form>
        </div>
    );
};

export default SignUpForm;