import loginCoverPage from "/png/cover-page-2.png";
const AuthSideImg = () => {
  return (
    <div className="lg:flex hidden w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 justify-around items-center">
      <div>
        <img src={loginCoverPage} alt="login cover page" />
      </div>
    </div>
  );
};
export default AuthSideImg;
