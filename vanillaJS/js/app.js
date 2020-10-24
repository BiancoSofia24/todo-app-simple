// Variables globales
const formUI = document.querySelector('#task-form');
const taskSectionUI = document.querySelector('#task-section');
let taskArray = [];

// Funciones
// Crear Item
const CreateTask = (task) => {
  let item = {
    task: task,
    state: false
  }
  taskArray.push(item);
  return item;
}

// Guardar en el Local Storage
const SaveDB = () => {
  localStorage.setItem('tasks', JSON.stringify(taskArray));

  ShowDB();
}

// Mostrar los datos almacenados en mi localStorage
const ShowDB = () => {
  taskSectionUI.innerHTML = '';

  taskArray = JSON.parse(localStorage.getItem('tasks'));
  if (taskArray === null) {
    taskArray = [];
  } else {
    taskArray.forEach(elem => {
      if (elem.state) {
        taskSectionUI.innerHTML += `
        <div class="task-list check-list">
          <b>${elem.task}</b> <span class="hidden">${elem.state}</span>
          <span>
            <i class="fas fa-trash-alt task-icon task-check" id="delete-btn"></i>
            <i class="far fa-check-circle task-icon task-check" id="check-btn"></i>
          </span>
        </div>
        `;
      } else {
        taskSectionUI.innerHTML += `
        <div class="task-list">
          <b>${elem.task}</b> <span class="hidden">${elem.state}</span>
          <span>
            <i class="fas fa-trash-alt task-icon" id="delete-btn"></i>
            <i class="far fa-check-circle task-icon" id="check-btn"></i>
          </span>
        </div>
        `;
      }
    });
  }
}

// Eliminar del Local Storage
const DeleteDB = (task) => {
  let idArray;
  taskArray.forEach((elem, id) => {
    if (elem.task === task) {
      idArray = id;
    }    
  });

  taskArray.splice(idArray, 1);
  SaveDB();
}

// Editar el Local Storage
const EditDB = (task) => {
  let idArray = taskArray.findIndex((elem) => {
    return (elem.task === task);
  });

  taskArray[idArray].state = true;
  SaveDB();
}

// Eventos
formUI.addEventListener('submit', (e) => {
  e.preventDefault();

  let taskUI = document.querySelector('#task-input').value;
  CreateTask(taskUI);
  SaveDB();

  formUI.reset();
});

document.addEventListener('DOMContentLoaded', ShowDB);

taskSectionUI.addEventListener('click', (e) => {
  e.preventDefault();

  // IMPORTANTE: event.path no está disponible para Firefox

  if (e.target.id === 'check-btn' || e.target.id === 'delete-btn') {
    const task = e.path[2].childNodes[1].innerHTML;
    if (e.target.id === 'delete-btn') {
      DeleteDB(task);
    }
    if (e.target.id === 'check-btn') {
      EditDB(task);
    }
  }

})
