type Combinable = number | string;

function combine<T extends Combinable>(n1: T, n2: T): string | number {
  if (typeof n1 === "number" && typeof n2 === "number") return n1 + n2;
  return n1.toString() + n2.toString();
}

