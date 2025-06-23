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
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={
                    <Layout><LandingPage /></Layout>
                }/>
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />

                <Route path="/home" element={
                    <PrivateRoute>
                        <Layout><HomePage /></Layout>
                    </PrivateRoute>
                } />

                <Route path="/profile" element={
                    <PrivateRoute>
                        <Layout><ProfilePage /></Layout>
                    </PrivateRoute>
                } />

                <Route path="/create" element={
                    <PrivateRoute>
                        <Layout><CreatePage /></Layout>
                    </PrivateRoute>
                } />

                <Route path="/favorites" element={
                    <PrivateRoute>
                        <Layout><FavoritesPage /></Layout>
                    </PrivateRoute>
                } />

                <Route path="/profile/change" element={
                    <PrivateRoute>
                        <Layout><ChangeProfilePage /></Layout>
                    </PrivateRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
