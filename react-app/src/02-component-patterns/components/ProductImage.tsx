import { useContext } from "react";
import noImage from "../assets/no-image.jpg";
import styles from "../styles/styles.module.css";
import { ProductContext } from "./ProductCard";

export const ProductImage = ({ img = "" }) => {
    const { product } = useContext(ProductContext);
    const image = img || product.img || noImage;
    return (
      <img
        src={image}
        alt={`${product.title} mug`}
        className={styles.productImg}
      />
    );
  };