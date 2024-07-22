import Lottie from "react-lottie";

interface LootieProps {
  animationData: object;
  height: number;
  width: number;
}

export function LottieAnimation({ animationData, height, width }: LootieProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="">
      <Lottie options={defaultOptions} height={height} width={width} />
    </div>
  );
}
