
import Lottie from 'react-lottie'; 

interface LootieProps {
  animationData:  object; 
}


export function LottieAnimation({animationData}:LootieProps) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData, 
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  }
  return (
      <div className="">
        <Lottie options={defaultOptions} height={200} width={200}  />
      </div>
  );
}
