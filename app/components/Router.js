import { PostCard } from './PostCard.js';
import { ajax } from '../helpers/ajax.js';
import api from '../helpers/wp_api.js';
import { Post } from './Post.js';

export async function Router() {
  const $main = document.getElementById('main');
  let { hash } = location;
  console.log(hash);

  $main.innerHTML = null;

  if (!hash || hash === '#/') {
    await ajax({
      url: api.POSTS,
      cbSuccess: (post) => {
        console.log(post);
        let html = '';
        post.forEach((post) => (html += PostCard(post)));
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes('#/search')) {
    $main.innerHTML = `<h2>Seccion del Buscador</h2>`;
  } else if (hash === '#/contacto') {
    $main.innerHTML = `<h2>Seccion de Contacto</h2>`;
  } else {
    await ajax({
      url: `${api.POST}/${localStorage.getItem('wpPostId')}?_embed`,
      cbSuccess: (post) => {
        console.log(post);
        $main.innerHTML = Post(post);
      },
    });
    // $main.innerHTML = `<h2>Aqui cargara el contenido de el Post previamente</h2>`;
  }
  document.querySelector('.loader').style.display = 'none';
}
