import { useEffect, useState } from 'react';
import { IProduct } from '../types';

function useCartLocalStorage(
  key: string
): [IProduct[] | null, React.Dispatch<React.SetStateAction<IProduct[] | null>>] {
  const [values, setValues] = useState<IProduct[] | null>(null);

  useEffect(() => {
    if (!values) return;

    localStorage.setItem(
      key,
      JSON.stringify(
        values.map(({ id }) => ({
          id
        }))
      )
    );
  }, [values]);

  return [values, setValues];
}

export default useCartLocalStorage;
