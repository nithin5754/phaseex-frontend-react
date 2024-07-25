
import { ActivityIcon, Bell, Command, File, List, Video } from "lucide-react";
import { LandingHoverEffects } from "../aceternityuI/cards/LandingHoverEffects";




export function Box() {
  return (
    <div className="max-w-5xl mx-auto px-8 py-0">
 
      <LandingHoverEffects items={projects} />
    </div>
  );
}
export const projects = [
  {
    title: "COMMENTS",
    description:
      "The Comment Feature in our phaseex App enhances project coordination by allowing users to post notes, queries, updates, and feedback directly on todo sub task ",
    link: "",
    icon:Command
  },
  {
    title: "NOTIFICATIONS",
    description:
      "The Notification Feature in a Project Management Tool App serves as a critical component for enhancing productivity and efficiency among team members. It operates as an alerting mechanism that notifies users of significant events, updates, or actions related to their projects or tasks.",
    link: "",
    icon:Bell
  },
  {
    title: "VIDEO CALL CHAT",
    description:
      "The Video Call feature in a Project Management Tool app enhances collaboration and communication among team members by enabling real-time, face-to-face interactions.",
    link: "",
    icon:Video
  },
  {
    title: "ACTIVITY",
    description:
      "In a project management tool application, the activity feature plays a crucial role in monitoring and managing the tasks required to achieve project goals",
    link: "",
    icon:ActivityIcon
  },
  {
    title: "FILE UPLOAD",
    description:
      "The file upload feature in a project management tool app serves as a centralized hub for storing and sharing project-related documents, images, ",
    link: "",
    icon:File
  },
  {
    title: "TODO APP",
    description:
      "The Todo app feature within a project management tool serves as a centralized hub for organizing, tracking, and managing tasks efficiently.",
    link: "",
    icon:List
  },
];
