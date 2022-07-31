export function Post(props) {
  let { title, date, content, _embedded } = props;
  let dateFormat = new Date(date).toLocaleDateString();
  let author = `${_embedded.author[0].name}`;
  let imgAvatar = `${_embedded.author[0].avatar_urls[48]}`;
  return `
    <section class="post-page">
    <aside>
    <h2>${title.rendered}</h2>
    <img class="img-avatar" src=${imgAvatar} alt="${author}">
    <figcaption >${author}</figcaption>
    <time datetime="${date}">${dateFormat}</time>
    </aside>
    <hr>
    <article>${content.rendered}</article>
    </section>
    `;
}
