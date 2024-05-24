import { useEffect, useRef } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectCurrentToken } from "./authSlice";
import usePersist from "@/hooks/usePersist";
import { useRefreshMutation } from "@/app/redux/api/AuthApi";

const PersistLogin = () => {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const effectRan = useRef(false);

  const [refresh, { isLoading, isSuccess, isError, error }] = useRefreshMutation();

  useEffect(() => {
    if (!effectRan.current && token && persist && process.env.NODE_ENV !== 'development') {
      const verifyRefreshToken = async () => {
        console.log('verifying refresh token');
        try {
          await refresh(undefined);
        } catch (err) {
          console.error(err);
        } finally {
          effectRan.current = true;
        }
      };
      verifyRefreshToken();
    }
  }, [persist, refresh, token]);

  let content;
  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isError) {
    content = (
      <p className='errs'>
        {`Error: ${error} - `}
        <Link to="/login">Please login again</Link>.
      </p>
    );
  } else if (isSuccess) {
    content = <Outlet />;
  }

  return content;
};

export default PersistLogin;
