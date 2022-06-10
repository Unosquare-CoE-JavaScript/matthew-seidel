import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CounterBy } from "../../bases/CounterBy";

describe("counter by tests", () => {
  test("should start counter on 5 and clicks in 0", () => {
    render(<CounterBy />);
    expect(screen.getByRole("heading", { name: /counter/i })).toHaveTextContent(
      /: 5/i
    );
    expect(screen.getByRole("heading", { name: /clicks/i })).toHaveTextContent(
      /: 0/i
    );
  });
  test("should start counter at any number", () => {
    //get random number between 0 and 100
    const randomNumber = Math.floor(Math.random() * 100);
    render(<CounterBy initialValue={randomNumber} />);
    expect(screen.getByRole("heading", { name: /counter/i })).toHaveTextContent(
      new RegExp(`: ${randomNumber}`)
    );
  });
  test("should increment counter", async () => {
    render(<CounterBy />);
    const incrementButton = screen.getByRole("button", { name: "+1" });
    userEvent.click(incrementButton);
    expect(screen.getByText(/counter: 6/i)).toBeInTheDocument();
  });
  test("should increment number of clicks", () => {
    render(<CounterBy />);
    //random number between 1 and 5
    const randomNumber = Math.floor(Math.random() * 5) + 1;
    const incrementButton = screen.getByRole("button", { name: "+1" });
    for (let index = 0; index < randomNumber; index++) {
      userEvent.click(incrementButton);
    }
    expect(
      screen.getByText(new RegExp(`: ${randomNumber}`))
    ).toBeInTheDocument();
  });
  test("should increment +5", () => {
    render(<CounterBy />);
    const incrementButton = screen.getByRole("button", { name: "+5" });
    userEvent.click(incrementButton);
    expect(screen.getByText(/counter: 10/i)).toBeInTheDocument();
  });
  test("should decrement counter", () => {
    render(<CounterBy />);
    const decrementButton = screen.getByRole("button", { name: "-1" });
    userEvent.click(decrementButton);
    expect(screen.getByText(/counter: 4/i)).toBeInTheDocument();
  });
  test("should decrement -5", () => {
    render(<CounterBy />);
    const decrementButton = screen.getByRole("button", { name: "-5" });
    userEvent.click(decrementButton);
    expect(screen.getByText(/counter: 0/i)).toBeInTheDocument();
  });
});
