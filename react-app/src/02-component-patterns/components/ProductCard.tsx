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
  value
}: ProductCartProps) => {
  const { counter, handleChange } = useProduct({onChange, product, value});

  return (
    <Provider
      value={{
        counter,
        handleChange,
        product,
      }}
    >
      <div className={`${styles.productCard} ${className}`} style={style}>
        {children}
        {/* <img src={noImage} alt="no img" /> */}
      </div>
    </Provider>
  );
};
ProductCard.Title = ProductTitle;
ProductCard.Image = ProductImage;
ProductCard.Buttons = ProductButtons;
