import { Anchor } from "@/app/types";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useEffect } from "react";

interface ScrollToAnchorProps {
  anchor: Anchor;
  setScrollAnchor: Dispatch<SetStateAction<Anchor>>;
}

const ScrollToAnchor: React.FC<ScrollToAnchorProps> = ({
  anchor,
  setScrollAnchor,
}) => {
  const scrollTo = () => {
    const scrollY = anchor === Anchor.Top ? 0 : document.body.scrollHeight;

    if (anchor === Anchor.Bottom) {
      setScrollAnchor(Anchor.Top);
    } else {
      setScrollAnchor(Anchor.Bottom);
    }

    window.scrollTo({
      top: scrollY,
      behavior: "smooth",
    });
  };

  const icon = anchor === Anchor.Top ? "/arrow-up.svg" : "/arrow-down.svg";
  const anchorTooltip =
    anchor === Anchor.Top ? "Scroll to top" : "Scroll to bottom";

  return (
    <button
      className="h-[50px] w-[50px] fixed bottom-[90px] right-6 rounded-[50%] bg-blue-400 text-white flex items-center justify-center"
      onClick={scrollTo}
      title={anchorTooltip}
    >
      <Image height={28} width={28} alt="scroll to text" src={icon} />
    </button>
  );
};

export default ScrollToAnchor;
