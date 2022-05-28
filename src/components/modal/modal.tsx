import React, { FC, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../../redux';
import { Button } from '../button';

import './modal.css';

interface Modal {
  modal: boolean;
  setModal: (modal: boolean) => void;
}

export const Modal: FC<Modal> = ({ modal, setModal }) => {
  const cradModal = useSelector((state: RootState) => state.cardSliceReducer.cardModal);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [errorInputName, setErrorInputName] = useState(false);
  const [errorInputNumber, setErrorInputNumber] = useState(false);

  const [nameValidate, setNameValidate] = useState('This field in required');
  const [numberValidate, setNumberValidate] = useState('This field in required');

  const nameHandle = (e: any) => {
    setName(e.target.value);
    const name = /^[a-zA-Z]+$/g;
    if (!name.test(e.target.value)) {
      setNameValidate('Only letters allowed');
    } else {
      setNameValidate('');
    }
  };

  const numberHandle = (e: any) => {
    setNumber(e.target.value);
    const number = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
    const numberCounter = /[0-9]{12}/;
    if (!number.test(e.target.value)) {
      setNumberValidate('Only numbers allowed');
    } else if (!numberCounter.test(e.target.value)) {
      setNumberValidate('Should contain 12 characters');
    } else {
      setNumberValidate('');
    }
  };

  const handleBlur = (e: any) => {
    switch (e.target.name) {
      case 'name':
        setErrorInputName(true);
        break;
      case 'number':
        setErrorInputNumber(true);
        break;
    }
  };

  const handleRemove = () => {
    setModal(false);
  };

  const handleConsole = (e: any) => {
    e.preventDefault();
    if (name.length && name.indexOf(' ') && number.length && number.indexOf(' ')) {
      console.log({ name, number });
    }
  };

  return (
    <div className={modal ? 'modal' : 'none'}>
      <div className="modal__content">
        <div className="modal__content-title">
          <p>{cradModal ? cradModal.category : <>loading...</>}</p>
          <h3>{cradModal ? cradModal.name : <>loading...</>}</h3>
        </div>
        <div className="modal__content-price">
          <p>
            <span>$</span>
            {cradModal ? cradModal.price : <>loading...</>}
          </p>
        </div>
        <form onSubmit={handleConsole} className="modal__content-from">
          <input
            name="name"
            placeholder="Name"
            type="text"
            value={name}
            onChange={(e) => nameHandle(e)}
            onBlur={(e) => handleBlur(e)}
            className={errorInputName && nameValidate ? 'input__validate' : 'input'}
          />
          {errorInputName && nameValidate && <p className="validate">{nameValidate}</p>}
          <input
            name="number"
            placeholder="Number"
            type="text"
            value={number}
            onChange={(e) => numberHandle(e)}
            onBlur={(e) => handleBlur(e)}
            className={errorInputNumber && numberValidate ? 'input__validate' : 'input'}
          />
          {errorInputNumber && numberValidate && <p className="validate">{numberValidate}</p>}
          <Button className="modal__button">Order</Button>
        </form>
        <button className="modal__remove" onClick={handleRemove}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M15 5L5 15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M5 5L15 15"
              stroke="black"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
