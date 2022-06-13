import {
  InitialValuesProps,
  Product,
} from "./../interfaces/ProductCart.interface";
import { useEffect, useRef, useState } from "react";
import { onChangeArgs } from "../interfaces/ProductCart.interface";
interface useProductProps {
  product: Product;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
  initialValues?: InitialValuesProps;
}

export const useProduct = ({
  onChange,
  product,
  value = 0,
  initialValues,
}: useProductProps) => {
  const [counter, setCounter] = useState<number>(
    initialValues?.quantity || value
  );

  const isMounted = useRef(false);

  const isControlled = useRef(!!onChange);
  const handleChange = (value: number = 1) => {
    
    if (isControlled.current) {
      return onChange!({
        product,
        quantity: value,
      });
    }
    let newValue = Math.max(0, counter + value);

    if (initialValues?.maxCount)
      newValue = Math.min(newValue, initialValues.maxCount);

    setCounter(newValue);
    onChange && onChange({ product, quantity: newValue });
  };

  const reset = () => {
    setCounter(initialValues?.quantity || 0);
    onChange && onChange({ product, quantity: 0 });
  };

  useEffect(() => {
    if (!isMounted.current) return;
    setCounter(value);
  }, [value]);
  useEffect(() => {
    isMounted.current = true;

    return () => {
      isMounted.current = false;
    };
  }, []);

  return {
    counter,
    handleChange,
    isMaxCountReached:
      !!initialValues?.maxCount && initialValues.maxCount === counter,
    reset,
  };
};
