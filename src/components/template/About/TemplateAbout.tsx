import { AnimatedTestimonials } from "@/components/aceternityuI/animated/animated-testimonials";
import { FC } from "react";

export interface ITemplateAboutType {
  title:string;
  owner_name:string;
  type:"workspace"|"folder"|"list"|"task";
  description:string;
  date:string

}


const TemplateAbout:FC<{templateAbout:ITemplateAboutType}> = ({templateAbout}) => {
 return <AnimatedTestimonials testimonials={templateAbout} />;
}
export default TemplateAbout
