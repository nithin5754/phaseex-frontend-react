;
import { useGoogleAuthMutation } from '@/app/redux/api/googleApi';
import { useAppDispatch } from '@/app/redux/api/store';

import { setCredentials, setUserEmail, setUserImg, setUserName } from '@/features/auth/authSlice';
import { googleClientId } from '@/lib/constant';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { GoogleLogin } from '@react-oauth/google';

import { useLocation, useNavigate } from 'react-router-dom';


const GoogleAuth = () => {
  
  
  const [googleAuth]=useGoogleAuthMutation()

  const dispatch = useAppDispatch();
  
const navigate=useNavigate()
const location = useLocation();
const from = location.state?.from?.pathname || "/homepage";



    
  const handleLoginSuccess = async (response: any) => {

    const token = response.credential;

    console.log(token)

    if(token){

    let data=  await googleAuth({token}).unwrap()

           if (data.accessToken) {
      dispatch(setCredentials(data.accessToken));
      dispatch(setUserName(data.data.userName))
      dispatch(setUserEmail(data.data.email))
      dispatch(setUserImg(data.data.profile_image))


        

      navigate(from, { replace: true });
  
    }
    }
   console.log(googleAuth,"google response backend")

};



  return (
    <div className='flex items-center justify-center '>
    <GoogleOAuthProvider clientId={googleClientId}>
    <GoogleLogin
                    onSuccess={handleLoginSuccess}
                    useOneTap
                    text="continue_with"
                    size='large'
                // width='300'
                />
    </GoogleOAuthProvider>

</div>
  )
}
export default GoogleAuth