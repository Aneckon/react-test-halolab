import React, { FC } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '..';

import { addModal } from '../../redux/card/reducer';

import './card.css';

interface Card {
  category: string;
  name: string;
  price: number;
  setModal: (modal: boolean) => void;
}

export const Card: FC<Card> = ({ name, category, price, setModal }) => {
  const dispatch = useDispatch();

  const handleBuy = () => {
    dispatch(
      addModal({
        name,
        category,
        price,
      }),
    );
    setModal(true);
  };

  return (
    <div className="card">
      <div className="card__title">
        <p>{category}</p>
        <h3>{name}</h3>
      </div>
      <div className="card__price">
        <p>
          <span>$</span>
          {price}
        </p>
        <Button className={'card__button'} click={handleBuy}>
          Buy
        </Button>
      </div>
    </div>
  );
};
