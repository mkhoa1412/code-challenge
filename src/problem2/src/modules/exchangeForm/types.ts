export interface ICrypto {
  currency: string;
  date: string;
  price: number;
  icon?: React.JSX.Element;
}

export interface IExchangeFormValue {
  fromValueSelected: ICrypto | null;
  toValueSelected: ICrypto | null;
  fromValueSelectedPrice?: number;
  toValueSelectedPrice?: number;
}
