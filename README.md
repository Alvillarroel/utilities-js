# utilities-js
> Códigos en JS que hacen mucho mas fácil el trabajo. 

usa el framework de diseño [materialize](https://materializecss.com/)

## Funciones
- Showtoast
- isEmpty
- isString
- onlyLetters
- isValidEmail
- isValidNumber
- postData
- getData
- cerrarMenu
- closeModalBottom
- presentLoader
- dissmissLoader
- activeTab
- isMobile
  - Android
  - BlackBerry
  - iOS
  - Opera
  - Windows
  - any
- checkRut
- formatRut

## Agregar al proyecto
agregar el archivo al proyecto 

`<script src="PATH/src/js/utils.js"/>`

o con js modular

`import * as utilities from 'src/js/utils.js';`

## Modo de uso
#### Showtoast
```
@params
mensaje string (Mensaje a mostrar)
duration int default 3000 (Tiempo de duración del mensaje)
utilities.showtoast('Hello World')
```
#### isEmpty
```
@params
text string (texto a evaluar)
return boolean
```
example
```js
const texto = "";
console.log(utilities.isEmpty(texto)) // true
```
