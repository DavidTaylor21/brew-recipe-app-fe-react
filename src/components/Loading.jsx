import { lineWobble } from "ldrs";

const Loading = () => {
  lineWobble.register();

  return (
    <l-line-wobble
      size="80"
      stroke="5"
      bg-opacity="0.1"
      speed="1.75"
      color="black"
    ></l-line-wobble>
  );
};

export default Loading
