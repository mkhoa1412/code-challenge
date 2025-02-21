import { useEffect, useState } from "react";

const getLogoURL = (currency: string) =>
  `https://github.com/Switcheo/token-icons/raw/refs/heads/main/tokens/${currency}.svg`;

export default function CurrencyImage(props: Props) {
  const { className, currency } = props;

  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    setImgSrc("");
    const imgEl = document.createElement("img");

    const src = getLogoURL(currency);

    imgEl.onload = () => {
      setImgSrc(src);
    };

    imgEl.onerror = () => {
      setImgSrc("");
    };

    imgEl.src = src;

    return () => {
      imgEl.onload = null;
      imgEl.onerror = null;
    };
  }, [currency]);

  return imgSrc && <img className={className} src={getLogoURL(currency)} />;
}

interface Props {
  className?: string;
  currency: string;
}
