import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/apiService"; // Adjust the path if needed
import expenseImage from "../assets/unsplash.jpg";
import "../styles/login/LoginPage.css";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginUser(username, password);
      console.log("response", response);

      if (response.message == "Logged in") {
        console.log("response.message", response.message);
        navigate("/form");
        setSuccess(response.message);
      } else {
        setError(response.message);
      }
    } catch (err) {
      console.log("error", err.message);
      setError("An error occurred");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-left">
          <h1>Expense Traker</h1>
          {/* <p>Please enter your details.</p> */}
          {/* <button className="apple-login">Log in with Apple</button> */}
          {/* <div className="divider">
            <span>or</span>
          </div> */}
          <form>
            <div className="input-container">
              <i className="fas fa-envelope"></i>
              <input type="email" placeholder="Email" required />
            </div>
            <div className="input-container">
              <i className="fas fa-lock"></i>
              <input type="password" placeholder="Password" required />
            </div>
            <div className="remember-forgot">
              {/* <label>
                <input type="checkbox" /> Remember for 30 days
              </label> */}
              <p href="/">Forgot password?</p>
            </div>
            <button type="submit" className="login-button">
              Log In
            </button>
          </form>
          <p className="signup">
            Don't have an account? <a href="/">Sign Up</a>
          </p>
        </div>
        <div className="login-right">
          <img src={expenseImage} alt="Login Visual" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
