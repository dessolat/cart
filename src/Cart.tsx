import { IProduct } from './types';

interface Props {
  cartItems: IProduct[] | null;
  removeFromCart: (id: number) => () => void;
}

const Cart = ({ cartItems, removeFromCart }: Props) => {
  return (
    <div className='shopping-cart'>
      <h2 className='shopping-cart__title'>Shopping cart:</h2>

      {cartItems && <ul className='shopping-cart__list'>
        {cartItems.map(item => (
          <li key={item.id} className='shopping-cart__item'>
            {item.name} - <span>{item.price}</span>
            <button onClick={removeFromCart(item.id)} className='shopping-cart__remove-btn'>
              Remove
            </button>
          </li>
        ))}
      </ul>}
    </div>
  );
};
export default Cart;
