import styles from "../styles/styles.module.css";
import { useProduct } from "../hook/useProduct";
import {
  ProductCartProps,
  ProductContextProps,
} from "../interfaces/ProductCart.interface";
import { createContext } from "react";
import { ProductImage } from "./ProductImage";
import { ProductTitle } from "./ProductTitle";
import { ProductButtons } from "./ProductButtons";

export const ProductContext = createContext({} as ProductContextProps);

const { Provider } = ProductContext;

export const ProductCard = ({
  product,
  children,
  className = "",
  style,
  onChange,
  value,
  initialValues
}: ProductCartProps) => {

  const { counter, handleChange, isMaxCountReached, reset } = useProduct({onChange, product, value, initialValues});

  return (
    <Provider
      value={{
        counter,
        handleChange,
        product,
        maxCount: initialValues?.maxCount
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children!({
           count: counter,
           isMaxCountReached,
           maxCount: initialValues?.maxCount,
           product,
           handleChange,
           reset
          
        })}
        {/* <img src={noImage} alt="no img" /> */}
      </div>
    </Provider>
  );
};
ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;
