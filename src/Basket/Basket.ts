import BasketProduct from '../ProductTypes/basketProduct';
import Storage from '../Storage/Storage';
import './Basket.module.scss';

class Basket {
  private static readonly BASKET_CLASS = 'basket';
  private readonly rootElement!: HTMLDivElement;
  private readonly products: BasketProduct[] = [];
  private readonly storage!: Storage<BasketProduct>;

  public constructor(containerId: string, storage: Storage<BasketProduct>) {
    const basketElement = document.getElementById(containerId);

    if (basketElement) {
      this.rootElement = basketElement as HTMLDivElement;
      this.attachBasketToDOM();
      this.storage = storage;
      this.products = storage.getItms();
      return;
    }

    throw Error('Nie odnaleziono elementu koszyka');
  }

  private attachBasketToDOM(): void {
    this.rootElement.classList.add(Basket.BASKET_CLASS);
  }
}
export default Basket;
