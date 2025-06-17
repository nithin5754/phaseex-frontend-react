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
  FolderView,
  SingleFolder,
  SingleListFolderView,
  NotificationPage,
  TaskView,
  Invite,
  VideoCall,
  ProfilePage,
  CommentsPage,
} from "./features/main-sections/index";

import { LandingPage } from "./components/LandingPage";
import { MainLayout, SpaceLayout, AILayout } from "./layouts/index";
import { Suspense } from "react";
import { MainSkelton } from "./components/shimmer";
import { AIHomepage, ChatPage, CreateFormPage } from "./features/AI";
import DashBoardWorkSpace from "./features/spaces/DashBoardWorkSpace";
import { Provider } from "@radix-ui/react-toast";
import { ListContext } from "./app/context/list.context";
import ListLayout from "./layouts/ListLayout";

function App() {
  return (
    <div className="App">
      <Suspense fallback={<MainSkelton />}>
        <Routes>
          <Route path="/">
            <Route index element={<LandingPage />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="verify-otp" element={<VerifyOtp />} />
            <Route
              path="verify-auth-forgot-password"
              element={<ForgotAuth />}
            />
            <Route
              path="verify-auth-forgot-otp"
              element={<ForgotOtpVerify />}
            />
            <Route
              path="change-forgot-password"
              element={<ChangeForgotAuthPassword />}
            />
            <Route element={<RequireAuth />}>
              <Route element={<MainLayout />}>
                <Route path="homepage" element={<HomePage />} />
                <Route path="invite" element={<Invite />} />
                <Route path="profile" element={<ProfilePage />} />

                <Route path="space">
                  <Route index element={<DashBoardWorkSpace />} />
                  <Route path=":id" element={<SpaceLayout />}>
                    <Route index element={<SingleWorkSpace />} />
                    <Route path="room/:roomID" element={<VideoCall />} />
                    <Route path="folders">
                      <Route index element={<FolderView />} />
                      <Route path=":folderId">
                        <Route index element={<SingleFolder />} />

                        <Route path="lists">
                          <Route index element={<h1>lists page here ..</h1>} />
                          <Route path=":listId" element={<ListLayout/>}>
                            
                            <Route index element={<SingleListFolderView />} />
                            <Route path="tasks">
                              <Route path=":taskId">
                                <Route index element={<TaskView />} />
                                <Route path="todo">
                                  <Route
                                    path=":todoId/comments"
                                    element={<CommentsPage />}
                                  />
                                </Route>
                              </Route>
                            </Route>
                          </Route>
                        </Route>
                      </Route>
                    </Route>
                    <Route path="lists" element={<h1>list page ...</h1>} />
                  </Route>
                </Route>
                <Route element={<AILayout />}>
                  <Route path="phaseex-ai">
                    <Route index element={<AIHomepage />} />
                    <Route path="ai-chat" element={<ChatPage />} />
                    <Route path="create" element={<CreateFormPage />} />
                    <Route path="chat/:groupId" element={<ChatPage />} />
                  </Route>
                </Route>

                <Route path="hello" element={<NotificationPage />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
