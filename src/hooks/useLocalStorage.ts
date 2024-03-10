import { useEffect, useState } from 'react';
import { ICartItem } from '../types';

function useCartLocalStorage(
  key: string
): [ICartItem[] | null, React.Dispatch<React.SetStateAction<ICartItem[] | null>>] {
  const [values, setValues] = useState<ICartItem[] | null>(null);

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
