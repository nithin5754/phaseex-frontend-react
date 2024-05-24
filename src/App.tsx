import { Route, Routes } from "react-router-dom";
import {
  Login,
  Register,
  VerifyOtp,
  ChangeForgotAuthPassword,
  ForgotAuth,
  ForgotOtpVerify,
  RequireAuth,
} from "./features/auth/index";
import {

  HomePage,
  SingleWorkSpace,
  ViewSpace,
  FolderView,
  ListView,
  ResourceView,
  SingleFolder,
} from "./features/main-sections/index";

import DashBoard from "./components/DashBoard";
import LandingPage from "./components/LandingPage";

import Hello from "./components/Hello";
import PersistLogin from "./features/auth/PersistLogin";
import { MainLayout, SpaceLayout } from "./features/layouts/index";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />

          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="verify-otp" element={<VerifyOtp />} />
          <Route path="verify-auth-forgot-password" element={<ForgotAuth />} />
          <Route path="verify-auth-forgot-otp" element={<ForgotOtpVerify />} />
          <Route
            path="change-forgot-password"
            element={<ChangeForgotAuthPassword />}
          />

          {/* <Route element={<PersistLogin />}> */}
          <Route element={<RequireAuth />}>
            <Route element={<MainLayout />}>
              <Route path="homepage" element={<HomePage />} />

              <Route path="space">
                <Route index element={<ViewSpace />} />
                <Route path=":id" element={<SpaceLayout />}>
                  <Route index element={<SingleWorkSpace />} />
                  <Route path="folders">
                    <Route index element={<FolderView />} />
                    <Route path=":folderId" element={<SingleFolder />} />
                  </Route>

                  <Route path="lists" element={<ListView />} />
                  <Route path="resources" element={<ResourceView />} />
                </Route>
              </Route>
              <Route path="dashboard" element={<DashBoard />} />
              <Route path="hello" element={<Hello />} />
            </Route>
          </Route>
        </Route>

        {/* </Route> */}
      </Routes>
    </div>
  );
}

export default App;
