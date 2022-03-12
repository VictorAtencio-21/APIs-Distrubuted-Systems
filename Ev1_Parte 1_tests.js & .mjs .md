# Para el test1.js las lineas de codigo se ejecutan en el siguiente orden:

* 1.- new promise
* 2.- async function
* 3.- nextTick 1
* 4.- nextTick 2
* 5.- nextTick 3
* 6.- then 1
* 7.- then 2
* 8.- microtask 1
* 9.- microtask 2
* 10.- timeout 1
* 11.- timeout 2
* 12.- immediate 1
* 13.- immediate 2

Empieza por ejecutar la promesa que se resuelve para pasar a la funcion asincrona, luego los process.nextTick() se ejecutan apenas 
termine la fase actual en vez de esperar a que el loop termine, diferente de los setImmediate que corren luego de la fase de I/O polling y Callbacks,
luego se ejecutan las promesas que siguen despues de la fase donde se ejecuto la funcion asincrona. Para Microtask 1 y 2, el event loop
ejecuta todas las microtareas en la cola de microtareas. Despues el loop reinicia para ejecutar los setTimeouts, luego se ejecutan los setImmediate ya que no hay ningun poll pendiente, 
y termina la ejecucion del programa.


# Para test2.js tenemos el siguiente orden:

* 1.- new promise
* 2.- async function
* 3.- nextTick 1
* 4.- nextTick 2
* 5.- nextTick 3
* 6.- then 1
* 7.- then 2
* 8.- microtask 1
* 9.- microtask 2
* 10.- immediate 1
* 11.- immediate 2
* 12.- timeout 1
* 13.- timeout 2

Este fichero tiene un rendimiento parecido al anterior, la diferencia radica en que se inicia con
un readFile, luego de que se lee el archivo se instancia la promesa new promise, luego se espera a que
lleguen a las fases de poll despues de los timers.

# Para test3.mjs tenemos que el codigo esta escrito de la misma manera que el test1.js, con la diferencia de que es un archivo
ECMAScript6, esto quiere decir que influye en el orden de ejecucion del codigo.

Como el primer ejemplo tenemos que se ejecuta primero new promise y async function.

Sigue por imprimirse then 1 y then 2. microTask1 y 2, siguen en pantalla
los process.nextTick(), estos se ejecutan aqui sabiendo que esta cola es asincrona, por ultimo
tenemos los timers, a diferenicia del ejemplo 1, se ejecutan antes los setImmediate y luego 
los timeouts

