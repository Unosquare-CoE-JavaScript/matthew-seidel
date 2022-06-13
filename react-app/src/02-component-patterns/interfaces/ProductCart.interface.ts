import { CSSProperties, ReactElement } from "react";

export interface ProductCartProps {
  product: Product;
  children?: (args: ProductCardHandlers) => ReactElement;
  className?: string;
  style?: CSSProperties;
  onChange?: (args: onChangeArgs) => void;
  value?: number;
  initialValues?: InitialValuesProps;
}

export interface InitialValuesProps {
  quantity?: number;
  maxCount?: number;
}

export interface ProductContextProps {
  product: Product;
  counter: number;
  handleChange: (value?: number) => void;
  maxCount?: number;
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

export interface onChangeArgs {
  product: Product;
  quantity: number;
}

export interface ProductCardHandlers {
  count: number;
  isMaxCountReached?: boolean;
  maxCount?: number;
  product: Product;

  handleChange: (value?: number) => void;
  reset: () => void;
}
