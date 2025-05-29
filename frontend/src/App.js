import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage'
import RegisterPage from './pages/Auth/RegisterPage'
import HomePage from './pages/HomePage'
import LandingPage from './pages/LandingPage'


function App() {
    return (
        <Router>
        <>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/" element={<LandingPage/>} />
                <Route path="/home" element={<HomePage/>} />
            </Routes>
        </>
        </Router>
    );
}

export default App;