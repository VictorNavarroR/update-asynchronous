//Iteration#1
/* 
1.1 Utiliza esta url de la api Agify 'https://api.agify.io?name=michael' para 
hacer un .fetch() y recibir los datos que devuelve. Imprimelo mediante un 
console.log(). Para ello, es necesario que crees un .html y un .js. */

const apiUrl = 'https://api.agify.io?name=michael';

const getName = fetch(apiUrl)
  .then(res => res.json())
  .then(data => data);

  getName.then( data => console.log(data.name))

/* 2.1 Dado el siguiente javascript y html. Añade la funcionalidad necesaria usando 
fetch() para hacer una consulta a la api cuando se haga click en el botón, 
pasando como parametro de la api, el valor del input.
const baseUrl = 'https://api.nationalize.io'; */
const consultar = (requestValue) => {
  if(!requestValue.value) {
    throw new Error('No se pueden hacer peticiones vacías');
  }
  const baseUrl = 'https://api.nationalize.io';
  const request = fetch(`${baseUrl}?name=${requestValue.value}`);
  requestValue.value = '';

  request
    .then(res => res.json())
    .then(data => {
      console.log(data)
      //ejercicio 2.3 
       const newp = document.createElement('p');
       const newSpan = document.createElement('span');
       const spanTxt = document.createTextNode('X');
       newSpan.appendChild(spanTxt);
       newSpan.style.background = 'red';
       newSpan.style.color = 'white';
       newSpan.style.display = 'inline-block';
       newSpan.style.padding = '5px 10px';
       newSpan.style.borderRadius = '50%';
       newSpan.style.cursor = 'pointer';

       const textToP =  document.createTextNode(`
       El ${data.name} tiene un ${parseFloat(data.country[0].probability).toFixed(2)}% de ser ${data.country[0].country_id},
       un ${parseFloat(data.country[1].probability).toFixed(2)}% de ser ${data.country[1].country_id} 
       y un ${parseFloat(data.country[2].probability).toFixed(2)}% de ser ${data.country[2].country_id}
       `);

       newp.appendChild(textToP);
       
       newp.appendChild(newSpan);
       document.body.appendChild(newp);

    });
}

const requestValue = document.querySelector('.request-value');
const btnConsultar = document.querySelector('.btn-consulta');

btnConsultar.addEventListener('click', () => {
  consultar(requestValue);
});

/*2.3 En base al ejercicio anterior. Crea dinamicamente un elemento  por cada petición 
a la api que diga...'El nombre X tiene un Y porciento de ser de Z' etc etc.
EJ: El nombre Pepe tiene un 22 porciento de ser de ET y un 6 porciento de ser 
de MZ.  */

//solved in line 32

/* 2.4 En base al ejercicio anterior, crea un botón con el texto 'X' para cada uno 
de los p que hayas insertado y que si el usuario hace click en este botón 
eliminemos el parrafo asociado. */

document.body.addEventListener('click', e => {
  if(e.target.localName === 'span') {
    deleteP(e.target)
  }
})

const deleteP = (e) => {
  if(confirm('Seguro que desea eliminar el parrafo?')) {
    e.parentNode.remove();
  }
}
