import { CSSProperties, ReactElement } from "react";

export interface ProductCartProps {
  product: Product;
  children?: ReactElement | ReactElement[];
  className?: string;
  style?: CSSProperties;
  onChange?: (args:onChangeArgs) => void;
  value?: number;
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

export interface StylesProps {
  style?: CSSProperties;
  className?: string;
}

export interface onChangeArgs{
  product: Product;
  quantity: number;
}