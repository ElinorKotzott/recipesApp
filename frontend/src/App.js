import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import CreatePage from './pages/CreatePage';
import ChangeProfilePage from './pages/ChangeProfilePage';


function App() {
    return (
        <Router>
        <>
            <Routes>
                <Route path="/register" element={<RegisterPage/>} />
                <Route path="/login" element={<LoginPage/>} />
                <Route path="/" element={<LandingPage/>} />
                <Route path="/home" element={<HomePage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/create" element={<CreatePage/>} />
                <Route path="/favorites" element={<FavoritesPage/>} />
                <Route path="/changeProfile" element={<ChangeProfilePage/>} />
            </Routes>
        </>
        </Router>
    );
}

export default App;