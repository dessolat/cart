export interface IProduct {
  id: number;
  name: string;
  price: number;
	// count?: number;
}

export interface ICartItem extends IProduct {
	count: number;
}