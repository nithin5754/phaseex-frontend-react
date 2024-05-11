

import axios from '@/app/api/axios';
import { setCredentials } from '@/app/slices/authSlice';
import { useDispatch } from 'react-redux';

import { useLocation, useNavigate } from 'react-router-dom';

const useRefreshToken = async() => {
  const dispatch = useDispatch();
  const location=useLocation()
  const navigate=useNavigate()
    

  console.log("hello use refresh token");

    try {
      const response = await axios.get('/auth/refresh', {
        withCredentials: true
      });

      console.log(response.data.accessToken, "hello-access-token");

      dispatch(setCredentials(response.data));

      return response.data.accessToken;
    } catch (error) {
  
      console.error("Error refreshing token:", error);
      navigate('/login',{state:{from:location},replace:true});
      throw error; 
    }

};







export default useRefreshToken


