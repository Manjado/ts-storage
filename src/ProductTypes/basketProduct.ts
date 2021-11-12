import Product from './Product';

type BasketProduct = {
  quantity: number;
} & Product;

export default BasketProduct;
