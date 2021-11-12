import BasketStorage from './BasketStorage/BasketStorage';
import './global-styles.scss';

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

const backendButton = document.getElementById('fe-button');

if (backendButton) {
  backendButton.addEventListener('click', () => redirectFunction('backend'));
}

const storage = new BasketStorage();

window.basket = storage;
export {};
