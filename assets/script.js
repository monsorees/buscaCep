const input = document.querySelector('.input');
const resultado = document.querySelector('.resultado');
const button = document.querySelector('.button');
const xhr = new XMLHttpRequest();


input.addEventListener('keypress', (e) => {
  if(e.keyCode === 13) {
    principal()
  }
})


button.addEventListener('click', principal)

  function principal() {
  
  xhr.open('GET', 'https://viacep.com.br/ws/' + input.value + '/json', true);
  
  xhr.onload = () => {
    if(xhr.status >= 200 && xhr.status < 300) {
      const data = JSON.parse(xhr.responseText);
      console.log('Dados recebidos: ', data);
      resultado.innerHTML = `
                            <p> Cep: ${data.cep}</p>
                            <p> Bairro: ${data.bairro}</p>
                            <p> Rua: ${data.logradouro}</p>
                            <p> Complemento: ${data.complemento}</p>
                            <p> Localidade: ${data.localidade}</p>
                            <p> Estado: ${data.uf}</p>
                            `
    }
  }
  
  const letrasOuSimbolos = /[^0-9]/;

  xhr.onerror = () => {
    if (!input.value) {
      return alert('CAMPO VAZIO') 
    }
    else if (letrasOuSimbolos.test(input.value)) {
      return alert('POR FAVOR DIGITE APENAS NUMEROS');
    }
    else if (input.value != 8) {
      return alert('O CEP DEVE CONTER 8 DIGITOS. POR FAVOR, VERIFIQUE OS NUMEROS DO CEP INFORMADO ')
    }
    resultado.innerHTML= 'CEP ERRADO, VERIFIQUE OS NUMEROS INFORMADOS';
  }
  
  xhr.send();
}
