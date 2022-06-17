import React from 'react'
import { formatNumberCurrency, useOrderDetails } from '../../context/OrderDetails';

export const Total = () => {
    const [{total}] = useOrderDetails();
  return (
    <h2 data-testid='grand-total'>Total: {formatNumberCurrency(total.grandTotal)}</h2>
  )
}
