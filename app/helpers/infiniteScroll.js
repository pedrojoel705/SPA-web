import api from './wp_api.js';
import { PostCard } from '../components/PostCard.js';
import { SearchPost } from '../components/SearchPost.js';
import { ajax } from './ajax.js';

let query = localStorage.getItem('wpSearch'),
  apiURL,
  Component; //High Order Component

export async function InfiniteScroll() {
  window.addEventListener('scroll', async (e) => {
    let { scrollTop, clientHeight, scrollHeight } = document.documentElement,
      { hash } = window.location;

    if (scrollTop + clientHeight + 200 >= scrollHeight) {
      api.page++;

      if (!hash || hash === '#/') {
        apiURL = `${api.POSTS}&page=${api.page}`;
        Component = PostCard;
      } else if (hash.includes('#/search')) {
        apiURL = `${api.SEARCH}${query}&page=${api.page}`;
        Component = SearchPost;
      } else {
        return false;
      }

      await ajax({
        url: apiURL,
        cbSuccess: (post) => {
          console.log(post);
          let html = '';
          post.forEach((post) => (html += Component(post)));
          document.getElementById('main').insertAdjacentHTML('beforeend', html);
        },
      });
    }
  });
}
