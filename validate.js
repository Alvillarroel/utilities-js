const validarForm = ($form) => {
  let valid = true;
  Array.from($form.elements).some(e => {
    const dataType = e.dataset.type;
    const dataTitle = (e.dataset.title !== undefined) ? e.dataset.title : e.name;
    if((e.required ) && utilities.isEmpty(e.value)) { 
      utilities.showToast(`El campo ${dataTitle} no debe estar vacio`, 3000);
      valid = false;
      return true;
    }
    // si el elemento tiene definido los datas para validación
    if (dataType !== undefined){
      if (e.required && dataType === 'letters' && !utilities.isString(e.value)){
        utilities.showToast(`El campo ${dataTitle} debe contener solo letras`, 3000);
        valid = false;
        return true;
      }
      if (e.required && dataType === 'email' && !utilities.isValidEmail(e.value)){
        utilities.showToast(`El campo ${dataTitle} debe ser valido`, 3000);
        valid = false;
        return true;
      }
      if (e.required && dataType === 'phone' && !utilities.isValidNumber(e.value)){
        utilities.showToast(`El campo ${dataTitle} debe ser valido`, 3000);
        valid = false;
        return true;
      }
      if (e.required && dataType === 'numbers' && isNaN(e.value)){
        utilities.showToast(`El campo ${dataTitle} debe contener solo números`, 3000);
        valid = false;
        return true;
      }
      if (e.required && dataType === 'rut' && !utilities.checkRut(e)){
        valid = false;
        return true;
      }
    } else {
      if (e.type === 'email' && !utilities.isValidEmail(e.value) && e.required){
        utilities.showToast(`El campo ${dataTitle} debe ser valido`, 3000);
        valid = false;
        return true;
      }
      if (e.type === 'tel' && !utilities.isValidNumber(e.value) && e.required){
        utilities.showToast(`El campo ${dataTitle} debe ser valido`, 3000);
        valid = false;
        return true;
      }
      if (e.type === 'checkbox' && !e.checked && e.required){
        utilities.showToast(`El campo ${dataTitle} debe ser seleccionado`, 3000);
        valid = false;
        return true;
      }
    }
  })
  return valid
}