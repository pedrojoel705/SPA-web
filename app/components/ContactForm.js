export function ContactForm() {
  const d = document;
  const $form = d.createElement('form');
  const $style = d.getElementById('dynamic-styles');
  $form.classList.add('contact-form');

  $style.innerHTML = `
  .contact-form {
    color: #4caf50;
    color: #f44336;
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
  
  .contact-form > * {
    padding: 0.5rem;
    margin: 1rem auto;
    display: block;
    width: 100%;
  }
  
  .contact-form textarea {
    resize: none;
  }
  
  .contact-form legend,
  .contact-form-response {
    font-size: 1.5rem;
    font-weight: bold;
    text-align: center;
  }
  
  .contact-form input,
  .contact-form textarea {
    font-size: 1rem;
    font-family: sans-serif;
  }
  
  .contact-form input[type='submit'] {
    width: 50%;
    font-weight: bold;
    cursor: pointer;
  }
  
  .contact-form *::placeholder {
    color: #000;
  }
  
  .contact-form [required]:valid {
    border: thin solid #4caf50;
  }
  
  .contact-form [required]:invalid {
    border: thin solid #f44336;
  }
  
  .contact-form-error {
    margin-top: -1rem;
    font-size: 80%;
    background-color: #f44336;
    color: #fff;
    transition: all 800ms ease;
  }
  
  .contact-form-error.is-active {
    display: block;
    animation: show-message 1s 1 normal 0s ease-out both;
  }
  .none {
    display: none;
  }

  .contact-form-loader img{
    display:block;
    margin:auto;
  }
  
  @keyframes show-message {
    0% {
      visibility: hidden;
      opacity: 0;
    }
    100% {
      visibility: visible;
      opacity: 1;
    }
  }  
  
  `;

  $form.innerHTML = `
  <legend>Envianos tus Comentarios</legend>
    <input type="text" name="name" placeholder="Escribe tu Nombre"
        title="Nombre solo acepta letras y espacios en blanco" pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" required>
    <input type="email" name="email" placeholder="Escribe tu Email" title="Email Incorrecto"
        pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required>
    <input type="text" name="subject" placeholder="Asunto a tratar" title="El Asunto es Requerido" required>
    <textarea name="comments" cols="50" rows="5" placeholder="Escribes tus comentarios" data-pattern="^.{1,255}$"
        title="Tu comentario no debe exceder los 255 caracteres" required></textarea>
    <input type="submit" value="Enviar">
    <div class="contact-form-loader none">
        <img  src="app/assets/rin.svg" alt="Cargando">
    </div>
    <div class="contact-form-response none">
        <p>Los Datos han Sido Enviados con Exito</p>
    </div>
    
    `;
  function contactFormValidation() {
    const $form = d.querySelector('.contact-form');
    const $inputs = d.querySelectorAll('.contact-form [required]');

    //console.log($inputs);

    $inputs.forEach((input) => {
      const $span = d.createElement('span');
      $span.id = input.name;
      $span.textContent = input.title;
      $span.classList.add('contact-form-error', 'none');
      input.insertAdjacentElement('afterend', $span);
    });

    d.addEventListener('keyup', (e) => {
      if (e.target.matches('.contact-form [required]')) {
        let pattern = e.target.pattern || e.target.dataset.pattern;
        //console.log(pattern);

        if (pattern && e.target.value !== '') {
          let regex = new RegExp(pattern);
          return !regex.exec(e.target.value)
            ? d.getElementById(e.target.name).classList.add('is-active')
            : d.getElementById(e.target.name).classList.remove('is-active');
        }
        if (!pattern) {
          return e.target.value === ''
            ? d.getElementById(e.target.name).classList.add('is-active')
            : d.getElementById(e.target.name).classList.remove('is-active');
        }
      }
    });

    d.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Enviando Formulario');

      const $loader = d.querySelector('.contact-form-loader');
      const $response = d.querySelector('.contact-form-response');

      $loader.classList.remove('none');

      fetch('https://formsubmit.co/ajax/pedrojoel705@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: new FormData(e.target),
      })
        .then((res) => (res.ok ? res.json() : Promise.reject(res)))
        .then((json) => {
          console.log(json);
          $loader.classList.add('none');
          $response.classList.remove('none');
          $response.innerHTML = `<p>${json.message}</p>`;
          $form.reset();
        })
        .catch((err) => {
          console.log(err);
          let message =
            err.statusText || 'Ocurrio un error, intenta enviarlo nuevamente ';
          $response.innerHTML = `<p>Error ${err.status}: ${message}</p>`;
        })

        .finally(() => {
          setTimeout(() => {
            $response.classList.add('none');
            $response.innerHTML = '';
          }, 3000);
        });
    });
  }
  contactFormValidation();

  return $form;
}
