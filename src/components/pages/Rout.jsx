import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Home'
import Footer from './Footer'
import Header from './Header'
import NotFound from './NotFound';
import Layout from './Layout';
import Register from '../auth/register/Register'
import Login from '../auth/login/Login'
import Desc from './search/Desc'
import Search from './search/Search'
import Comment from '../pages/Comment'
import Profile from '../auth/profile/Profile'

function AppContent() {
    const location = useLocation();

    const hideNavAndFooter = location.pathname === '/login' || location.pathname === '/register';

    return (
        <div className="App">
            {!hideNavAndFooter && <Header />}
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path="*" element={<NotFound />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/profile" element={<Profile />} /> 
                    <Route path="/desc" element={<Desc />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/comment" element={<Comment />} />
                </Route>
            </Routes>
            {!hideNavAndFooter && <Footer />}
        </div>
    );
}

export default AppContent;