const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
const textArray = text.split(/\s+/).map(word => word.replace(/[.,;!?']/g, '')).filter(Boolean);
console.log(textArray)

// Proyecto del Algoritmo Sliding Window
// Problema: Encontrar la Palabra Más Larga
// Estás desarrollando una herramienta para ayudar a escritores a identificar la palabra más larga en un texto. El usuario ingresa un párrafo, y tu tarea es encontrar esa palabra utilizando la técnica Sliding Window. Este problema simplifica la lógica para que los alumnos practiquen cómo manejar cadenas de texto con ventanas deslizantes.

// Solución con Sliding Window

// OJO: Esta solución es para el siguiente problema:
// "Encontrar el subconjunto consecutivo de k palabras, cuya suma total de letras sea la máxima."
// "Encontrar la palabra más larga" no es muy óptimo resolverlo con el algoritmo sliding window,
// ya que solo es una palabra la que se está validando. Para ese caso es mejor con el de dos punteros.
// El problema "Encontrar la Palabra Más Larga" se solucionó con el algoritmo de dos punteros (soluciones abajo).

const k = 5;

const longestWordFinderSlidingWindow = (array, k) => {
    // if (k > array.length || k <= 0) return [];
    // Se crea un array con la primer ventana
    let ventanaInicial = textArray.slice(0, k);
    // Se suma el total de letras y se resguarda en sumaActual
    let sumaActual = ventanaInicial.reduce((acumulador, valorActual) => acumulador + valorActual.length, 0);
    // Se crea variable de sumaMaxima y se guarda la primer suma como la máxima por el momento.
    let sumaMaxima = sumaActual;
    // Se crea variable para guardar el resultado de palabras y se guarda la primer ventana como el resultado actual por el momento.
    let resultado = ventanaInicial;
    // Se crea variable para guardar el índice de la palabra donde comienza el arreglo que será el resultado.
    let startIndex = 0;
    for (let i = k; i < array.length; i++) {
        // Se suma el largo de la nueva palabra de la ventana recorrida, y se elimina el largo de la otra palabra que ya no forma parte de la ventana.
        sumaActual += array[i].length - array[i - k].length;
        // Si la sumaActual es mayor que la sumaMaxima:
        if (sumaActual > sumaMaxima) {
            // Se actualiza el índice de la palabra donde comienza el arreglo que será el resultado.
            startIndex = i - k + 1;
            // Se actualiza la sumaMaxima
            sumaMaxima = sumaActual;
            // Se actualiza el array de resultado, comenzando en el índce con número del valor de startIndex, y terminando en valor de startIndex + k
            resultado = array.slice(startIndex, startIndex + k)
        }
    }
    return resultado;
}

console.log(longestWordFinderSlidingWindow(textArray, k));

// Solución con algoritmo de los dos punteros (Opción 1)
// Problema: Encontrar la Palabra Más Larga

const longestWordFinderTwoPointersOp1 = (array) => {
    let inicio = 0;
    let fin = array.length - 1;
    let currentWord = '';
    let longestWord = currentWord;

    while (inicio <= fin) {
        if (array[inicio].length > array[fin].length) {
            currentWord = array[inicio];
        } else {
            currentWord = array[fin];
        }
        if (longestWord.length < currentWord.length) {
            longestWord = currentWord;
        }
        inicio++;
        fin--;
    }
    return longestWord;
}

console.log(longestWordFinderTwoPointersOp1(textArray));

// Solución con algoritmo de los dos punteros (Opción 1)
// Problema: Encontrar la Palabra Más Larga

const longestWordFinderTwoPointersOp2 = (array) => {
    let inicio = 0;
    let fin = array.length - 1;
    let longestWord = '';

    while (inicio <= fin) {
        if (array[inicio].length > longestWord.length) {
            longestWord = array[inicio];
        }
        if (array[fin].length > longestWord.length) {
            longestWord = array[fin];
        }
        inicio++;
        fin--;
    }
    return longestWord;
}

console.log(longestWordFinderTwoPointersOp2(textArray));