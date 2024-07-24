import { lazy } from "react";

const HomePage = lazy(() => import("./HomePage"));
const ViewSpace = lazy(() => import("./ViewSpace"));
const SingleWorkSpace = lazy(() => import("./SingleWorkSpace"));
const FolderView = lazy(() => import("./FolderView"));
const ListView = lazy(() => import("./ListView"));
const ResourceView = lazy(() => import("./ResourceView"));
const SingleFolder = lazy(() => import("./SingleFolder"));
const ListFolderView = lazy(() => import("./ListFolderView"));
const SingleListFolderView = lazy(() => import("./SingleListFolderView"));
const NotificationPage = lazy(() => import("./NotificationPage"));
const TaskView = lazy(() => import("./TaskView"));
const Invite = lazy(() => import("./Invite"));
const MembersAddingSpace = lazy(() => import("./MembersAddingSpace"));
const VideoCall = lazy(() => import("./VideoCall"));
const ProfilePage = lazy(() => import("./ProfilePage"));
const CommentsPage = lazy(() => import("./CommentsPage"));

export {
  HomePage,
  ViewSpace,
  SingleWorkSpace,
  FolderView,
  ListView,
  ResourceView,
  SingleFolder,
  ListFolderView,
  SingleListFolderView,
  NotificationPage,
  TaskView,
  Invite,
  MembersAddingSpace,
  VideoCall,
  ProfilePage,
  CommentsPage,
};
