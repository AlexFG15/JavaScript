const alert = document.querySelector(".alert");
const form = document.querySelector("#formulario");
const pintarTodo = document.querySelector("#pintarTodo");
const templateTodo = document.querySelector("#templateTodo").content;


let todos = [];

const ageregarTodo = todo =>{
  const objetoTodo = {
    nombre : todo,
    id : `${Date.now()}`
  }
  todos.push(objetoTodo)
};


const pintarTodos = () =>{
    pintarTodo.textContent = '';
    const fragment =  document.createDocumentFragment();

    todos.forEach(item => {
      const clone = templateTodo.cloneNode(true);
      clone.querySelector('.lead').textContent = item.nombre;
      clone.querySelector('.btn').dataset.id = item.id;

      fragment.appendChild(clone);
    });

    pintarTodo.appendChild(fragment);
};

document.addEventListener('click', (e) =>{
    localStorage.setItem(todos, JSON.stringify(todos));
  // console.log(e.target.dataset.id);
  if(e.target.matches(".btn-danger")){
    //console.log("click en btndan");
   todos = todos.filter(item => item.id !== e.target.dataset.id ) //regresa un nuevo arreglo sobre la misma variable
    pintarTodos();
  }
});

form.addEventListener('submit', e =>{
  e.preventDefault();
  alert.classList.add('d-none'); 

    const data = new FormData(form);
    const [todo] =  [...data.values()];
    if(!todo.trim()){
      //console.log('Te equivocaste mandaste un vacio');
      alert.classList.remove('d-none');
      return; 
    }

    ageregarTodo(todo);
    pintarTodos();
});


document.addEventListener('DOMContentLoaded', (e)=>{
  e.preventDefault();
  if(localStorage.getItem('todos')) {
    todos = JSON.parse(localStorage.getItem('todos'));
    pintarTodos();
  }
  
});








/*const frutas = [
  {
      nombre: "🍌",
      color: "amarillo",
  },
  {
      nombre: "🍒",
      color: "rojo",
  },
  {
      nombre: "🍏",
      color: "verde",
  },
];

localStorage.setItem("frutas", JSON.stringify(frutas));

if (localStorage.getItem("frutas")) {
  const frutas = JSON.parse(localStorage.getItem("frutas"));
  console.log(frutas);
}*/