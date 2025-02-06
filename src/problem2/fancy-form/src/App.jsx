import { useEffect, useState } from "react";
import { fetchTokenInfo } from "./apis/ApiToken";
import "./App.css";
import Modal from "./components/Modal";
import toast, { Toaster } from "react-hot-toast";
import { imageSrc, regexNumber, toastLoading, toastsError, toastsSuccess } from "./enum/enum";

function App() {
  const [tokenInfo, setTokenInfo] = useState([]);

  const [amount, setAmount] = useState(null);
  const [amountTo, setAmountTo] = useState(0);
  const [currencyFrom, setCurrencyFrom] = useState("");
  const [currencyTo, setCurrencyTo] = useState("");
  const [priceFrom, setPriceFrom] = useState(null);
  const [priceTo, setPriceTo] = useState(null);

  const [show, setShow] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModalFrom = () => {
    setModalType(modalType.from);
    setIsModalOpen(true);
  };

  const openModalTo = () => {
    setModalType(modalType.to);
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSwap = () => {
    setCurrencyFrom(currencyTo);
    setPriceFrom(priceTo);
    setCurrencyTo(currencyFrom);
    setPriceTo(priceFrom);
    setShow(false);
    toast.success(toastsSuccess.swap);
  };

  const handleSelect = (item) => {
    if (modalType === modalType.from) {
      if (item.currency === currencyTo) {
        handleSwap();
        closeModal();
        return;
      }
      setCurrencyFrom(item.currency);
      setPriceFrom(item.price);
    } else if (modalType === modalType.to) {
      if (item.currency === currencyFrom) {
        handleSwap();
        closeModal();
        return;
      }
      setCurrencyTo(item.currency);
      setPriceTo(item.price);
    }
    closeModal();
  };

  const handleFetchToken = async () => {
    try {
      toast.loading(toastLoading);
      const result = await fetchTokenInfo();

      const sortedResult = result.sort((a, b) => {
        if (a.currency === b.currency) {
          return new Date(b.date) - new Date(a.date);
        }
        return a.currency.localeCompare(b.currency);
      });
      const uniqueResult = new Map();
      for (const item of sortedResult) {
        if (!uniqueResult.has(item.currency)) {
          uniqueResult.set(item.currency, item);
        }
      }
      const finalResult = Array.from(uniqueResult.values());
      setTokenInfo(finalResult);
      setCurrencyFrom(finalResult[0].currency);
      setPriceFrom(finalResult[0].price);
      setCurrencyTo(finalResult[1].currency);
      setPriceTo(finalResult[1].price);
      toast.dismiss();
    } catch (error) {
      toast.error(toastsError.token);
    }
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
    setShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const regex = regexNumber;

    if (!regex.test(amount)) {
      toast.error(toastsError.regex);
      return;
    }

    setAmountTo((amount * priceFrom) / priceTo);
    toast.success(toastsSuccess.submit);
    setShow(true);
  };

  useEffect(() => {
    handleFetchToken();
    setShow(false);
  }, []);

  return (
    <>
      <Toaster />
      <h1>
        Convert {currencyFrom} to {currencyTo}
      </h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="header">
          <div className="amount">
            <p className="amount-text">Amount</p>
            <input
            placeholder="0"
              className="amount-input"
              type="text"
              value={amount}
              onChange={handleAmountChange}
            />
          </div>
          <div className="btn-group">
            <button className="btn-modal" onClick={openModalFrom}>
              <img src={`${imageSrc}${currencyFrom}.svg`} alt="" />
              {currencyFrom}
            </button>

            <i className="swap fi fi-rr-exchange" onClick={handleSwap}></i>

            <button className="btn-modal" onClick={openModalTo}>
              <img src={`${imageSrc}${currencyTo}.svg`} alt="" />
              {currencyTo}
            </button>
          </div>
        </div>

        <div className="bottom">
          {show ? (
            <div className="text-group">
              <p className="text-1">
                {amount} {currencyFrom} =
              </p>
              <p className="text-2">
                {amountTo.toFixed(4)} {currencyTo}
              </p>
            </div>
          ) : (
            <span></span>
          )}
          <button className="btn-convert" onClick={handleSubmit}>
            Convert
          </button>
        </div>

        <Modal
          tokenInfo={tokenInfo}
          isOpen={isModalOpen}
          onClose={closeModal}
          onSelect={handleSelect}
        />
      </form>
    </>
  );
}

export default App;
