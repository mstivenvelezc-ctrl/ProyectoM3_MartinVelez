# 💬 Chat con Personajes de Rick and Morty

Una aplicación interactiva de chat impulsada por IA (Google Gemini) donde puedes conversar con personajes de la serie animada Rick and Morty. Cada personaje tiene su propia personalidad, estilo de habla y conocimientos únicos.

**Aplicación desplegada:** https://proyecto-m3-martin-velez.vercel.app/  
**Repositorio GitHub:** https://github.com/mstivenvelezc-ctrl/ProyectoM3_MartinVelez

---

## 🎭 Personajes Disponibles

### 1. **Rick Sanchez** 🤓
- **Descripción:** El genio cínico de la serie. Rick es un científico brillante, alcohólico y extremadamente sarcástico.
- **Características:** Habla de forma desenfadada, usa la palabra "belch" (eructo), es irreverente pero ingenioso.
- **Ruta:** `/chat/rick`

### 2. **Morty Smith** 😰
- **Descripción:** El adolescente nervioso y bien intencionado. Siempre inseguro pero empático con los demás.
- **Características:** Tartamudea frecuentemente con "eheheh" y "mmm", expresa sus emociones abiertamente.
- **Ruta:** `/chat/morty`

### 3. **Summer Smith** ✨
- **Descripción:** La chica popular, segura de sí misma e inteligente. Generalmente amable y confiada en sus interacciones.
- **Características:** Comunicativa, moderna, a veces sarcástica pero siempre directa.
- **Ruta:** `/chat/summer`

---

## 🛠️ Requisitos Previos

- **Node.js** v16 o superior
- **npm** o **yarn**
- Cuenta en **Vercel** (para desplegar)
- Clave API de **Google Gemini** (para producción)

---

## 📦 Instalación Local

### 1. Clonar el repositorio

```bash
git clone https://github.com/mstivenvelezc-ctrl/ProyectoM3_MartinVelez.git
cd ProyectoM3_MartinVelez
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
GOOGLE_GENERATIVE_AI_API_KEY=tu_clave_api_aqui
```

O copia desde el archivo de ejemplo:

```bash
cp .env.example .env
```

Luego edita `.env` con tu clave API de Google Gemini.

### 4. Ejecutar en desarrollo con Vercel

```bash
npm install -g vercel
vercel dev
```

La aplicación estará disponible en `http://localhost:3000`

### 5. Uso de la aplicación

1. Navega a **Home** (`/`) para ver información
2. Ve a **Chat** (`/chat`) para seleccionar un personaje
3. Haz clic en un personaje para empezar a chatear
4. Escribe tus mensajes y recibe respuestas personalizadas

---

## 🧪 Ejecutar Tests

Los tests están configurados con **Vitest** para validar la lógica de transformación de payloads.

```bash
npm test
```

### Tests Incluidos

- ✅ Normalización de respuestas de Gemini
- ✅ Construcción de payloads para la API
- ✅ Gestión del historial de mensajes
- ✅ Interpolación de templates de strings

---

## 🚀 Desplegar a Vercel

### Método 1: CLI de Vercel

```bash
vercel --prod
```

### Método 2: Conectar repositorio en Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Importa tu repositorio de GitHub
3. Configura las variables de entorno (`GOOGLE_GENERATIVE_AI_API_KEY`)
4. Haz clic en Deploy

### Despliegue Automático

Cada push a la rama `main` se despliega automáticamente en Vercel.

---

## 📸 Capturas de Pantalla

### Home - Página Principal
- Descripción del proyecto
- Formulario de búsqueda de personajes
- Vista previa del personaje seleccionado

### Chat - Lista de Personajes
- Grid de personajes con avatares
- Botones para iniciar chat con cada uno
- Información resumida de cada personaje

### Vista de Chat
- Historial de conversaciones
- Input para escribir mensajes
- Respuestas personalizadas según el personaje
- Indicadores de carga y errores
- Botón de reintentar en caso de fallo

---

## 🤖 Historial de Asistencia IA en el Desarrollo

Durante el desarrollo de este proyecto, utilicé **GitHub Copilot (Claude Haiku 4.5)** como asistente principal para resolver problemas, implementar características y optimizar el código.

### Problemas Resueltos y Optimizaciones Implementadas

#### 1. **Problema de Recargas de Página** ❌ → ✅
- **Problema:** Al recargar en rutas como `/chat` o `/about`, el servidor retornaba error 404
- **Causa:** La app es una SPA (Single Page Application) pero el servidor no redireccionaba a `index.html`
- **Solución:** Configuré el enrutador dinámico con regex patterns para manejar rutas del lado del cliente
- **Resultado:** Las rutas se cargan correctamente incluso con F5

#### 2. **Sistema Escalable de Personajes** 🔧
- **Problema Inicial:** Solo había un chat hardcodeado para Rick
- **Implementación:** 
  - Creé `charactersData.js` como base de datos centralizada
  - Desarrollé `characterChat.js` como vista reutilizable
  - Implementé `characterList.js` para mostrar todos los personajes
  - **Resultado:** Sistema completamente modular - agregar un personaje requiere solo 10 líneas de código

#### 3. **Chats Independientes por Personaje** 🎭
- **Problema:** Todos los personajes compartían el mismo historial de mensajes
- **Solución:** Implementé `characterStates` - un objeto que almacena estado independiente por personaje ID
- **Resultado:** Cada personaje mantiene su propia conversación sin interferir con otros

#### 4. **Botón de Reintentar Defectuoso** 🔄
- **Problema:** El botón de reintentar enviaba múltiples mensajes duplicados
- **Causas:**
  - El evento de click disparaba el form submit
  - Se agregaba el mensaje del usuario de nuevo
  - Era muy sensible a clics múltiples
- **Solución:**
  - Separé lógica de "nuevo mensaje" vs "reintentar"
  - Agregué flag `isRetrying` para evitar múltiples clics
  - Creé función `handleChatRequest()` reutilizable
- **Resultado:** Un click = un reintento sin duplicar mensajes

#### 5. **Errores en Parámetros de Funciones** 🐛
- **Problemas encontrados:**
  - `fetchJson.js` no recibía el parámetro `options`
  - `aiClient.js` no aceptaba `systemPrompt` dinámico
  - Estaba hardcodeado a usar solo `RICK_SYSTEM_PROMPT`
- **Arreglos:**
  - Cambié firmas de funciones
  - Pasé `systemPrompt` desde `characterChat.js` → `aiClient.js` → `/api/chat`
- **Resultado:** Cada personaje usa su propio prompt de IA

#### 6. **Respuestas de IA sin Límite** 📝
- **Problema:** Las respuestas de Gemini generaban 10+ líneas, saturando el chat
- **Solución:** Modifiqué `normalizeAIResponse()` para limitar a máximo 3 líneas
- **Resultado:** Respuestas más concisas y UX mejorada

#### 7. **Tests Fallando** ❌
- **Errores encontrados:**
  - Línea 80: Comillas simples en lugar de backticks - no interpolaba variables
  - Línea 56: Modelo de IA incorrecto (`gemini-2.5-flash-lite` vs `gemini-3.1-flash-lite`)
- **Correcciones:**
  - `` `mensaje ${i + 1}` `` en lugar de `'mensaje ${i + 1}'`
  - Actualicé modelo a versión correcta
- **Resultado:** Tests pasan exitosamente con Vitest

#### 8. **Errores de Estilos CSS** 🎨
- **Problema:** Texto de characterCard__meta y characterCard__detail aparecía en negro
- **Causa:** Había un selector global `.view p { color: #252424 }` que sobreescribía estilos
- **Solución:**
  - Cambié color de `.view p` a `#ffffff` (blanco)
  - Agregué `!important` a las clases de caracterCard para forzar blanco
- **Resultado:** Interfaz visualmente correcta en todos los componentes

### Características Implementadas

| Característica | Ubicación | Descripción |
|---|---|---|
| 🎭 Personajes Dinámicos | `src/data/charactersData.js` | Base de datos escalable de personajes |
| 💬 Chat Reutilizable | `src/views/characterChat.js` | Vista de chat que funciona para cualquier personaje |
| 📋 Lista de Personajes | `src/views/characterList.js` | Grid dinámico con chatCards |
| 🔀 Enrutador Dinámico | `src/router.js` | Rutas `/chat/:id` con regex patterns |
| 🛡️ Interceptor de Links | `src/navigation.js` | Navegación SPA sin recargas |
| 🤖 Cliente de IA | `src/services/aiClient.js` | Integración con Gemini con systemPrompts dinámicos |
| 💾 Estado Independiente | `src/views/characterChat.js` | characterStates por ID de personaje |
| 📝 Limitación de Respuestas | `src/transform/chatPayload.js` | Máximo 3 líneas por respuesta |
| 🧪 Tests Automáticos | `test/chatPayload.test.js` | Cobertura de transformaciones |
| 🚀 Despliegue Vercel | `api/chat.js` | Serverless function para IA |

### Mejoras Técnicas Realizadas

- ✅ Separación de responsabilidades (componentes independientes)
- ✅ Estado centralizado y predecible
- ✅ Manejo robusto de errores con reintentos
- ✅ Código DRY (Don't Repeat Yourself)
- ✅ Fácil escalabilidad para nuevos personajes
- ✅ Testing automatizado
- ✅ Performance optimizado
- ✅ Accesibilidad mejorada (aria-labels, semantic HTML)

### Estadísticas del Desarrollo

- **Archivos creados:** 6 nuevos archivos
- **Archivos modificados:** 5 archivos
- **Líneas de código agregadas:** ~400 líneas
- **Bugs corregidos:** 8
- **Características implementadas:** 8
- **Tests pasando:** 6/6 ✅
- **Tiempo de resolución:** Optimizado mediante análisis rápido de problemas

---

## 🤖 Uso de IA en el Proyecto

Este proyecto utiliza **Google Gemini AI** para generar respuestas inteligentes y contextuales.

### Integración de IA

**Ubicación:** `src/services/aiClient.js` y `api/chat.js`

### Proceso de Comunicación

1. **Frontend (Cliente):** El usuario escribe un mensaje en el chat
2. **characterChat.js:** Recopila el mensaje y el historial
3. **aiClient.js:** Construye el payload con:
   - `systemPrompt`: Instrucciones de personalidad del personaje
   - `messages`: Historial de conversación
4. **Fetch → API:** Envía POST a `/api/chat` (Vercel Function)
5. **api/chat.js:** Recibe la solicitud y llama a Gemini
6. **Respuesta:** La IA genera respuesta manteniéndose en carácter
7. **Normalización:** Se procesan y limitan las respuestas a máximo 3 líneas

### Características de IA Implementadas

- ✅ **System Prompts Personalizados:** Cada personaje tiene instrucciones únicas
- ✅ **Historial Contextual:** Se mantienen últimos 12 mensajes
- ✅ **Limitación de Respuestas:** Máximo 3 líneas por respuesta
- ✅ **Control de Tokens:** Máximo 200 tokens de salida
- ✅ **Manejo de Errores:** Reintentos automáticos en caso de fallo
- ✅ **Mock para Testing:** Versión local sin conectar a Gemini

### Modificaciones y Optimizaciones Realizadas

- 🔧 Separación de `systemPrompt` por personaje en `characterStates`
- 🔧 Independencia de conversaciones (cada personaje tiene su historial)
- 🔧 Normalización de respuestas limitadas a 3 líneas
- 🔧 Manejo mejorado de errores con retry automático
- 🔧 Estructura de estado escalable para agregar nuevos personajes

---

## 📚 Cómo Agregar Nuevos Personajes

Para agregar más personajes de forma sencilla, consulta [AGREGAR_PERSONAJES.md](AGREGAR_PERSONAJES.md)

### Resumen Rápido

1. Edita `src/data/charactersData.js`
2. Agrega un nuevo objeto al array `characters`:

```javascript
{
    id: "nombre-unico",
    name: "Nombre Mostrado",
    route: "/chat/nombre-unico",
    avatar: "URL_IMAGEN",
    greeting: "Saludo inicial",
    systemPrompt: "Descripción de personalidad...",
}
```

3. ¡Listo! El sistema crea automáticamente:
   - ✅ Tarjeta en lista de personajes
   - ✅ Ruta `/chat/nombre-unico`
   - ✅ Chat independiente

---

## 🏗️ Arquitectura del Proyecto

```
src/
├── data/
│   └── charactersData.js       # Base de datos de personajes
├── services/
│   ├── aiClient.js             # Cliente de IA
│   ├── fetchJson.js            # Utilidad de fetch
│   ├── debounce.js             # Debouncing
│   └── mockGeminiApi.js        # Mock para testing
├── views/
│   ├── characterChat.js        # Vista de chat (reutilizable)
│   ├── characterList.js        # Lista de personajes
│   ├── home.js                 # Página de inicio
│   ├── about.js                # Página acerca de
│   └── notFound.js             # 404
├── transform/
│   └── chatPayload.js          # Transformación de payloads
├── ui/
│   └── messages.js             # Utilidades de mensajes
├── router.js                   # Enrutador dinámico
├── navigation.js               # Interceptor de links
├── main.js                     # Punto de entrada
└── styles.css                  # Estilos globales

api/
└── chat.js                     # Vercel Function para IA

test/
└── chatPayload.test.js         # Tests con Vitest
```

---

## 🔌 API Endpoints

### POST `/api/chat`

**Request:**
```json
{
  "systemInstruction": { "parts": [{ "text": "Eres Rick..." }] },
  "contents": [
    { "role": "user", "parts": [{ "text": "Hola" }] }
  ],
  "generationConfig": {
    "maxOutputTokens": 200,
    "temperature": 1
  }
}
```

**Response:**
```json
{
  "candidates": [{
    "content": {
      "parts": [{ "text": "Respuesta del personaje..." }],
      "role": "model"
    },
    "finishReason": "STOP"
  }],
  "usageMetadata": {
    "promptTokenCount": 10,
    "candidatesTokenCount": 10
  }
}
```

---

## 🐛 Troubleshooting

### Error: "HTTP 401: Unauthorized"
- Verifica que `GOOGLE_GENERATIVE_AI_API_KEY` esté configurada en `.env`
- Asegúrate que la clave es válida en Google Cloud Console

### Error: "Cannot read property 'messages'"
- Limpia el cache del navegador (localStorage)
- Recarga la página completamente

### Tests fallando
```bash
npm test -- --reporter=verbose
```

---

## 📝 Stack Tecnológico

- **Frontend:** JavaScript (ES Modules), HTML5, CSS3
- **Backend:** Vercel Functions (Serverless)
- **IA:** Google Gemini API
- **Testing:** Vitest
- **Deployment:** Vercel
- **Control de Versión:** Git / GitHub

---

## 📄 Licencia

ISC

---

## 👤 Autor

**Martín Vélez**  
📧 [GitHub](https://github.com/mstivenvelezc-ctrl)

---

## 🔗 Enlaces Útiles

- 🌐 [Aplicación en Vivo](https://proyecto-m3-martin-velez.vercel.app/)
- 📦 [Repositorio GitHub](https://github.com/mstivenvelezc-ctrl/ProyectoM3_MartinVelez)
- 🤖 [Google Gemini API](https://ai.google.dev/)
- 🚀 [Vercel Docs](https://vercel.com/docs)
- ✨ [Vitest Docs](https://vitest.dev/)

---

**¡Gracias por usar Chat con Personajes! 🎉**
