const utilities = { 
  showToast: function ($msg, $time = 3000) {
    M.toast({
      html: $msg,
      displayLength: $time,
      classes: (this.isMobile.any() ? '' : 'rounded')
    })
  },
  isEmpty: function (str) {
    return (!str || 0 === str.length);
  },
  isString: function (str) {
    return /^[a-zA-Zá-úÁ-Úñ ]+$/.test(str);
  },
  onlyLetters: function (str) {
    return /^[a-zA-Zá-úÁ-Úñ ]+$/.test(str);
  },
  isValidEmail: function (email) {
    return /^[a-zA-Z0-9_\-\.~]{2,}@[a-zA-Z0-9_\-\.~]{2,}\.[a-zA-Z]{2,4}$/.test(email);
  },
  isValidNumber: function (number) {
    return /([+0-9]{12})/.test(number);
  },
  postData: async function (url, data) {
    let params = typeof data == 'string' ? data : Object.keys(data).map(
          function(k){ return encodeURIComponent(k) + '=' + encodeURIComponent(data[k]) }
        ).join('&');
    const dataSend = {
      method:'POST',
      mode: 'cors',
      cache:'no-cache',
      credentials: 'same-origin',
      headers:{
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body:params
    }
    const response = await fetch(url, dataSend);
    return await response.json();
  },
  getData: async function (url) {
    const myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    const init = {
      method:'GET',
      mode: 'no-cors',
      cache:'no-cache',
      credentials: 'omit',
      headers:myHeaders
    }
    const request = new Request(url, init);
    const response = await fetch(request);
    return await response.blob();
  }, 
  cerrarMenu: function (menuId) {
    let menuMobile = M.Sidenav.getInstance(document.getElementById(menuId));
    menuMobile.close();
  },
  closeModalBottom: function ($idModal) {
    let instance = M.Modal.getInstance(document.getElementById($idModal));
    instance.close();
  },
  presentLoader: function () {
    let loadingCtrl = document.createElement('div');
    loadingCtrl.classList.add('modal','loading-modal');
    loadingCtrl.innerHTML = '<div class="modal-content center"><div class="preloader-wrapper small active"><div class="spinner-layer spinner-green-only"><div class="circle-clipper left"><div class="circle"></div></div><div class="gap-patch"><div class="circle"></div></div><div class="circle-clipper right"><div class="circle"></div></div></div></div></div>';
    document.body.appendChild(loadingCtrl);
    M.Modal.init(loadingCtrl, {dismissible:false});
    let instance = M.Modal.getInstance(loadingCtrl);
    instance.open();
  },
  dissmissLoader: function () {
    let loadingCtrl = document.getElementsByClassName('loading-modal')[0];
    let instance = M.Modal.getInstance(loadingCtrl);
    instance.close();
    loadingCtrl.remove();
  },
  activeTab: function (prev, next) {
    const tabPrev = document.getElementById(prev);
    tabPrev.classList.add('disabled');
    const tabNext = document.getElementById(next);
    tabNext.classList.remove('disabled');
    const tabId = tabNext.children[0].href.split('#')[1];
    let tab = document.getElementsByClassName('tabs')[0];
    const instance = M.Tabs.getInstance(tab);
    instance.select(tabId)
  },
  isMobile: {
    Android: function(){
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function(){
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function(){
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function(){
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function(){
      return navigator.userAgent.match(/IEMobile/i);
    },
    any: function(){
      return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
    }
  },
  checkRut: function (rut) {
    // rut.value = 
    // let id = (rut.id);
    let valido = rut.value.replace(/\./g, '').trim().toLowerCase();
    if (valido.length > 0){
        var valor = valido;
        let texto = '';
        for (let i = 0; i < valor.length; i++) {
            if (valor.substr(i,1) !== '.')
            texto += valor.substr(i,1);
        }
        texto = texto.split('-');            
        if (texto[1] === undefined){
            this.showToast('ingrese el número de Rut completo, debe incluir el dígito verificador.', 5000);
            return false;
        }
        let dv = texto[1].toUpperCase();
        if (texto[0].length <= 8 && texto[1].length === 1){
            let aux = '';
            let valor=0;
            for (let i = 0; i < texto[0].length; i++) {
                if (i===0) 
                    aux = texto[0].substr(i,1);
                if (texto[0].substr(i,1) === aux){
                    valor++;
                }
            }
            if (valor === texto[0].length){
                this.showToast('Ingrese un Rut valido',5000);
                return false;
            }
            // Calcular Dígito Verificador
            let suma = 0;
            let multiplo = 2;                
            // Para cada dígito del Cuerpo
            for(let i=1; i <= texto[0].length; i++) {                
                // Obtener su Producto con el Múltiplo Correspondiente
                let index = multiplo * texto[0].charAt(texto[0].length - i);                    
                // Sumar al Contador General
                suma = suma + index;                    
                // Consolidar Múltiplo dentro del rango [2,7]
                if(multiplo < 7) { multiplo = multiplo + 1; } else { multiplo = 2; }            
            }                
            // Calcular Dígito Verificador en base al Módulo 11
            let dvEsperado = 11 - (suma % 11);
            //console.log(dvEsperado);                
            // Casos Especiales (0 y K)
            dv = (dv == 'K')?10:dv;
            dv = (dv == 0)?11:dv;                
            // Validar que el Cuerpo coincide con su Dígito Verificador
            if(dvEsperado != dv) { this.showToast('Ingrese un Rut valido',5000); return false; } 
            else 
                return true;                
        } else {    
            this.showToast('Ingrese un Rut valido',5000);
            return false;
        }
    } 
  },
  formatRut:(rut)=>{
    // XX.XXX.XXX-X
    // Z.ZZZ.ZZZ-Z
    const newRut = rut.replace(/\./g,'').replace(/\-/g, '').trim().toLowerCase();
    const lastDigit = newRut.substr(-1, 1);
    const rutDigit = newRut.substr(0, newRut.length-1)
    let format = '';
    let dot = 1;
    for (let i = rutDigit.length; i > 0; i--) {
      const e = rutDigit.charAt(i-1);
      format = e.concat(format);
      if (dot % 3 === 0){
        format = '.'.concat(format);
        dot=1;
        continue;
      }
      dot++;
    }
    return (format.charAt(0)==='.') ? format.substring(1,format.length).concat('-').concat(lastDigit).toUpperCase() : format.concat('-').concat(lastDigit).toUpperCase();
  }
}