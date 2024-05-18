import { useState, useEffect } from 'react';
import {  jwtDecode,JwtPayload } from 'jwt-decode';;




interface DecodedToken {

  userId: string;
  roles:string


}
let token="12345545"
const useAuth = () => {

  const [user, setUser] = useState<DecodedToken | null>(null);

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode<JwtPayload>(token);
       if(decodedToken){
        const decodedTokenAsDecodedToken = decodedToken as DecodedToken;
      setUser(decodedTokenAsDecodedToken);
       }
    }
  }, [token]);

  console.log(user,"use-auth");
  
  return user;
}


export default useAuth