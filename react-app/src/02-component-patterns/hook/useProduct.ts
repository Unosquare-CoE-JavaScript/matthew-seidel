import { Product } from "./../interfaces/ProductCart.interface";
import { useEffect, useRef, useState } from "react";
import { onChangeArgs } from "../interfaces/ProductCart.interface";
interface useProductProps {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
}: useProductProps) => {
  const [counter, setCounter] = useState(value);

  const isControlled = useRef(!!onChange);
  const handleChange = (value: number = 1) => {
    if (isControlled.current) {
      return onChange!({
        product,
        quantity: value,
      });
    }
    const newValue = Math.max(0, counter + value);
    setCounter(newValue);
    onChange && onChange({ product, quantity: newValue });
  };

  useEffect(() => {
    setCounter(value);
  }, [value]);

  return { counter, handleChange };
};
