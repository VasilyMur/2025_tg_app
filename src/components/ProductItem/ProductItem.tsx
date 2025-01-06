import { FC } from 'react';
import Button from "../Button/Button";
import './ProductItem.css';

interface IProduct {
  id: string, 
  title: string, 
  price: number, 
  description: string
};

interface IProductItemProps {
  product: IProduct;
  className: string;
  onAdd: (product: IProduct) => void
}

const ProductItem: FC<IProductItemProps> = ({product, className, onAdd}) => {

  const onAddHandler = () => {
    onAdd(product);
  }

  return (
    <div className={'product ' + className}>
      <div className={'img'}/>
      <div className={'title'}>{product.title}</div>
      <div className={'description'}>{product.description}</div>
      <div className={'price'}>
          <span>Стоимость: <b>{product.price}</b></span>
      </div>
      <Button 
        className={'add-btn'} 
        onClick={onAddHandler} 
        text="Добавить в корзину"
      />
    </div>
  );
};

export default ProductItem;