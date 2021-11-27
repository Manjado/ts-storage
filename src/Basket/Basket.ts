import BasketProduct from '../ProductTypes/basketProduct';
import Storage from '../Storage/Storage';
import './Basket.module.scss';

class Basket {
  private static readonly BASKET_CLASS = 'basket';
  private static readonly BASKET_POPUP_CLASS = 'basket__popup';
  private static readonly OPEN_POPUP_CLASS = 'basket--is-popup-active';
  private static readonly PRODUCTS_LIST_ITEM_CLASS = 'basket__list-item';
  private static readonly PRODUCTS_LIST_CLASS = 'basket__products_list';

  private readonly rootElement!: HTMLDivElement;
  private readonly products: BasketProduct[] = [];
  private readonly storage!: Storage<BasketProduct>;
  private basketProductList!: HTMLUListElement;

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

  public addToBasket(product: BasketProduct): void {
    if (this.isProductAlreadyInBasket(product.id)) {
      this.changeProductQuantity(product.id, product.quantity);
    } else {
      this.products.push(product);
      this.refreshBasketData();
    }

    this.storage.saveItems(this.products);
  }

  public increaseQuantity(id: string): void {
    this.changeProductQuantity(id, 1);
    this.storage.saveItems(this.products);
  }

  public decreaseQuantity(id: string): void {
    this.changeProductQuantity(id, -1);
    this.storage.saveItems(this.products);
  }

  private isProductAlreadyInBasket(id: string): boolean {
    return this.products.some(product => product.id === id);
  }

  private changeProductQuantity(id: string, newQuantity: number): void {
    let indexProductToRemove: number | null = null;

    this.products.forEach((product, index) => {
      if (product.id !== id) {
        return;
      }

      product.quantity += newQuantity;
      if (product.quantity === 0) {
        indexProductToRemove = index;
      }
    });

    if (indexProductToRemove !== null) {
      this.products.splice(indexProductToRemove, 1);
    }

    this.refreshBasketData();
  }

  private attachBasketToDOM(): void {
    this.rootElement.classList.add(Basket.BASKET_CLASS);
    this.appendBasketButton();
    this.appendBasketPopup();
  }

  private appendBasketButton(): void {
    const basketButton = document.createElement('button');
    const basketIcon = document.createElement('span');

    basketIcon.textContent = '🛒';
    basketButton.addEventListener('click', () => {
      if (!this.rootElement.classList.contains(Basket.OPEN_POPUP_CLASS)) {
        this.refreshBasketData();
      }
      this.rootElement.classList.toggle(Basket.OPEN_POPUP_CLASS);
    });
    basketButton.appendChild(basketIcon);
    this.rootElement.appendChild(basketButton);
  }

  private refreshBasketData(): void {
    while (this.basketProductList.firstChild) {
      this.basketProductList.firstChild.remove();
    }
    this.products.forEach(this.createListElement);
  }

  private readonly createListElement = (product: BasketProduct): void => {
    const listElement = document.createElement('li');
    const productInfoElement = document.createElement('p');
    const increaseButton = document.createElement('button');
    const decreaseButton = document.createElement('button');

    productInfoElement.textContent = `${product.name}, ilość ${product.quantity}`;
    increaseButton.textContent = '+';
    decreaseButton.textContent = '-';

    listElement.classList.add(Basket.PRODUCTS_LIST_ITEM_CLASS);
    increaseButton.addEventListener('click', () => this.increaseQuantity(product.id));
    decreaseButton.addEventListener('click', () => this.decreaseQuantity(product.id));

    listElement.appendChild(productInfoElement);
    listElement.appendChild(increaseButton);
    listElement.appendChild(decreaseButton);
    this.basketProductList.appendChild(listElement);
  };

  private appendBasketPopup(): void {
    const popupContainer = document.createElement('div');
    const productList = document.createElement('ul');

    popupContainer.classList.add(Basket.BASKET_POPUP_CLASS);
    productList.classList.add(Basket.PRODUCTS_LIST_CLASS);

    this.basketProductList = productList;
    popupContainer.appendChild(productList);
    this.rootElement.appendChild(popupContainer);
  }
}
export default Basket;
