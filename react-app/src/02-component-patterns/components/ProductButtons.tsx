import { useContext } from "react";
import { ProductContext } from "./ProductCard";
import styles from "../styles/styles.module.css";

export const ProductButtons = () => {
    const { handleChange, counter } = useContext(ProductContext);
    return (
      <div className={styles.buttonsContainer}>
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