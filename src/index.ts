import Basket from './Basket/Basket';
import BasketStorage from './BasketStorage/BasketStorage';
import './global-styles.scss';
import Router from './Router';

declare global {
  interface Window {
    basket: BasketStorage;
  }
}
const redirectFunction = (location: string): void => {
  window.location.hash = `#/${location}`;
};

const frontendButton = document.getElementById('fe-button');

if (frontendButton) {
  frontendButton.addEventListener('click', () => redirectFunction('frontend'));
}

const backendButton = document.getElementById('be-button');

if (backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'));
}

const storage = new BasketStorage();
const router = new Router();
const basket = new Basket('basket', storage);

// router.addRoute({ name: 'frontend', renderFunction: () => console.log('frontend') });
// router.addRoute({ name: 'backend', renderFunction: () => console.log('backend') });

basket.addToBasket({ id: '1', name: 'Test', price: 2, quantity: 2 });

window.basket = storage;
export {};
