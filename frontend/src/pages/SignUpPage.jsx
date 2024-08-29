import { useState } from "react";
import "../styles/login/SignupPage.css";
import { signupUser } from "../services/apiService";



const SignupPage = (isOpen, onClose) => {
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState("");

    const [formData, setFormData] = useState({
            title: "",
            name: "",
            age: "",
            role: "",
            password: "",
            confirmpassword :""
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            console.log('formdata',formData);
            const response = await signupUser({ formData });
            console.log('response',response);

        setError(null);
        } catch (err) {
            console.log("error", err.message);
            setError("An error occurred");
        }
    };

    if (!isOpen) return null;


    return (
        <div className="popup-overlay">
            <div className="signup-popup">
                <h1>Sign Up</h1>
                <form onSubmit={handleSignup}>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Age"
                            name="age"
                            value={formData.age}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-envelope"></i>
                        <input
                            type="text"
                            placeholder="Role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <i className="fas fa-lock"></i>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {error && <p className="error-msg">{error}</p>}
                    {success && <p className="success-msg">{success}</p>}
                    <div className="button-group">
                        <button type="submit" className="signup-button">
                            Submit
                        </button>
                        <button type="button" className="cancel-button" onClick={onClose}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SignupPage;
