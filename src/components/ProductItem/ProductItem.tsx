import { FC } from 'react';
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
      <button onClick={onAddHandler} className={'button add-btn'}>
        Добавить
      </button>
    </div>
  );
};

export default ProductItem;