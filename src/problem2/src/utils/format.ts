export const isNumber = (price: number | string) => {
  return !isNaN(Number(price));
};

export const formatPrice = (price: number | string) => {
  if (isNumber(price)) {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(Number(price));
  }
  return price;
};
