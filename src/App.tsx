import { useEffect, useState } from 'react';
import { getAllProducts, getByIds } from './api';
import { ICartItem, IProduct } from './types';
import useCartLocalStorage from './hooks/useLocalStorage';
import Cart from './components/Cart';
import ShopProducts from './components/ShopProducts';

function App() {
  const [data, setData] = useState<IProduct[]>([]);
  const [cartItems, setCartItems] = useCartLocalStorage('cartItems');

  useEffect(() => {
    (async () => {
      const cartStorageData = localStorage.getItem('cartItems');

      if (cartStorageData && JSON.parse(cartStorageData).length > 0) {
        const parsedCartItems = JSON.parse(cartStorageData);
        const namedCardArray = parsedCartItems.reduce((acc: any, item: { id: number; count: number }) => {
          acc[item.id] = item.count;
          return acc;
        }, {});

        const indexArr = parsedCartItems.map((item: { id: number }) => item.id);

        const [newData, cartData] = await Promise.all([getAllProducts(), getByIds(indexArr)]);

        const newCartData: ICartItem[] = cartData.reduce((acc: ICartItem[], item: IProduct) => {
          acc.push({ ...item, count: namedCardArray[item.id] });
          return acc;
        }, []);

        setData(newData);
        setCartItems(newCartData);
        return;
      }

      const newData = await getAllProducts();
      setData(newData);
    })();
  }, []);

  const addToCart = (product: IProduct) => () => {
    setCartItems(prevItems => {
      if (!prevItems) return [{ ...product, count: 1 }];

      const existingItem = prevItems?.find(item => item.id === product.id);

      if (existingItem)
        return prevItems.map(item =>
          item.id === product.id ? { ...product, count: existingItem.count + 1 } : item
        );

      return [...prevItems, { ...product, count: 1 }];
    });
  };

  function reduceCartItemCount(id: number) {
    return () => {
			const cartItemCurCount = cartItems!.find(item => item.id === id)?.count as number;

			if (cartItemCurCount < 2) {
				removeFromCart(id)()
				return
			}

      setCartItems(cartItems!.map(item => (item.id === id ? { ...item, count: item.count - 1 } : item)));
    };
  }

  function removeFromCart(id: number) {
    return () => {
      setCartItems(cartItems!.filter(item => item.id !== id));
    };
  }
  return (
    <div className='container'>
      <div className='wrapper'>
        {data && <ShopProducts data={data} addToCart={addToCart} />}
        <Cart
          cartItems={cartItems}
          reduceCartItemCount={reduceCartItemCount}
          removeFromCart={removeFromCart}
        />
      </div>
    </div>
  );
}

export default App;
