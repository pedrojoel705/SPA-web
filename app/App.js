import api from './helpers/wp_api.js';
import { ajax } from './helpers/ajax.js';
import { Header } from './components/Header.js';
import { Posts } from './components/Posts.js';
import { Loader } from './components/Loader.js';
import { PostCard } from './components/PostCard.js';

export function App() {
  const d = document,
    $root = d.getElementById('root');
  $root.appendChild(Header());
  $root.appendChild(Posts());
  $root.appendChild(Loader());

  ajax({
    url: api.POSTS,
    cbSuccess: (post) => {
      console.log(post);
      let html = '';
      post.forEach((post) => (html += PostCard(post)));
      document.querySelector('.loader').style.display = 'none';
      document.getElementById('posts').innerHTML = html;
    },
  });
}
