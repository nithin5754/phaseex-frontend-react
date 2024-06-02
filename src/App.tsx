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

  SingleFolder,
  ListFolderView,
  SingleListFolderView,
} from "./features/main-sections/index";

import DashBoard from "./components/DashBoard";
import LandingPage from "./components/LandingPage";

import Hello from "./components/Hello";
import PersistLogin from "./features/auth/PersistLogin";
import { MainLayout, SpaceLayout } from "./features/layouts/index";
import { SearchPeople } from "./components/memebers/index";

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
                    <Route path=":folderId">
                      <Route index element={<SingleFolder />} />
                      <Route path="lists">
                        <Route index element={<ListFolderView />} />
                        <Route
                          path=":listId"
                          element={<SingleListFolderView />}
                        />
                      </Route>
                    </Route>
                  </Route>
                  <Route path="lists" element={<ListView />} />
                  <Route path="members" element={<SearchPeople />} />
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
