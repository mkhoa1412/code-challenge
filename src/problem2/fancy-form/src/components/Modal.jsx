import React from "react";
import "../styles/Modal.css";
import { imageSrc } from "../enum/enum";

const Modal = ({
  isOpen,
  onClose,
  tokenInfo,
  onSelect,
}) => {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <i onClick={onClose} className="close-button fi fi-rr-cross-small"></i>
        <ul className="item-list">
          {tokenInfo.map((item, index) => (
            <li className="item" key={index} onClick={() => onSelect(item)}>
              <img
                src={`${imageSrc}${item.currency}.svg`}
                alt=""
              />
              {item.currency}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Modal;
