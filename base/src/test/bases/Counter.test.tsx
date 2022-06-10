import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Counter } from "../../bases/Counter";

describe('testing counter', () => { 

    test("should start counter on 0", () => {
        render(<Counter />);
        expect(screen.getByRole("heading",{name: /counter/i })).toHaveTextContent(/: 0/i);
    });
    test('should start counter at any number', () => { 
        //get random number between 0 and 100
        const randomNumber = Math.floor(Math.random() * 100);
        render(<Counter initialValue={randomNumber} />);
        expect(screen.getByRole("heading",{name: /counter/i })).toHaveTextContent(new RegExp(`: ${randomNumber}`));
     })
    test("should increment counter", async () => {
        render(<Counter />);
        const incrementButton = screen.getByRole("button", { name: "+1" });
        userEvent.click(incrementButton);
        expect(screen.getByText(/counter: 1/i)).toBeInTheDocument();
    });

    test('should decrement counter', () => { 
        render(<Counter />);
        const decrementButton = screen.getByRole("button", { name: "-1" });
        userEvent.click(decrementButton);
        expect(screen.getByText(/counter: -1/i)).toBeInTheDocument();
     })
})
