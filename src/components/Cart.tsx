import { ICartItem } from '../types';

interface Props {
  cartItems: ICartItem[] | null;
  reduceCartItemCount: (id: number) => () => void;
  removeFromCart: (id: number) => () => void;
}

const Cart = ({ cartItems, reduceCartItemCount, removeFromCart }: Props) => {
  return (
    <div className='shopping-cart'>
      <h2 className='shopping-cart__title'>Shopping cart:</h2>

      {cartItems && (
        <ul className='shopping-cart__list'>
          {cartItems.map(item => (
            <li key={item.id} className='shopping-cart__item'>
              {item.name} - <span>{item.price}</span> : <b>{item.count}</b>
              <button onClick={reduceCartItemCount(item.id)} className='shopping-cart__minus-btn btn'>
                -
              </button>
              <button onClick={removeFromCart(item.id)} className='shopping-cart__remove-btn btn'>
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default Cart;
