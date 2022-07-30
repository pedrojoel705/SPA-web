import { PostCard } from './PostCard.js';
import { ajax } from '../helpers/ajax.js';
import api from '../helpers/wp_api.js';

export function Router() {
  const $posts = document.getElementById('posts');
  let { hash } = location;
  console.log(hash);

  $posts.innerHTML = null;

  if (!hash || hash === '#/') {
    ajax({
      url: api.POSTS,
      cbSuccess: (post) => {
        console.log(post);
        let html = '';
        post.forEach((post) => (html += PostCard(post)));
        document.querySelector('.loader').style.display = 'none';
        $posts.innerHTML = html;
      },
    });
  } else if (hash.includes('#/search')) {
    $posts.innerHTML = `<h2>Seccion del Buscador</h2>`;
  } else if (hash === '#/contacto') {
    $posts.innerHTML = `<h2>Seccion de Contacto</h2>`;
  } else {
    $posts.innerHTML = `<h2>Aqui cargata el contenido de el Post pteviamente</h2>`;
  }
}
