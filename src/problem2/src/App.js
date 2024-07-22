import { useState, useEffect } from 'react';
import './App.css'; // Thêm file CSS

export default function App() {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState({});
  const [toCur, setToCur] = useState({});
  const [result, setResult] = useState(0);
  const [tokenList, setTokenList] = useState([]);
  const [isWarning, setWarning] = useState(false);


  async function getTokenList() {
    const res = await fetch('https://interview.switcheo.com/prices.json');
    const data = await res.json();
    setTokenList(data.map(item => ({
      ...item,
      src: "https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/" + item.currency + ".svg"
    })));
  }

  async function convert() {
    const amountToUSD = amount * (fromCur?.price || 0);
    setResult(((amountToUSD) / (toCur?.price || 1)).toFixed(5));
  }

  useEffect(() => {
    getTokenList();
  }, []);

  useEffect(() => {
    if (tokenList.length > 0) {
      setFromCur(tokenList[0]);
      setToCur(tokenList[1]);
    }
  }, [tokenList]);

  useEffect(() => {
    if (fromCur?.currency === toCur?.currency) {
      setResult(amount);
    } else {
      convert();
    }
  }, [amount, fromCur, toCur]);

  function handleSwap() {
    const tmpCur = fromCur;
    setFromCur(toCur);
    setToCur(tmpCur);
  };

  function closePopup() {
    setWarning(false)
    setAmount(1)
  };

  return (
    <div className="container">
      <h1 className="title">Currency Converter</h1>
      {/* form select currency */}
      <div className="form">
        {/* form currency */}
        <div className="form-group">  {fromCur.src && (
          <img src={fromCur.src} alt={fromCur.currency} className="icon" />
        )}
          <select
            id="from"
            value={fromCur.currency || ''}
            onChange={(e) => setFromCur(tokenList.find(item => item.currency === e.target.value))}
          >
            {tokenList.map((item, index) => (
              <option key={index} value={item.currency}>
                {item.currency}
              </option>
            ))}
          </select>
        </div>
        {/* swap button */}
        <button onClick={handleSwap} className="swap-button">
          <img src='/assets/transfer.svg' className="icon transfer" />
        </button>

        {/* to currency */}
        <div className="form-group"> {toCur.src && (
          <img src={toCur.src} alt={toCur.currency} className="icon" />
        )}
          <select
            id="to"
            value={toCur.currency || ''}
            onChange={(e) => setToCur(tokenList.find(item => item.currency === e.target.value))}
          >
            {tokenList.map((item, index) => (
              <option key={index} value={item.currency}>
                {item.currency}
              </option>
            ))}
          </select>

        </div>
      </div>

      {/* convert result */}
      <p className="result">
        <input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => {
            if (Number(e.target.value) >= 0) {
              setWarning(false)
              setAmount(Number(e.target.value))
            }
            else
              setWarning(true)
          }}
        />  {fromCur.currency}  =  {result}  {toCur.currency}
      </p>
      {/* convert to usd list */}
      {tokenList.map((item, index) => (
        <div className="form" >
          <div className="form-group">  {fromCur.src && (
            <img src={item.src} className="icon" />

          )} 1  {item.currency}
          </div>

          <button className="swap-button">
            <img src='/assets/transfer.svg' className="icon transfer" />
          </button>

          <div className="form-group"> {toCur.src && (
            <img src='https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/USD.svg' className="icon" />
          )} {item.price.toFixed(3)} USDT
          </div>
        </div>
      ))
      }
      {/* warning popup */}
      {isWarning && (
        <div className="popup-message-container">
          <div className="popup-content">
            <img className="img-sp" src='assets/images/sticker-warning.svg' alt="" />
            <p className="p-title">Cannot convert negative numbers!</p>
            <div className="style-button">
              <button className="confirm" onClick={closePopup}>
                Close
              </button>
            </div>
          </div>

        </div>
      )}
    </div >
  );
}
