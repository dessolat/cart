export interface IProduct {
  id: number;
  name: string;
  price: number;
}

export interface ICartItem extends IProduct {
	count: number;
}