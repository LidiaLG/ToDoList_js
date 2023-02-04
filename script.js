const fecha = document.querySelector('#fecha')
const hora = document.querySelector('#hora')
const lista = document.querySelector('#lista')
const elemento = document.querySelector('#elemento')
const input = document.querySelector('#input')
const botonEnter = document.querySelector('#boton-enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let list

let id // para que inicie en 0 cada tarea tendra un id diferente

//creacion de fecha actualizada 

const date = new Date ()
fecha.innerHTML = date.toLocaleDateString('es-ES',{weekday: 'long', month: 'short', day:'numeric'})

const hour = new Date ()
hora.innerHTML = hour.toLocaleString('es', {hour: 'numeric', minute: 'numeric'})





// funcion de agregar tarea 

function agregarTarea( tarea,id,realizado,eliminado) {
    if(eliminado) {return} // si existe eliminado es true si no es false 
    const done = realizado ? check : uncheck // si realizado es verdadero check si no uncheck
    const line = realizado ? lineThrough : '' 
    const elemento = `
                        <li id="elemento">
                        <i class="far ${done}" data="realizado" id="${id}"></i>
                        <p class="text ${line}">${tarea}</p>
                        <i class="fas fa-trash de" data="eliminado" id="${id}"></i> 
                        </li>
                    `
    lista.insertAdjacentHTML("beforeend",elemento)

}


// funcion de Tarea Realizada 

function tareaRealizada(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    list[element.id].realizado = list[element.id].realizado ?false :true //Si
}

function tareaEliminada(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
    list[element.id].eliminado = true
}





// crear un evento para escuchar el enter y para habilitar el boton 

botonEnter.addEventListener('click', ()=> {
    const tarea = input.value
    if(tarea){
        agregarTarea(tarea,id,false,false)
        list.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',json.stringify(list))
        id++
        input.value = ''
    }

})

document.addEventListener('keyup', function (event) {
    if (event.key=='Enter'){
        const tarea = input.value
        if(tarea) {
            agregarTarea(tarea,id,false,false)
        list.push({
            nombre : tarea,
            id : id,
            realizado : false,
            eliminado : false
        })
        localStorage.setItem('TODO',json.stringify(list))
        input.value = ''
        id++
        console.log(list)
        }
    }
    
})


lista.addEventListener('click',function(event){
    const element = event.target 
    const elementData = element.attributes.data.value
    console.log(elementData)
    
    if(elementData == 'realizado') {
        tareaRealizada(element)
    }
    else if(elementData == 'eliminado') {
        tareaEliminada(element)
        console.log("elimnado")
    }
    localStorage.setItem('TODO',json.stringify(list))
})




let data = localStorage.getItem('TODO')
if(data){
    list = json.parse(data)
    console.log(list)
    id = list.length
    cargarLista(list)
}else {
    list = []
    id = 0
}


function cargarLista(array) {
    array.forEach(function(item){
        agregarTarea(item.nombre,item.id,item.realizado,item.eliminado)
    })
}