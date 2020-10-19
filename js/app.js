// Variables globales
const formUI = document.querySelector('#form-tareas');
const listaTareasUI = document.getElementById('lista-tareas');
let arrayTareas = [];

// Funciones
// Crear Item
const CrearTareas = (tarea) => {
  let item = {
    tarea: tarea,
    estado: false
  }
  arrayTareas.push(item);
  return item;
}

// Guardar en el Local Storage
const GuardarDB = () => {
  // El primer parametro es la carpeta en la que se almancenaran los elem de arrayTareas (debe ser transformado a JSON)
  localStorage.setItem('tareas', JSON.stringify(arrayTareas));

  MostrarDB();
}

// Mostrar los datos almacenados en mi localStorage
const MostrarDB = () => {
  listaTareasUI.innerHTML = '';

  arrayTareas = JSON.parse(localStorage.getItem('tareas'));
  if (arrayTareas === null) {
    arrayTareas = [];
  } else {
    arrayTareas.forEach(elem => {
      if (elem.estado) {
        listaTareasUI.innerHTML += `
        <div class="lista-tareas lista-check">
          <b>${elem.tarea}</b> <span class="escondido">${elem.estado}</span>
          <span>
            <i class="fas fa-trash-alt tareas-icon tarea-check" id="btn-eliminar"></i>
            <i class="far fa-check-circle tareas-icon tarea-check" id="btn-check"></i>
          </span>
        </div>
        `;
      } else {
        listaTareasUI.innerHTML += `
        <div class="lista-tareas">
          <b>${elem.tarea}</b> <span class="escondido">${elem.estado}</span>
          <span>
            <i class="fas fa-trash-alt tareas-icon" id="btn-eliminar"></i>
            <i class="far fa-check-circle tareas-icon" id="btn-check"></i>
          </span>
        </div>
        `;
      }
    });
  }
}

// Eliminar del Local Storage
const EliminarDB = (tarea) => {
  let idArray;
  arrayTareas.forEach((elem, id) => {
    if (elem.tarea === tarea) {
      idArray = id;
    }    
  });

  arrayTareas.splice(idArray, 1);
  GuardarDB();
}

// Editar el Local Storage
const EditarDB = (tarea) => {
  let idArray = arrayTareas.findIndex((elem) => {
    return (elem.tarea === tarea);
  });
  console.log(arrayTareas[idArray])

  arrayTareas[idArray].estado = true;
  GuardarDB();
}

// Eventos
formUI.addEventListener('submit', (e) => {
  e.preventDefault();

  let tareasUI = document.querySelector('#tareas').value;
  CrearTareas(tareasUI);
  GuardarDB();

  formUI.reset();
});

document.addEventListener('DOMContentLoaded', MostrarDB);

listaTareasUI.addEventListener('click', (e) => {
  e.preventDefault();

  // IMPORTANTE
  // e.path no está disponible para Firefox

  if (e.target.id === 'btn-check' || e.target.id === 'btn-eliminar') {
    const tarea = e.path[2].childNodes[1].innerHTML;
    if (e.target.id === 'btn-eliminar') {
      EliminarDB(tarea);
    }
    if (e.target.id === 'btn-check') {
      EditarDB(tarea);
    }
  }

})
