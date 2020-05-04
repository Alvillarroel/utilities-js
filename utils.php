<?php
/**
 * funciones de PHP de utilidad
 */

 /**
  * getString función para obtener el valor de cada campo
  * cuando el json_decode($string, true) no funciona
  * o para buscar el dato anidado dentro de un tipo memo
  * @param string $haystack contenido donde buscar
  * @param string $searchTerm campo a buscar su valor
  * @param array $simbol simbolo con el que termina el valor a buscar.
  * Ej: string(140) "{"error":1,"descripcion":"Error de validación: El Participante que intenta ingresar ya se encuentra
  * relacionado a la Activida de Colegio."}"
  * $error_crm = getString($response, 'error', array(',','}',';'));
  * $descrip_crm = getString($response, 'descripcion', array(',','}',';'));
  * return devuelve el valor del campo solicitado
  */
function getString(string $haystack, string $searchTerm, array $simbol){
  $pos = stripos($haystack, $searchTerm);
  $returnValue = '';
  if ($pos > -1){
   $pos += strlen($searchTerm) + 3;
   for ($i=$pos; $i < strlen($haystack); $i++) { 
    $e = substr($haystack, $i, 1);
    if (!in_array($e, $simbol)){
      $returnValue .= $e;
    } else {
     break;
    } 
   }
  }
  return $returnValue;
}