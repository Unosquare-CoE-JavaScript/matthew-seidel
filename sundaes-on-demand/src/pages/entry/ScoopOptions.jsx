import React, { useState } from "react";
import { Col, Form } from "react-bootstrap";

export const ScoopOptions = ({ name, imagePath, setItemCount }) => {

  const handleChange = (e) => {
    setItemCount(name, e.target.value)
}
  return (
    <Col xs={12} sm={6} md={4} lg={3} style={{ textAlign: "center" }}>
      <img
        width="75%"
        src={`http://localhost:3030/${imagePath}`}
        alt={`${name} scoop`}
      />
      <Form.Group controlId={`${name}-count`} style={{
        marginTop: "1rem",
        display: "flex",
        justifyContent: "space-around"
      }}>
        <Form.Label column xs={6}>
          {name}
        </Form.Label>
        <Col xs={3}>
          <Form.Control
            type="number" 
            min="0"
            defaultValue={0}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </Col>
  );
};
