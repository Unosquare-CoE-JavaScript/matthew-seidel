import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { pricePerItem } from "../constant";

export const formatNumberCurrency = (number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(number);
};

const OrderDetailsContext = createContext();

export const useOrderDetails = () => {
  const context = useContext(OrderDetailsContext);
  if (!context) {
    throw new Error(
      "useOrderDetails must be used within a OrderDetailsProvider"
    );
  }
  return context;
};

export const OrderDetailsProvider = (props) => {
  const [optionCounts, setOptionCounts] = useState({
    scoops: new Map(),
    toppings: new Map(),
  });

  const [total, setTotal] = useState({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  const calculateSubTotal = (optionType, count) => {
    let total = 0;
    
    //totalize the total of each option
    optionCounts[optionType].forEach((count) => {
      total += parseInt(count) * pricePerItem[optionType];
    });
    return total
  };

  useEffect(() => {
    const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotal({
      scoops: scoopsSubTotal,
      toppings: toppingsSubTotal,
      grandTotal,
    });
  }, [optionCounts]);

  const updateTotal= ()=>{
    const scoopsSubTotal = calculateSubTotal("scoops", optionCounts);
    const toppingsSubTotal = calculateSubTotal("toppings", optionCounts);
    const grandTotal = scoopsSubTotal + toppingsSubTotal;
    setTotal({
      scoops: scoopsSubTotal,
      toppings: toppingsSubTotal,
      grandTotal,
    });
  }

  const value = useMemo(() => {
    function updateItemCount(itemType, itemName, count) {
      const newOptionCounts = { ...optionCounts };
      const optionCountsMap = newOptionCounts[itemType];
      optionCountsMap.set(itemName, parseInt(count));

      setOptionCounts(newOptionCounts);
    }
    return [{ ...optionCounts, total }, updateItemCount];
  })
  
  

  return <OrderDetailsContext.Provider value={value} {...props} />;
};
