import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const MAX_COUNT = 10;
const timeLine = gsap.timeline();

export const useCounter = () => {
  const [counter, setCount] = useState(5);
  const counterElement = useRef<HTMLHeadingElement>(null);
  const handelIncrement = () => {
    setCount((prev) => Math.min(prev + 1, MAX_COUNT));
  };
  const handelDecrement = () => {
    setCount(counter - 1);
  };

  useLayoutEffect(() => {
    timeLine.to(counterElement.current, {
      y: -10,
      duration: 0.4,
      ease: "power2.in",
    }).to(counterElement.current, {
      y: 10,
      duration: 0.4,
      ease: "bounce.out",
    }).pause();
  }, []);

  useEffect(() => {
    timeLine.play(0);
  }, [counter]);

  return {
    counter,
    handelDecrement,
    handelIncrement,
    counterElement,
  };
};
