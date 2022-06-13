import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from "../styles/styles.module.css";
import { StylesProps } from "../interfaces/ProductCart.interface";

export const ProductButtons = ({className,style}:StylesProps) => {
    const { handleChange, counter } = useContext(ProductContext);
    return (
      <div className={`${styles.buttonsContainer} ${className}`} style={style}>
        <button onClick={() => handleChange(-1)} className={styles.buttonMinus}>
          -
        </button>
        <div className={styles.countLabel}>{counter}</div>
        <button className={styles.buttonAdd} onClick={() => handleChange()}>
          +
        </button>
      </div>
    );
  };