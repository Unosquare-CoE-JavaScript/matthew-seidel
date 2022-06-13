import {
  ProductButtons,
  ProductCard,
  ProductImage,
  ProductTitle,
} from "../components";

export const ShoppingPage = () => {
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
          product={{
            id: "2",
            title: "Coffee Mug",
            img: "./coffee-mug.png",
          }}
        >
          <ProductImage />
          <ProductTitle />
          <ProductButtons />
        </ProductCard>
        <ProductCard
          product={{
            id: "3",
            title: "Harry Mug",
            // img: "./coffee-mug.png",
          }}
        >
          <ProductCard.Image />
          <ProductCard.Title />
          <ProductCard.Buttons />
        </ProductCard>
      </div>
    </div>
  );
};
