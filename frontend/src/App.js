import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import HomePage from './pages/HomePage';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import FavoritesPage from './pages/FavoritesPage';
import CreatePage from './pages/CreatePage';
import ChangeProfilePage from './pages/ChangeProfilePage';
import PrivateRoute from './components/PrivateRoute';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/home" element={
                    <PrivateRoute><HomePage /></PrivateRoute>
                } />
                <Route path="/profile" element={
                    <PrivateRoute><ProfilePage /></PrivateRoute>
                } />
                <Route path="/create" element={
                    <PrivateRoute><CreatePage /></PrivateRoute>
                } />
                <Route path="/favorites" element={
                    <PrivateRoute><FavoritesPage /></PrivateRoute>
                } />
                <Route path="/changeProfile" element={
                    <PrivateRoute><ChangeProfilePage /></PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
