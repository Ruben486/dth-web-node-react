import { Player, Controls } from "@lottiefiles/react-lottie-player";

export const LottieFiles= ({lotie,height,width}) => {
  return (
    <Player
      autoplay
      loop
      src={lotie}
      style={{ height:{height}, width:{width} }}
    >
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
};

