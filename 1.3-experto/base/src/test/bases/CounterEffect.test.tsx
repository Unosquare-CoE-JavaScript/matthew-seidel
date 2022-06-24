import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CounterEffect, MAX_COUNT } from "../../bases/CounterEffect";

describe("testing counter", () => {
  test("should start counter on 5", () => {
    render(<CounterEffect />);
    expect(screen.getByTestId("counter").innerHTML).toBe("5");
  });

  test("should increment counter", async () => {
    render(<CounterEffect />);
    const incrementButton = screen.getByRole("button", { name: "+1" });
    userEvent.click(incrementButton);
    expect(screen.getByTestId("counter").innerHTML).toBe("6");
  });

  test("should decrement counter", () => {
    render(<CounterEffect />);
    const decrementButton = screen.getByRole("button", { name: "-1" });
    userEvent.click(decrementButton);
    expect(screen.getByTestId("counter").innerHTML).toBe("4");
  });

  test("should not increment above MAX_COUNT constant", () => {
    render(<CounterEffect />);
    const incrementButton = screen.getByRole("button", { name: "+1" });
    //get random number between 0 and 10
    const randomNumber = Math.floor(Math.random() * 10);
    for (let index = 0; index < MAX_COUNT + randomNumber; index++) {
      userEvent.click(incrementButton);
    }
    expect(screen.getByTestId("counter").innerHTML).toBe(MAX_COUNT + "");
  });
  test("should not increment til MAX_COUNT and then could decrement", () => {
    render(<CounterEffect />);
    const incrementButton = screen.getByRole("button", { name: "+1" });
    const decrementButton = screen.getByRole("button", { name: "-1" });
    //get random number between 0 and 10
    const randomNumber = Math.floor(Math.random() * 10);
    for (let index = 0; index < MAX_COUNT + randomNumber; index++) {
      userEvent.click(incrementButton);
    }
    userEvent.click(decrementButton);
    //convert number to string
    expect(screen.getByTestId("counter").innerHTML).toBe(MAX_COUNT - 1 + "");
  });
 
});
