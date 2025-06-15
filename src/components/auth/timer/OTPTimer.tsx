

import { useFetchTimerDateMutation, useResendOtpMutation } from '@/app/redux/api/UserApi';
import { useAppDispatch } from '@/app/redux/api/store';
import React, { useState, useEffect, useCallback } from 'react';
import Countdown from 'react-countdown';

interface OTPTimerProps {
  tokenId: string;
}

const OTPTimer: React.FC<OTPTimerProps> = ({ tokenId }) => {
  const dispatch = useAppDispatch();
  const [fetchTimerDate]=useFetchTimerDateMutation()

  const [resendOtp]=useResendOtpMutation()

  const [startTime, setStartTime] = useState(Date.now());
  const [duration, _setDuration] = useState(30);
  const [disable, setDisable] = useState<boolean>(true);
  const [countdownKey, setCountdownKey] = useState<number>(0);



  const handleResendSubmit = useCallback(async () => {
    try {
      await resendOtp({tokenId});
      setDisable(true);
      setCountdownKey((prevKey) => prevKey + 1); 
      setStartTime(Date.now()); 
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  }, [dispatch, tokenId]);


  useEffect(() => {
    async function fetchData() {
      const res = await fetchTimerDate({tokenId}).unwrap();
   
      
      const updateDate = res.updateDate

      if (updateDate) {
        setStartTime(Number(new Date(updateDate)));
        setDisable(true);
      }
    }

    fetchData();
  }, [dispatch, tokenId]);


  const handleCountdownComplete = () => {
    setDisable(false); 
  };


  return (
    <div className='flex flex-row gap-4  justify-center'>
      <Countdown
        key={countdownKey} 
        date={startTime + duration * 1000} 
        onComplete={handleCountdownComplete}

        renderer={({ minutes, seconds }) => {
      
          const formattedMinutes = minutes.toString().padStart(2, '0');
          const formattedSeconds = seconds.toString().padStart(2, '0');
          return <div className='font-bold text-slate-900'> {formattedMinutes}:{formattedSeconds}</div>;
        }}
      />
           <button onClick={handleResendSubmit} className={`p-1 text-sm rounded-sm ${disable ? 'bg-slate-200 text-gray-100 cursor-not-allowed' : 'bg-slate-700 text-white'}`} disabled={disable}>resend Otp</button>

    </div>
  );
};

export default OTPTimer;
