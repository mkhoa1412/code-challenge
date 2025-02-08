import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Button, InputAdornment, TextField } from "@mui/material";
import Styles from "./App.module.scss";
import CurrencyPopover from "./components/currencyPopover/currencyPopover";
import { ICurrency } from "./state/stateTypes/ICurrency";

function App() {
  const [amountSend, setAmountSend] = useState("");
  const [amountReceive, setAmountReceive] = useState("");
  const [sendCurrency, setSendCurrency] = useState<ICurrency | null>(null);
  const [receiveCurrency, setReceiveCurrency] = useState<ICurrency | null>(
    null,
  );
  const [currencies, setCurrencies] = useState<ICurrency[]>([]);

  useEffect(() => {
    getCurrencies();
  }, []);

  const getCurrencies = async () => {
    await fetch("https://interview.switcheo.com/prices.json")
      .then((response) => response.json())
      .then((response) => {
        const newData = formatCurrency(response);

        setCurrencies(newData);
        //set defaule value for send currency and receive currency
        setSendCurrency(newData[0]);
        setReceiveCurrency(newData[1]);
      })
      .catch((err) => console.error(err));
  };

  const formatCurrency = (data: ICurrency[]) => {
    const newData = data.map((item: ICurrency, index) => {
      const urlToken = `https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/${item.currency}.svg`;
      return {
        ...item,
        urlToken,
        id: index + 1,
      };
    });
    return newData;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ""));
    if (value) {
      const numberFormat = value.toLocaleString("en-us");
      setAmountSend(numberFormat);
    } else {
      setAmountSend("");
      setAmountReceive("");
    }
  };

  const currencySwap = (e: FormEvent) => {
    e.preventDefault();
    if (!amountSend) return;

    const sendPrice = sendCurrency?.price;
    const receivePrice = receiveCurrency?.price;
    if (sendPrice && receivePrice) {
      const result = (parseFloat(amountSend) * sendPrice) / receivePrice;
      setAmountReceive(result.toFixed(2));
    }
  };

  return (
    <div className={Styles.root}>
      <div className={Styles.wrapper}>
        <h1 className={Styles.header}>Swap</h1>
        <form onSubmit={currencySwap}>
          <TextField
            fullWidth
            id="sendReceive"
            label="Amount to receive"
            variant="standard"
            placeholder="0"
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencyPopover
                      currencies={currencies}
                      currencyDefault={sendCurrency}
                      callback={(currency: ICurrency) =>
                        setSendCurrency(currency)
                      }
                    />
                  </InputAdornment>
                ),
              },
            }}
            value={amountSend}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            id="amountReceive"
            label="Amount to receive"
            variant="standard"
            placeholder="0"
            value={amountReceive}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment position="end">
                    <CurrencyPopover
                      currencies={currencies}
                      currencyDefault={receiveCurrency}
                      callback={(currency: ICurrency) =>
                        setReceiveCurrency(currency)
                      }
                    />
                  </InputAdornment>
                ),
                readOnly: true,
              },
            }}
          />

          <Button
            fullWidth
            variant="contained"
            type="submit"
            disabled={!amountSend}
          >
            Confirm Swap
          </Button>
        </form>
      </div>
    </div>
  );
}

export default App;
