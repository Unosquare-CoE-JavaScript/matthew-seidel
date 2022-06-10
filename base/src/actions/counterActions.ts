export type counterAction =
  | { type: "increaseBy"; payload: { value: number } }
  | { type: "decrementBy"; payload: { value: number } }
  | { type: "reset" };

export const doReset = (): counterAction => ({ type: "reset" });
export const doIncreaseBy = (value: number): counterAction => ({
  type: "increaseBy",
  payload: { value },
});
export const doDecrementBy = (value: number): counterAction => ({
  type: "decrementBy",
  payload: { value },
});
