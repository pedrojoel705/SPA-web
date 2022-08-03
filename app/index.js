import api from './helpers/wp_api.js';
import { App } from './App.js';
import { ContactForm } from './components/ContactForm.js';

document.addEventListener('DOMContentLoaded', (e) => {
  App(), ContactForm();
});
window.addEventListener('hashchange', (e) => {
  api.page = 1;
  App();
});
