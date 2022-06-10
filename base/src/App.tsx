import React from "react";
import { Counter } from "./bases/Counter";
import { CounterBy } from "./bases/CounterBy";
import { CounterEffect } from "./bases/CounterEffect";
import { CounterHook } from "./bases/CounterHook";
import { CounterReducerComponent } from "./bases/CounterReducer";

function App() {
  return (
    <>
      <Counter />
      <CounterBy />
      <CounterEffect />
      <CounterHook />
      <CounterReducerComponent />

    </>
  );
}

export default App;
