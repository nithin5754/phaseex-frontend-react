
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"

import { useSelector } from 'react-redux'
import { selectCurrentToken } from "@/app/slices/authSlice"
import { axiosPrivate } from "@/app/api/axios"







const useAxiosPrivate = () => {
  const token=useSelector(selectCurrentToken)
  const refresh=useRefreshToken()

  useEffect(() => {  

    
      const requestIntercept = axiosPrivate.interceptors.request.use(
          config => {
              if (!config.headers['Authorization']) {
                  config.headers['Authorization'] = `Bearer ${token}`;
              }

     
               return config
          }, (error) => Promise.reject(error)
      );

      const responseIntercept = axiosPrivate.interceptors.response.use(
          response => response,
          async (error) => {
              const prevRequest = error?.config;
              if (error?.response?.status === 403 && !prevRequest?.sent) {
                  prevRequest.sent = true;
                  const newAccessToken = await useRefreshToken();
                  
                  prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;

                  console.log(prevRequest,"prevRequest")
                  return axiosPrivate(prevRequest);
              }
              return Promise.reject(error);
          }
      );

      return () => {
          axiosPrivate.interceptors.request.eject(requestIntercept);
          axiosPrivate.interceptors.response.eject(responseIntercept);
      }
  }, [token, refresh])

  return axiosPrivate;
}


export default useAxiosPrivate