export function renderAbout() {
    const app = document.querySelector("#app");
    app.innerHTML = `
    <section class="view view--about">
        <h1>Acerca de esta app</h1>
        <p>Bienvenido a <strong>Chat con Personajes</strong>, una aplicación interactiva donde puedes conversar con personajes de Rick and Morty impulsados por inteligencia artificial.</p>
        
        <h2>¿Cómo funciona?</h2>
        <p>Cada personaje tiene su propia personalidad y forma de hablar. La IA genera respuestas coherentes y fieles a la personalidad de cada uno.</p>
        
        <h2>Personajes disponibles</h2>
        <p>Puedes chatear con:</p>
        <ul style="text-align: left; max-width: 300px; margin: 1rem auto;">
            <li>Rick Sanchez - El genio cínico</li>
            <li>Morty Smith - El adolescente nervioso</li>
            <li>Summer - Preocupada por la popularidad</li>
        </ul>
        
        <h2>¿Quién lo hizo?</h2>
        <p>Desarrollado por Martin Velez, como un proyecto de aprendizaje interactivo.</p>
        
        <a class="btn btn--primary" href="/chat">Ir a chatear</a>
    </section>
    `;
}
