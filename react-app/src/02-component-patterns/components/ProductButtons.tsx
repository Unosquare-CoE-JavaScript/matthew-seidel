import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from "../styles/styles.module.css";
import { StylesProps } from "../interfaces/ProductCart.interface";

export const ProductButtons = ({className,style}:StylesProps) => {
    const { handleChange, counter, maxCount } = useContext(ProductContext);
    return (
      <div className={`${styles.buttonsContainer} ${className}`} style={style}>
        <button onClick={() => handleChange(-1)} className={`${styles.buttonMinus} ${0 === counter && styles.disabled }`}>
          -
        </button>
        <div className={styles.countLabel}>{counter}</div>
        <button className={`${styles.buttonAdd} ${maxCount === counter && styles.disabled }`}  onClick={() => handleChange()}>
          +
        </button>
      </div>
    );
  };