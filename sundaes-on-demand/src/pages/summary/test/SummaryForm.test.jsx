import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { SummaryForm } from "../SummaryForm";

describe("SummaryForm", () => {
  test("should be disabled by default the button", () => {
    render(<SummaryForm />);
    var button = screen.getByRole("button", { name: "order!" });
    expect(button).toBeDisabled();
  });
  test("should enable when click on checkbox", async () => {
    render(<SummaryForm />);
    var button = screen.getByRole("button", { name: "order!" });
    var checkbox = screen.getByRole("checkbox", {
      name: /terms and condition/i,
    });
    await userEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    expect(button).not.toBeDisabled();
  });

  test("should display popover terms and conditions", async () => {
    render(<SummaryForm />);
    const nullPopover = screen.queryByText(
      /no ice cream actually will be delivered/i
    );
    expect(nullPopover).not.toBeInTheDocument();
    const termsAndConditions = screen.getByText(/terms and conditions/i);
    await userEvent.hover(termsAndConditions);
    const popover = screen.getByText(
      /No ice cream actually will be delivered/i
    );
    expect(popover).toBeInTheDocument();

    await userEvent.unhover(termsAndConditions);

    const nullPopoverAgain = screen.queryByText(
      /no ice cream actually will be delivered/i
    );
    expect(nullPopoverAgain).not.toBeInTheDocument();
  });
});
