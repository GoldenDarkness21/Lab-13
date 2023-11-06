class Task {
  constructor(texto, timestamp) {
    this.texto = texto;
    this.timestamp = timestamp;
  }

  createTaskElement() {
    const fondo = document.createElement("div");
    fondo.className = "fondo";

    const primero = document.createElement("div");
    primero.className = "primero";

    const cerrar = document.createElement("p");
    cerrar.className = "cerrar";
    cerrar.innerHTML = "x";

    const segundo = document.createElement("div");
    segundo.className = "segundo";
    segundo.textContent = this.texto;

    const tercero = document.createElement("div");
    tercero.className = "tercero";

    const azul = document.createElement("div");
    azul.className = "azul";
    const rojo = document.createElement("div");
    rojo.className = "rojo";

    primero.appendChild(cerrar);
    tercero.appendChild(azul);
    tercero.appendChild(rojo);
    fondo.appendChild(primero);
    fondo.appendChild(segundo);
    fondo.appendChild(tercero);

    return fondo;
  }
}

const inputElement = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const doList = document.getElementById('doList');
const doingList = document.getElementById('doingList');
const doneList = document.getElementById('doneList');

addTaskButton.addEventListener('click', function () {
  const textoIngresado = inputElement.value;
  if (textoIngresado) {
    const timestamp = Date.now();
    const newTask = new Task(textoIngresado, timestamp);
    const taskElement = newTask.createTaskElement();
    doList.appendChild(taskElement);

    // Agregar el evento de clic al botón de cerrar
    const cerrarElement = taskElement.querySelector('.cerrar');
    cerrarElement.addEventListener('click', function () {
      const fondo = cerrarElement.closest('.fondo');
      if (fondo) {
        fondo.remove();
        alert("Se eliminará una tarea");
      }
    });

    localStorage.setItem(`textoGuardado_${timestamp}`, textoIngresado);

    inputElement.value = '';
    alert('Texto guardado en localStorage.');
  } else {
    alert('Por favor, ingresa un texto antes de guardar.');
  }
});

document.addEventListener('click', function (event) {
  if (event.target.classList.contains('rojo')) {
    const fondo = event.target.closest('.fondo');
    if (fondo) {
      if (doingList.contains(fondo)) {
        doingList.removeChild(fondo);
        doneList.appendChild(fondo);
      } else if (doList.contains(fondo)) {
        doList.removeChild(fondo);
        doingList.appendChild(fondo);
      }
    }
    return;
  }

  if (event.target.classList.contains('azul')) {
    const fondo = event.target.closest('.fondo');
    if (fondo) {
      if (doneList.contains(fondo)) {
        doneList.removeChild(fondo);
        doingList.appendChild(fondo);
      } else if (doingList.contains(fondo)) {
        doingList.removeChild(fondo);
        doList.appendChild(fondo);
      }
    }
  }
});

