import { useEffect, useState } from 'react';
import { getAllProducts, getByIds } from './api';
import { IProduct } from './types';
import useCartLocalStorage from './hooks/useLocalStorage';
import Cart from './Cart';
import ShopProducts from './ShopProducts';

function App() {
  const [data, setData] = useState<IProduct[]>([]);
  const [cartItems, setCartItems] = useCartLocalStorage('cartItems');

  useEffect(() => {
    (async () => {
      const cartStorageData = localStorage.getItem('cartItems');

      if (cartStorageData && JSON.parse(cartStorageData).length > 0) {
        const indexArr = JSON.parse(cartStorageData).map((item: { id: number }) => item.id);

        const [newData, cartData] = await Promise.all([getAllProducts(), getByIds(indexArr)]);

        setData(newData);
        setCartItems(cartData);
        return;
      }

      const newData = await getAllProducts();
      setData(newData);
    })();
  }, []);

  const addToCart = (product: IProduct) => () => {
    setCartItems(prev => (prev ? [...prev, product] : [product]));
  };

  const removeFromCart = (id: number) => () => {
    setCartItems(cartItems!.filter(item => item.id !== id));
  };
  return (
    <div className='container'>
      <div className='wrapper'>
        {data && <ShopProducts data={data} addToCart={addToCart} />}
        <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
      </div>
    </div>
  );
}

export default App;