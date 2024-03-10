import { useEffect, useState } from 'react';
import { ICartItem } from '../types';

function useCartLocalStorage(
  key: string
): [ICartItem[] | null, React.Dispatch<React.SetStateAction<ICartItem[]>>] {
  const [values, setValues] = useState<ICartItem[]>(null as unknown as ICartItem[]);

  useEffect(() => {
    if (!values) return;

    localStorage.setItem(
      key,
      JSON.stringify(
        values.map(({ id, count }) => ({
          id,
          count
        }))
      )
    );
  }, [values]);

  return [values, setValues];
}

export default useCartLocalStorage;
