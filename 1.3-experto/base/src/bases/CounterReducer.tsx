import { useReducer } from "react";
import { doDecrementBy, doIncreaseBy, doReset } from "../actions/counterActions";
import { counterReducer, INITIAL_STATE } from "../Reducer/counterReudcer";

export const CounterReducerComponent = () => {
  const [{ count, changes, previous }, dispatch] = useReducer(
    counterReducer,
    INITIAL_STATE
  );
  const handelIncrement = (value = 1) => {
    dispatch(doIncreaseBy(value));
  };
  const handelDecrement = (value = 1) => {
    dispatch(doDecrementBy(value));
  };
  const handleReset = () => {
    dispatch(doReset())
  };
  return (
    <>
      <h1>Counter: {count}</h1>
      <h1>Previous: {previous}</h1>
      <h1>changes: {changes}</h1>
      <button onClick={() => handelIncrement()}>+1</button>
      <button onClick={() => handelIncrement(5)}>+5</button>
      <button onClick={() => handelDecrement()}>-1</button>
      <button onClick={() => handelDecrement(5)}>-5</button>

      <button onClick={() => handleReset()}>Reset</button>
    </>
  );
};
