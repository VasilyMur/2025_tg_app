import { useState } from 'react';
import './ProductList.css';
import axios from 'axios';
import ProductItem from "../ProductItem/ProductItem";
import {useTelegram} from "../../hooks/useTelegram";
import {useCallback, useEffect} from "react";

interface IProduct {
  id: string, 
  title: string, 
  price: number, 
  description: string
};

const products: IProduct[] = [
  {id: '1', title: 'Джинсы', price: 5000, description: 'Синего цвета, прямые'},
  {id: '2', title: 'Куртка', price: 12000, description: 'Зеленого цвета, теплая'},
  {id: '3', title: 'Джинсы 2', price: 5000, description: 'Синего цвета, прямые'},
  {id: '4', title: 'Куртка 8', price: 122, description: 'Зеленого цвета, теплая'},
  {id: '5', title: 'Джинсы 3', price: 5000, description: 'Синего цвета, прямые'},
  {id: '6', title: 'Куртка 7', price: 600, description: 'Зеленого цвета, теплая'},
  {id: '7', title: 'Джинсы 4', price: 5500, description: 'Синего цвета, прямые'},
  {id: '8', title: 'Куртка 5', price: 12000, description: 'Зеленого цвета, теплая'},
]

const getTotalPrice = (items: IProduct[] = []) => {
  return items.reduce((acc, item) => {
    return acc += item.price
  }, 0);
}

const ProductList = () => {
  const [addedItems, 
   // setAddedItems
  ] = useState<IProduct[]>([]);
  const {tg, queryId} = useTelegram();

  const onAdd = async () => {
    console.log('now fetch')
    const response = await axios.post('http://localhost:8000/web-data', {test: 'true'});
    console.log('repsonse >>>>> ', response.data);

    // fetch('http://localhost:8000/web-data', {
    //   // fetch('http://85.119.146.179:8000/web-data', {
    //       method: 'POST',
    //       headers: {
    //           'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify('yes')
    //   })
  } 

  const onSendData = useCallback(() => {
      const data = {
          products: addedItems,
          totalPrice: getTotalPrice(addedItems),
          queryId,
      }
    
      fetch('http://localhost:8000/web-data', {
      // fetch('http://85.119.146.179:8000/web-data', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
      })
  }, [addedItems])

  useEffect(() => {
      tg.onEvent('mainButtonClicked', onSendData)
      return () => {
          tg.offEvent('mainButtonClicked', onSendData)
      }
  }, [onSendData])

  // const onAdd = (product: IProduct) => {
  //   const alreadyAdded = addedItems.find(item => item.id === product.id);
  //   let newItems = [];

  //   if(alreadyAdded) {
  //       newItems = addedItems.filter(item => item.id !== product.id);
  //   } else {
  //       newItems = [...addedItems, product];
  //   }

  //   setAddedItems(newItems)

  //   if(newItems.length === 0) {
  //       tg.MainButton.hide();
  //   } else {
  //       tg.MainButton.show();
  //       tg.MainButton.setParams({
  //           text: `Купить ${getTotalPrice(newItems)}`
  //       })
  //   }
  // }

  return (
    <div className={'list'}>
      {products.map(item => (
        <ProductItem
          key={item.id}
          product={item}
          onAdd={onAdd}
          className={'item'}
        />
      ))}
    </div>
  );
};

export default ProductList;