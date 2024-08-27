import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import FormPage from '../pages/FormPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/form" element={<FormPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
