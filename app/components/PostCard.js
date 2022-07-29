export function PostCard(props) {
  let { title, date, guid, _embedded } = props;
  let dateFormate = new Date(date).toLocaleDateString();
  let urlPoster = _embedded['wp:featuredmedia']
    ? _embedded['wp:featuredmedia'][0].source_url
    : 'app/assets/favicon.png';

  return `
    <article class="post-card">
    <img src="${urlPoster}" alt="${title.rendered}" >
    <h2>${title.rendered}</h2>
    <p>
    <time datetime="${dateFormate}">${dateFormate}</time>
    <a href="${guid.rendered}">Ver Publicacion</a>
    </p>    
    </article>
    
    `;
}
