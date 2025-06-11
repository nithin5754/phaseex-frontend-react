


import { ITemplateAboutType } from "@/components/template/About/TemplateAbout";
import { motion } from "motion/react";


export const AnimatedTestimonials = ({
  testimonials,

}: {
  testimonials: ITemplateAboutType;
  autoplay?: boolean;
}) => {




  return (
    <div className="mx-auto max-w-sm px-4  font-sans antialiased md:max-w-4xl md:px-8 lg:px-12">
      <div className="relative grid grid-cols-1 gap-20 md:grid-cols-1">
  
        <div className="flex flex-col justify-between py-2">
          <motion.div
         
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            exit={{
              y: -20,
              opacity: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeInOut",
            }}
          >
            <h3 className="text-2xl font-bold text-black dark:text-white">
             {testimonials.type}/{testimonials.title.toLocaleUpperCase()}
            </h3>
            <p className="text-sm text-gray-500 dark:text-neutral-500">
              {testimonials.owner_name}
            </p>
            <motion.p className="mt-8 text-lg text-gray-500 dark:text-neutral-300">
              {testimonials.description.split(" ").map((word, index) => (
                <motion.span
                  key={index}
                  initial={{
                    filter: "blur(10px)",
                    opacity: 0,
                    y: 5,
                  }}
                  animate={{
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                  }}
                  transition={{
                    duration: 0.2,
                    ease: "easeInOut",
                    delay: 0.02 * index,
                  }}
                  className="inline-block"
                >
                  {word}&nbsp;
                </motion.span>
              ))}
            </motion.p>
          </motion.div>

        </div>
      </div>
    </div>
  );
};
