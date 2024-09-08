import { useState, useEffect } from 'react';
import axios from '../../api/axiosConfig';

const Profile = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const token = localStorage.getItem('authToken');
                if (!token) {
                    setError('No token found. Please log in.');
                    return;
                }

                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                const response = await axios.get('http://localhost:8080/api/user/get-profile');
                setUserInfo(response.data.data);
            } catch (error) {
                console.error('Error fetching user profile:', error);
                setError('Failed to fetch user profile.');
            }
        };

        fetchUserProfile();
    }, []); // Empty dependency array means this runs once after the initial render

    return (
        <div className="profile">
            {error && <p>{error}</p>}
            {userInfo ? (
                <div>
                    <h1>User Profile</h1>
                    <p><strong>Username:</strong> {userInfo.userName}</p>
                    <p><strong>Email:</strong> {userInfo.email}</p>
                    <p><strong>Password:</strong> {userInfo.password}</p>
                    {/* Add other fields as necessary */}
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default Profile;
