import { useAppDispatch } from '@/app/store/store';
import { fetchTimerDateThunk, resendOTPThunk } from '@/app/thunk/userThunk';
import React, { useState, useEffect, useCallback } from 'react';
import Countdown from 'react-countdown';

interface OTPTimerProps {
  tokenId: string;
}

const OTPTimer: React.FC<OTPTimerProps> = ({ tokenId }) => {
  const dispatch = useAppDispatch();
  const [startTime, setStartTime] = useState(Date.now());
  const [duration, _setDuration] = useState(10);
  const [disable, setDisable] = useState<boolean>(true);
  const [countdownKey, setCountdownKey] = useState<number>(0);

  const handleResendSubmit = useCallback(async () => {
    try {
      await dispatch(resendOTPThunk(tokenId));
      setDisable(true);
      setCountdownKey((prevKey) => prevKey + 1); 
      setStartTime(Date.now()); 
    } catch (error) {
      console.error("Resend OTP failed:", error);
    }
  }, [dispatch, tokenId]);

  useEffect(() => {
    async function fetchData() {
      const res = await dispatch(fetchTimerDateThunk(tokenId));
      const updateDate = res?.payload?.updateDate;

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
        key={countdownKey} // Update key to restart countdown
        date={startTime + duration * 1000} 
        onComplete={handleCountdownComplete}
      />
      <button onClick={handleResendSubmit} className={`p-1 text-sm rounded-sm ${disable ? 'bg-slate-200 text-gray-100 cursor-not-allowed' : 'bg-slate-700 text-white'}`} disabled={disable}>resend Otp</button>
    </div>
  );
};

export default OTPTimer;
