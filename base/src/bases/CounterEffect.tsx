import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
export const MAX_COUNT = 10;

export const CounterEffect = () => {
  const [counter, setCount] = useState(5);
  const counterElement = useRef<HTMLHeadingElement>(null)
  const handelIncrement = () => {
    setCount((prev) => Math.min(prev + 1, MAX_COUNT));
  };
  const handelDecrement = () => {
    setCount(counter - 1);
  };

  useEffect(() => {
    if (counter < MAX_COUNT) return;

    const timeLine = gsap.timeline();
    timeLine.to(counterElement.current,{y: -10, duration: 1, ease: "power2.inOut"})
    timeLine.to(counterElement.current,{y: 10, duration: 1, ease: "bounce.out"})
    

    
  }, [counter]);

  return (
    <>
      <h1>Counter</h1>
      <h2 data-testid="counter" ref={counterElement}>{counter}</h2>
      <button onClick={handelIncrement}>+1</button>
      <button onClick={handelDecrement}>-1</button>
    </>
  );
};
