import axios from '@/app/api/axios';
import { setCredentials } from '@/app/slices/authSlice';
import { UserInfo } from '@/features/types';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const refreshToken = async () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  try {
    // Send a request to refresh the token
    const response = await axios.get('/auth/refresh', {
      withCredentials: true
    });

    // Extract user data and access token from the response
    const { userName, accessToken, verified, email } = response?.data?.data;

    // Dispatch the updated user credentials to the Redux store
    const userData: UserInfo = {
      userName,
      accessToken,
      verified,
      email
    };
    dispatch(setCredentials(userData));

    // Return the new access token
    return accessToken;
  } catch (error) {
    // Handle refresh token error
    console.error("Error refreshing token:", error);
    // Redirect to the login page with the current location saved in state
    navigate('/login', { state: { from: location }, replace: true });
    throw error;
  }
};

export default refreshToken;
