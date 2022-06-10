import { render } from "@testing-library/react";
import { ReactElement } from "react";
import { OrderDetailsProvider } from "../context/OrderDetails";

// const renderWithProvider =  (Ui, options ) => render(<Ui />, {wrapper: OrderDetailsProvider, ...options});

function renderWithProvider (Ui, options) {
  
  return render(Ui, { wrapper: OrderDetailsProvider, ...options });
}

//re-export everything

export * from "@testing-library/react";

export { renderWithProvider as render };
