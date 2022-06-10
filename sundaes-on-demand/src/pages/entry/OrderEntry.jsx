import React from 'react'
import { Options } from './Options'
import { Total } from './Total'

export const OrderEntry = () => {
  return (
      <>    
    <Options optionType="scoops"/>
    <Options optionType="toppings"/>
    <Total/>
      </>
  )
}
