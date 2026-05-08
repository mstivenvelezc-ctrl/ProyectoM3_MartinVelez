# Cómo agregar nuevos personajes

Este sistema te permite agregar nuevos personajes de forma muy sencilla.

## Paso 1: Agregar el personaje a `charactersData.js`

Edita el archivo `src/data/charactersData.js` y agrega un nuevo objeto al array `characters`:

```javascript
{
    id: "nombre-unico",           // ID único en minúsculas con guiones
    name: "Nombre del Personaje", // Nombre que se muestra
    route: "/chat/nombre-unico",  // Ruta de navegación
    avatar: "URL_DE_LA_IMAGEN",   // URL de la foto del personaje
    greeting: "Saludo inicial",   // Mensaje de bienvenida
    systemPrompt: "Descripción... " // Instrucciones para la IA sobre cómo actuar
},
```

## Ejemplo completo:

```javascript
{
    id: "summer",
    name: "Summer Smith",
    route: "/chat/summer",
    avatar: "https://rickandmortyapi.com/api/character/avatar/3.jpeg",
    greeting: "¡Hola! Soy Summer, ¿qué tal?",
    systemPrompt: "Eres Summer Smith de Rick and Morty. Eres inteligente, moderna y a veces sarcástica. Te preocupas por tus amigos pero también te importa la moda y la tecnología.",
},
```

## Paso 2: ¡Listo!

El sistema se encargará automáticamente de:
- ✅ Crear la chatCard en la lista de personajes
- ✅ Crear la ruta `/chat/nombre-unico` 
- ✅ Renderizar el chat cuando hagas clic

## Cómo funciona:

1. **Home (`/`)** → Vista de búsqueda
2. **Chat (`/chat`)** → Lista de personajes con chatCards
3. **Chat individual (`/chat/rick`, `/chat/morty`, etc.)** → Ventana de chat
4. **About (`/about`)** → Página de información

## Arquitectura

- `src/data/charactersData.js` → Datos centralizados de personajes
- `src/views/characterChat.js` → Vista reutilizable del chat
- `src/views/characterList.js` → Lista de personajes con chatCards
- `src/router.js` → Enrutador dinámico que maneja `/chat/:id`

## Notas

- El `id` debe ser único y en minúsculas con guiones (ej: `pickle-rick`, `jessica`)
- El `systemPrompt` es crucial para definir la personalidad del personaje
- Los avatares deben ser URLs válidas (puedes usar la Rick and Morty API)
