import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "../components";
import { products } from "../data/products";
import "../styles/custom-style.css";

export const ShoppingPage = () => {
  const product = products[0];

  return (
    <div>
      <h1>Sopping page</h1>
      <hr />
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <ProductCard
          initialValues={{
            quantity: 4,
            maxCount: 10,
          }}
          product={product}
        >
          {({ reset, handleChange, isMaxCountReached, count }) => (
            <>
              <ProductImage />
              <ProductTitle />
              <ProductButtons />
              <button onClick={reset}>reset</button>
              <button onClick={() => handleChange(-2)}>-2</button>
              {!isMaxCountReached && <button onClick={() => handleChange(2)}>+2</button>}
              <span>{count}</span>
            </>
          )}
        </ProductCard>
      </div>
    </div>
  );
};
