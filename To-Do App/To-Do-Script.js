let listaDeTareas=JSON.parse(localStorage.getItem("misTareas")) || [];
const input=document.getElementById("inputTarea");
const listaHTML=document.getElementById("lista-tareas");
let idTareaBajoMouse=null;
renderizarTareas();
input.addEventListener("keypress",function(event){
    if(event.key==="Enter"){
        agregarTarea();
    }
});
document.addEventListener("keydown",function(event){
    if(event.key==="Delete" && idTareaBajoMouse !== null && document.addEventListener !== input){
        eliminarTarea(idTareaBajoMouse);
    }
});
function agregarTarea(){
    const texto=input.value.trim();
    if(texto===""){
        alert("Por favor,ingrese una tarea");
        return
    }
    const nuevaTarea={
        id:Date.now(),
        texto:texto,
        completada:false
    };
    listaDeTareas.push(nuevaTarea);
    guardarYRenderizar();
    input.value="";
    input.focus();
}
function renderizarTareas(){
    listaHTML.innerHTML="";
    listaDeTareas.forEach(tarea =>{
        const li=document.createElement("li");
        li.onmouseenter=()=>{idTareaBajoMouse=tarea.id;};
        li.onmouseleave=()=>{idTareaBajoMouse=null;};
        if(tarea.completada){
            li.classList.add("tarea-completada");
        }
        const span=document.createElement("span");
        span.textContent=tarea.texto;
        span.onclick=()=>toggleCompletada(tarea.id);
        const botonBorrar=document.createElement("button");
        botonBorrar.textContent="🗑️";
        botonBorrar.className="btn-eliminar";
        botonBorrar.onclick=(e)=>{
            e.stopPropagation();
            eliminarTarea(tarea.id);
        };
        li.appendChild(span);
        li.appendChild(botonBorrar);
        listaHTML.appendChild(li);
    });
}
function toggleCompletada(id){
    listaDeTareas=listaDeTareas.map(tarea =>{
        if(tarea.id===id){
            return{...tarea,completada:!tarea.completada};
        }
        return tarea;
    });
    guardarYRenderizar();
}
function eliminarTarea(id){
    listaDeTareas=listaDeTareas.filter(tarea => tarea.id !=id);
    if(idTareaBajoMouse===id){
        idTareaBajoMouse=null;
    }
    guardarYRenderizar();
}
function guardarYRenderizar(){
    localStorage.setItem("misTareas",JSON.stringify(listaDeTareas));
    renderizarTareas();
}