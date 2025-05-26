import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header.js'
import Register from './components/Register'
import Login from './components/Login'


function App() {
    return (
        <Router>
        <>
            <Header/>
            <Routes>
                <Route path="/register" element={<Register/>} />
                <Route path="/login" element={<Login/>} />
            </Routes>
        </>
        </Router>
    );
}

export default App;