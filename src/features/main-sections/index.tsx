import { lazy } from "react";
const HomePage = lazy(() => import("./HomePage"));
const SingleWorkSpace = lazy(() => import("./SingleWorkSpace"));
import FolderView from "./FolderView";
import ResourceView from "./ResourceView";
import SingleFolder from "./SingleFolder";
import SingleListFolderView from "./SingleListFolderView";
import NotificationPage from "./NotificationPage";
import TaskView from "./TaskView";
import Invite from "./Invite";
import MembersAddingSpace from "./MembersAddingSpace";
import VideoCall from "./VideoCall";
import ProfilePage from "./ProfilePage";
import CommentsPage from "./CommentsPage";
import AIchatPage from "./AIchatPage";

export {
  HomePage,
  SingleWorkSpace,
  FolderView,
  ResourceView,
  SingleFolder,
  SingleListFolderView,
  NotificationPage,
  TaskView,
  Invite,
  MembersAddingSpace,
  VideoCall,
  ProfilePage,
  CommentsPage,
  AIchatPage,
};
