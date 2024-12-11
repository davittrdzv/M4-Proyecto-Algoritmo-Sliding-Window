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

// Ventana Deslizable Fija (Fixed Sliding Window)
// Suma máxima de "k" números

const numsFixedSlidingWindow1 = [10, 16, 3, 5, 40, 17, 26];
const numsFixedSlidingWindow2 = [-4, -1, 0, 3, 10];
// k es la variable del número de elementos que validaríamos, si fuera suma de 10, sería 10
const k1 = 3;

const sumaMaxima = (array, k) => {
    // slice() retorna una copia del array original con una porción de éste.
    // slice(0, 2) 0 es el índice donde comienza, 2 donde acaba (no incluiría el dos en este caso)
    // ventanaInicial es una nueva variable que tiene la primer ventana
    // Esta variable no es tan necesaria entiendo.
    // Podría hacerse sin esta variable y guardarse en sumaActual pero sí se debe hacer la primer suma.
    let ventanaInicial = array.slice(0, k);
    // reduce() suma los elementos de todo el array
    // Argumento acumulador, valorActual, valorInicial
    // Con reduce() nos estamos ahorrando hacer un ciclo para hacer la suma de losvalores del array ventana
    // sumaActual guardará la suma de la iteración respectiva
    let sumaActual = ventanaInicial.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
    // sumaMaxima guardará el valor de la suma que resulte máxima.
    // Al empezar tendrá que ser sumaActual porque es la primer suma
    let sumaMaxima = sumaActual;
    // Ciclo for para recorrer ventana.
    // i comienza con el valor de k, que es el índice siguiente de la ventana
    // en este caso el último índice utilizado fue 2
    // i termina en el último índice del array a validar (i < array.length)
    for (let i = k; i < array.length; i++) {
        // Se actualiza valor de sumaActual con base en cada iteración
        // sumaActual = Su valor actual + índice siguiente del array - "primer" índice del array
        // array[i] es el nuevo índice, array[3], array[4], y así sucesivamente
        // array[i - k] es el primer índice de la ventana, array[3 - valor k (3), que daría 0], array[4 - valor k (3), que daría 1], y así sucesivamente
        sumaActual = sumaActual + array[i] - array[i - k]; // Agrega el nuevo elemento y elimina el primero
        // Math.max(num1, num2) retorna el numero mayor de esos dos
        // sumaMaxima guardará el nuevo valor máximo gracias a Math.max
        sumaMaxima = Math.max(sumaMaxima, sumaActual);
    }
    // Retornar sumaMaxima (ya la mayor mayor después de todas las iteraciones)
    return sumaMaxima;
}

console.log(sumaMaxima(numsFixedSlidingWindow1, k1));
console.log(sumaMaxima(numsFixedSlidingWindow2, k1));

// Ventana Deslizable Variable (Variable Sliding Window)

// Unos Consecutivos
// Obtener el máximo de unos consecutivos en un array.
// Solo se pueden transformar ceros a unos k veces(en este caso 2)

const numsVariableSlidingWindow1 = [1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 0];
const numsVariableSlidingWindow2 = [1, 1, 1, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0];
const k2 = 2;

const unosConsecutivos = (array, k) => {
    // Crear variable que guarde el la longitud máxima que llevamos al momento
    let longitudMaxima = 0;
    // variable para indicar cuántos ceros llevamos utilizados
    let ceros = 0;
    // variable para la ventana de inicio (izquierda)
    let inicio = 0;
    // Ciclo para recorrer ventana
    // fin(i) termina en el último índice del array a validar (fin < array.length)
    // Comienza con una ventana pequeña (indice inicio 0 indice  )
    for (let fin = 0; fin < array.length; fin++) {
        // si el índice del fin tiene un cero, se agrega el contador a la variable cero
        // para controlar que el total de ceros no sea mayor a k
        if (array[fin] === 0 ) {
            ceros++;
        }
        // mientras los ceros sean mayores a k:
        // 1 si el indice del array es igual a cero, se reduce un cero
        // 2 se actualiza la ventana (se recorre el inicio + 1)
        while (ceros > k) {
            if(array[inicio] === 0) {
                ceros--;
            }
            inicio++;
        }
        // longitudActual es igual al fin (índice) - fin (índice) + 1 (porque estamos contando el número de valores revisados)
        // Ejemplo, revisando dos índices, 0 (inicio), 4 (fin). Entonces revisamos 5 índices pero 4 - 0 es 4. Por eso + 1
        const longitudActual = fin - inicio + 1;
        // longitudMaxima guardará el nuevo valor máximo gracias a Math.max
        longitudMaxima = Math.max(longitudActual, longitudMaxima);
        }
        return longitudMaxima;
    }

console.log(unosConsecutivos(numsVariableSlidingWindow1, k2));
console.log(unosConsecutivos(numsVariableSlidingWindow2, k2));