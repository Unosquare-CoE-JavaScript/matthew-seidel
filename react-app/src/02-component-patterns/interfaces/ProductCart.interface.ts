import { ReactElement } from "react";

export interface ProductCartProps {
  product: Product;
  children?: ReactElement | ReactElement []
}

export interface ProductContextProps {
  product: Product;
  counter: number;
  handleChange: (value?: number) => void;
}

export interface Product {
  id: string;
  title: string;
  img?: string;
}
