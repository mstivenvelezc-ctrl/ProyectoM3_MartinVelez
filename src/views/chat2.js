export function renderChat2() {
    const app = document.querySelector("#app");
    app.innerHTML = `

    <div class="chatApp">
        <header class="chatHeader">
            <img src="/src/img/perfil2.jpg" alt="personaje" class="chat-avatar" />
            <div class="chatHeader__info">    
            <h1 class="chatHeader__title" ><strong>Chat</strong></h1>
            <h2 class="chatHeader__subtitle"><strong>Carolina Ruiz</strong></h2>
            </div> 
        </header>
        <main class="chatMessages" aria-label="mensajes">
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
            <div class="message message--character">Hola, ¿como estas?</div>
            <div class="message message--user">Estoy muy bien gracias</div>
            <div class="message message--character">En que te puedo ayudar?</div>
        </main>
        <form class="chatComposer">
            <input 
            class="chatComposer__input"
            type="text"
            placeholder="Escribir mensaje"
            aria-label="escribe tu mensaje" />
            <button class="chatComposer__send" type="submit"><strong>>>></strong></button>
        </form>
    </div>
    `;
}