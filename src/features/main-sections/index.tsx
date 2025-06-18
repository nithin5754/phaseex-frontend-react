import { lazy } from "react";
const HomePage = lazy(() => import("./HomePage"));
const SingleWorkSpace = lazy(() => import("./SingleWorkSpace"));

import ResourceView from "./ResourceView";
import SingleFolder from "./SingleFolder";
import SingleListFolderView from "./SingleListFolderView";
import NotificationPage from "./NotificationPage";
import TaskView from "./TaskView";
import Invite from "./Invite";
import VideoCall from "./VideoCall";
import ProfilePage from "./ProfilePage";
import CommentsPage from "./CommentsPage";
import AIchatPage from "./AIchatPage";

export {
  HomePage,
  SingleWorkSpace,

  ResourceView,
  SingleFolder,
  SingleListFolderView,
  NotificationPage,
  TaskView,
  Invite,
  VideoCall,
  ProfilePage,
  CommentsPage,
  AIchatPage,
};
