import React, { useEffect, useState } from "react";
import axios from "axios";
import { ScoopOptions } from "./ScoopOptions";
import { Alert, Row } from "react-bootstrap";
import { ToppingOptions } from "./ToopingOptions";
import { pricePerItem } from "../../constant";
import { formatNumberCurrency, useOrderDetails } from "../../context/OrderDetails";

export const Options = ({ optionType }) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState({ error: false, message: "" });
  const [orderDetails, setOrderDetails] = useOrderDetails();

  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(({ data }) => {
        setItems(data);
      })
      .catch((err) => {
        setError({ error: true, message: err.message });
      });
  }, [optionType]);

  const ItemComponent = optionType === "scoops" ? ScoopOptions : ToppingOptions;
  const title = optionType[0].toUpperCase() + optionType.slice(1);

  const optionsItems = items.map((item) => {
    return (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
        setItemCount={(itemName, newItemCount)=> setOrderDetails(optionType, itemName, newItemCount)}
      />
    );
  });
  if (error.error) {
    return (
      <Alert variant="danger">
        an unexpected error has ocurred, please try later
      </Alert>
    );
  } else
    return (
      <>
        <h2>{title}</h2>
        <p>{formatNumberCurrency(pricePerItem[optionType])} each</p>
        <p>{title} total: {formatNumberCurrency(orderDetails.total[optionType])}</p>
        <Row>{optionsItems}</Row>
      </>
    );
};