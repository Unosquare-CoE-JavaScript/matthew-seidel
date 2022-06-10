import { useCounter } from "../hooks/useCounter";

export const MAX_COUNT = 10;

export const CounterHook = () => {
  const { counter, counterElement, handelDecrement, handelIncrement} =  useCounter()
  return (
    <>
      <h1>Counter</h1>
      <h2 data-testid="counter" ref={counterElement}>{counter}</h2>
      <button onClick={handelIncrement}>+1</button>
      <button onClick={handelDecrement}>-1</button>
    </>
  );
};
