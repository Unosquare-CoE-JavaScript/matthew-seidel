import React, { useState } from "react";
import {
  Form,

  Popover,

  FormGroup,

  OverlayTrigger,
} from "react-bootstrap";

export const SummaryForm = () => {
  const [termsAccepted, setTermsAccepted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(termsAccepted);
  };
  
  const termsOverlay = (
    <Popover id="terms-and-condition-popover" title="Terms and Conditions">
      <Popover.Body>No ice cream actually will be delivered</Popover.Body>
    </Popover>
  );

  const termsAndConditions = (
    <span>
      I have read and accept the
      <OverlayTrigger trigger={["hover","focus"]} placement="right" overlay={termsOverlay}>
        <label>Terms and Conditions</label>
      </OverlayTrigger>
    </span>
  );

  return (
    <Form>
      <FormGroup controlId="terms-and-condition">
        <Form.Check
          id="terms-and-condition"
          type="checkbox"
          onChange={() => setTermsAccepted(!termsAccepted)}
          value={termsAccepted}
          name="terms-and-condition"
          label={termsAndConditions}
        />
      </FormGroup>
      <FormGroup controlId="submit">
        <Form.Control
          type="submit"
          value="order!"
          onClick={handleSubmit}
          disabled={!termsAccepted}
        />
      </FormGroup>
    </Form>
  );
};
