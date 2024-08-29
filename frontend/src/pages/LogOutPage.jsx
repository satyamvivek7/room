import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear user data from sessionStorage or localStorage
        sessionStorage.removeItem("username");
        sessionStorage.removeItem("Session-token");

        // Redirect to login page
        navigate("/login");
    };

    return (
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Logout;
