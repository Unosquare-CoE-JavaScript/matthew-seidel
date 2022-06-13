import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "../components";
import { useShoppingCard } from "../hook/useShoppingCard";
import { products } from "../data/products";
import "../styles/custom-style.css";

export const ShoppingPage = () => {
  const [shoppingCart, onProductCountChange] = useShoppingCard();

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
        {products.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            value={shoppingCart[product.id]?.quantity || 0}
            onChange={onProductCountChange}
          >
            <ProductImage />
            <ProductTitle />
            <ProductButtons />
          </ProductCard>
        ))}
        <div className="shopping-cart">
          {Object.entries(shoppingCart).map(([key, product]) => (
            <ProductCard
              key={key}
              style={{ width: "100px" }}
              onChange={onProductCountChange}
              value={product.quantity}
              product={product}
            >
              <ProductImage />
              <ProductButtons
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              />
            </ProductCard>
          ))}
        </div>
      </div>
    </div>
  );
};
