import { Link } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { useState } from "react";

import {PhaseexAi} from "../../components/AI/index";

const AIHomepage = () => {
  const [typingStatus, setTypingStatus] = useState("human1");

  return (
    <div className="homepage flex items-center gap-[100px] h-full flex-col lg:flex-row lg:gap-0 m-auto">
      <img src="/ai/orbital.png" alt="" className="w-full h-full absolute bottom-0 left-0 opacity-5 z-[-1] animate-[rotateOrbital_100s_linear_infinite]" />
      <div className="left flex-1 flex flex-col items-center justify-center gap-4 text-center">
    <PhaseexAi/>
        <h2 className="text-2xl font-semibold">Supercharge your creativity and productivity</h2>
        <h3 className="font-normal max-w-[70%] lg:max-w-full">
        Get smarter responses, upload files, analyze images, and browse the web with our latest model.
        </h3>
        <Link to="/phaseex-ai/create" className="mt-5 px-6 py-4 bg-[#217bfe] text-white rounded-full text-sm transition hover:bg-white hover:text-[#217bfe]">
          Get a new group
        </Link>
      </div>
      <div className="right flex-1 flex items-center justify-center h-full">
        <div className="imgContainer relative flex items-center justify-center bg-[#140e2d] rounded-[50px] w-4/5 h-1/2">
          <div className="bgContainer absolute top-0 left-0 w-full h-full overflow-hidden rounded-[50px]">
            <div className="bg w-[200%] h-full bg-auto bg-no-repeat bg-center opacity-20 animate-[slideBg_8s_ease-in-out_infinite_alternate]" style={{ backgroundImage: "url('/ai/bg.png')" }}></div>
          </div>
          <img src="/ai/bot.png" alt="" className="bot w-full h-full object-contain animate-[botAnimate_3s_ease-in-out_infinite_alternate]" />
          <div className="chat absolute bottom-[-30px] right-[-50px] flex items-center gap-2.5 p-5 bg-[#2c2937] rounded-md hidden lg:flex xl:right-0">
            <img
              src={
                typingStatus === "human1"
                  ? "/ai/human1.jpeg"
                  : typingStatus === "human2"
                  ? "/ai/human2.jpeg"
                  : "/ai/bot.png"
              }
              alt=""
              className="w-8 h-8 rounded-full object-cover"
            />
            <TypeAnimation
              sequence={[
                "hello i am phaseex ai",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot:i can analyze the code",
                2000,
                () => {
                  setTypingStatus("human2");
                },
                "Human2:i can understand human language",
                2000,
                () => {
                  setTypingStatus("bot");
                },
                "Bot:i can create stories",
                2000,
                () => {
                  setTypingStatus("human1");
                },
              ]}
              wrapper="span"
              repeat={Infinity}
              cursor={true}
              omitDeletionAnimation={true}
            />
          </div>
        </div>
      </div>
      <div className="terms absolute bottom-5 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-5">
    <div className="flex gap-4 my-auto items-center ">
    <img src="/favicon/favicon.ico" alt="" className="w-4 h-4 items-center" />
    <h4>phaseex ai tool</h4>
    </div>
        <div className="links flex gap-2.5 text-[#888] text-xs">
          <Link to="">Terms of Service</Link>
          <span>|</span>
          <Link to="/">Privacy Policy</Link>
        </div>
      </div>
    </div>
  );
};

export default AIHomepage;
