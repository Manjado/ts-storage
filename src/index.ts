import './global-styles.scss';

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

export {};
