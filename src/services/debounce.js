/**
* Devuelve una version "debounceada" de fn.
* Solo la ejecuta si no se volvio a llamar en los ultimos 'delay' ms.
* Cancela las llamadas anteriores cuando llega una nueva.
*
* @param {Function} fn la funcion a debouncear
* @param {number} delay milisegundos de espera
* @returns {Function}
*/
export function debounce (fn, delay) {
    let timer = null;
    return function debounced(... args) {
        clearTimeout(timer);
        timer = setTimeout(() => fn.apply(this, args), delay);
    };
}

/**
* Promesa que se resuelve despues de N milisegundos.
* La usamos para esperar antes del reintento en el manejo del 429.
*/
export function wait (ms) {
return new Promise((resolve) => setTimeout(resolve, ms));
}