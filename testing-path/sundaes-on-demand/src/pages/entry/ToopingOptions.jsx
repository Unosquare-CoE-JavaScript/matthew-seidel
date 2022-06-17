import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

export const ToppingOptions = ({name, imagePath,setItemCount}) => {

  const handleChange = (e) => {
    setItemCount(name, e.target.value)
}
  return (
    <Col style={{textAlign:'center'}} xs={12} md={6} lg={3}>
        <img width="75%" src={`http://localhost:3030/${imagePath}`} alt={`${name} topping`} />
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
  )
}
