import { useState } from "react";

interface props {
  initialValue?: number;
  children?: React.ReactNode;
}

export const Counter = ({ initialValue = 0 }: props) => {
  const [counter, setCount] = useState(initialValue);
  const handelIncrement = () => {
    setCount(counter + 1);
  };
  const handelDecrement = () => {
    setCount(counter - 1);
  };
  return (
    <>
      <h1>Counter: {counter}</h1>
      <button onClick={handelIncrement}>+1</button>
      <button onClick={handelDecrement}>-1</button>
    </>
  );
};
