import { useState } from "react";

interface props {
  initialValue?: number;
  children?: JSX.Element | JSX.Element[];
}

interface useCounter {
  count: number;
  clicks: number;
}

export const CounterBy = ({ initialValue = 5, children }: props) => {
  const [counter, setCount] = useState<useCounter>({
    count: initialValue,
    clicks: 0,
  });
  const handleChange = (quantity = 1) => {
    setCount({ count: counter.count + quantity, clicks: counter.clicks + 1 });
  };
  return (
    <>
      <h1>Counter: {counter.count}</h1>
      <h2>Clicks: {counter.clicks}</h2>
      <button onClick={() => handleChange(1)}>+1</button>
      <button onClick={() => handleChange(5)}>+5</button>
      <button onClick={() => handleChange(-1)}>-1</button>
      <button onClick={() => handleChange(-5)}>-5</button>
    </>
  );
};
