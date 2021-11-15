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
    // this.products.forEach(this.createListElement)
  }

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
