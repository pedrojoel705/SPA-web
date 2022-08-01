import { Header } from './components/Header.js';
import { Main } from './components/Main.js';
import { Loader } from './components/Loader.js';
import { Router } from './components/Router.js';
import { InfiniteScroll } from './helpers/infiniteScroll.js';

export function App() {
  const d = document,
    $root = d.getElementById('root');
  $root.innerHTML = null;
  $root.appendChild(Header());
  $root.appendChild(Main());
  $root.appendChild(Loader());

  Router();
  InfiniteScroll();
}
