import { PostCard } from './PostCard.js';
import { ajax } from '../helpers/ajax.js';
import api from '../helpers/wp_api.js';
import { Post } from './Post.js';
import { SearchPost } from './SearchPost.js';

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
    let query = localStorage.getItem('wpSearch');

    if (!query) {
      document.querySelector('.loader').style.display = 'none';
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search);
        let html = '';
        if (search.length === 0) {
          html = `
          <p class="error">No existe resultados de busqueda
          <mark>${query}</mark>        
          </p>`;
        } else {
          search.forEach((post) => (html += SearchPost(post)));
        }
        $main.innerHTML = html;
      },
    });
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
  }
  document.querySelector('.loader').style.display = 'none';
}
