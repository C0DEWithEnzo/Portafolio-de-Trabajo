
document.getElementById('inputTarea').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        agregarTarea();
    }
});

function agregarTarea() {
    let input = document.getElementById('inputTarea');
    let textotarea = input.value.trim();
    if (textotarea === '') {
        alert('Por favor, ingrese una tarea');
        return;
    }

    let li = document.createElement('li');
    let span = document.createElement('span');
    span.textContent = textotarea;
    li.appendChild(span);

    let botonBorrar = document.createElement("button");
    botonBorrar.textContent = "X";
    botonBorrar.className = "btn-eliminar";
    
    botonBorrar.onclick = function() {
        li.remove();
    }

    li.appendChild(botonBorrar);
    document.getElementById("lista-tareas").appendChild(li);
    
    input.value = "";
    input.focus();
}