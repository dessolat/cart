import { IProduct } from '../types';

interface Props {
  data: IProduct[];
  addToCart: (product: IProduct) => () => void;
}

const ShopProducts = ({ data, addToCart }: Props) => {
  return (
    <div className='shop-products'>
      <h2 className='shop-products__title'>Products for sale:</h2>

      <ul className='shop-products__list'>
        {data.map(product => (
          <li key={product.id} className='shop-products__item'>
            {product.name} - <span>{product.price}</span>
            <button onClick={addToCart(product)} className='shop-products__add-btn'>
              Add
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
export default ShopProducts;
