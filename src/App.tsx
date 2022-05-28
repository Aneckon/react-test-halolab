import React, { useEffect, useState } from 'react';

import { RootState } from './redux';
import { useAppDispatch, useAppSelector } from './hooks/redux';
import { addModal, fetchCard } from './redux/card/reducer';

import { Card, Button, Modal } from './components';

export const App = () => {
  const dispatch = useAppDispatch();
  const cradPrice = useAppSelector((state: RootState) => state.cardSliceReducer.cardBuy);
  const [modal, setModal] = useState(false);

  const cardMin = [...cradPrice]?.sort((a: any, b: any) => a.price - b.price);

  useEffect(() => {
    dispatch(fetchCard());
  }, [dispatch]);

  const handleBuycheapest = () => {
    dispatch(addModal(cardMin[0]));
    setModal(true);
  };

  return (
    <div className="app">
      <div className="app__card">
        {cradPrice ? (
          cradPrice.map((item: { name: any; category: any; price: any }) => (
            <Card
              setModal={setModal}
              key={item.name}
              category={item.category}
              name={item.name}
              price={item.price}
            />
          ))
        ) : (
          <>Loading....</>
        )}
      </div>
      <Button click={handleBuycheapest} className="app__button">
        Buy cheapest
      </Button>
      <Modal modal={modal} setModal={setModal} />
    </div>
  );
};
