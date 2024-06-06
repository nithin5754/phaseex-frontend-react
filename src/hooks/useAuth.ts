import { useState, useEffect } from 'react';
import {  jwtDecode,JwtPayload } from 'jwt-decode';import { useSelector } from 'react-redux';
import { selectCurrentToken } from '@/features/auth/authSlice';
;




interface DecodedToken {

  userId: string;
  roles:string


}

const useAuth = () => {

  const currentToken=useSelector(selectCurrentToken)

  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (currentToken) {
      try {
        const decodedToken = jwtDecode<DecodedToken>(currentToken);
        setUser(decodedToken);
      } catch (error) {
        console.error('Failed to decode token', error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  }, [currentToken]);

  
    if(user){
      return user;
    }

    return null
}


export default useAuth