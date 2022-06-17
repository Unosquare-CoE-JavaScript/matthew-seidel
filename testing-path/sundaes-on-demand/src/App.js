import logo from "./logo.svg";
import "./App.css";
import { SummaryForm } from "./pages/summary/SummaryForm";
import { Container } from "react-bootstrap";
import { OrderEntry } from "./pages/entry/OrderEntry";
import { OrderDetailsProvider } from "./context/OrderDetails";

function App() {
  return (
    <OrderDetailsProvider>
      <Container>
        <OrderEntry />
        <SummaryForm />
      </Container>
    </OrderDetailsProvider>
  );
}

export default App;
