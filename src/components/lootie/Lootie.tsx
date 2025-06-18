
import { Player } from "@lottiefiles/react-lottie-player";

interface LootieProps {
  animationData: object;
  height: number;
  width: number;
}

export function LottieAnimation({ animationData, height, width }: LootieProps) {
  return (
    <div>
      <Player
        autoplay
        loop
        src={animationData}
        style={{ height: `${height}px`, width: `${width}px` }}
      />
    </div>
  );
}
