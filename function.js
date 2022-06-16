
const formulario = document.querySelector("#formulario");
const cardEstudiante = document.querySelector("#cardEstudiante");
const cardProfesor = document.querySelector("#cardProfesor");
const templateEstudiante = document.querySelector("#estudiante").content;
const templateProfesor = document.querySelector("#profesor").content;   
const alert = document.querySelector('.alert');
const estudiantes = []; //array para instancias 
const profesores = [];

document.addEventListener("click", (e) => {
   // console.log(e.target.dataset.nombre)
   if(e.target.dataset.uid){
      // console.log(e.target.matches('.btn-success'));
      if(e.target.matches('.btn-success')){
         estudiantes.map(item => {
            if(item.uid === e.target.dataset.uid){
               item.estado = true;
            }
            return item;
         });
      }

      if(e.target.matches('.btn-danger')){
         estudiantes.map(item => {
            if(item.uid === e.target.dataset.uid){
               item.estado = false;
            }
            return item;
         });
      }
      Persona.pintarPersonaUI(estudiantes, "Estudiante");
   }

});

class Persona {  //clase padre  
   constructor(nombre,edad){
      this.nombre = nombre;
      this.edad = edad;
      this.uid = `${Date.now()}`;
   }

   static pintarPersonaUI(personas,tipo){ //Metodo estatico no se instancia y accesible 
      if(tipo === "Estudiante"){
         
         cardEstudiante.textContent = "";
         const fragment = document.createDocumentFragment();

         personas.forEach( item => {   //se recorre el primer parametro que se manda en este caso estudiantes 
            fragment.appendChild(item.agregarNuevoEstudiante()); //agregamos informacion mediante instancia Estudiante a fragment
         });

         cardEstudiante.appendChild(fragment);
      }
      if(tipo === "Profesor"){
         
         cardProfesor.textContent = "";
         const fragment = document.createDocumentFragment();

         personas.forEach( item => {   //se recorre el primer parametro que se manda en este caso estudiantes 
            fragment.appendChild(item.agregarNuevoProfesor()); //agregamos informacion mediante instancia Estudiante a fragment
         });

         cardProfesor.appendChild(fragment);
      }
   }
}


class Estudiante extends Persona{
      #estado = true;
      #estudiante = "Estudiante";

      set setEstado(estado){
         this.#estado =  estado;
      }

      get getEstudiante(){
         return this.#estudiante;
      }

      agregarNuevoEstudiante(){
         const clone =  templateEstudiante.cloneNode(true);
         clone.querySelector('h5 .text-primary').textContent = this.nombre;
         clone.querySelector('h6').textContent = this.getEstudiante;
         clone.querySelector('.lead').textContent = this.edad;

         if(this.estado){
            clone.querySelector('.badge').className = "badge bg-success" 
            clone.querySelector('.btn-success').disabled = true;
            clone.querySelector('.btn-danger').disabled = false;
         }else{
            clone.querySelector('.badge').className = "badge bg-danger" 
            clone.querySelector('.btn-danger').disabled = true;
            clone.querySelector('.btn-success').disabled = false;
         }

         clone.querySelector('.badge').textContent = this.#estado ? "Aprobado" : "Reprobado"; 
         clone.querySelector('.btn-success').dataset.uid = this.uid;
         clone.querySelector('.btn-danger').dataset.uid = this.uid;

         return clone;
      }
}

class Profesor extends Persona{
   #profesor = "Profesor"

   agregarNuevoProfesor(){
      const clone =  templateProfesor.cloneNode(true);
      clone.querySelector('h5').textContent = this.nombre;
      clone.querySelector('h6').textContent =  this.#profesor;
      clone.querySelector('.lead').textContent = this.edad;

      return clone;
   }


}

formulario.addEventListener("submit", e =>{
   e.preventDefault();
   alert.classList.add('d-none');

   const datos = new FormData(formulario);
   const [nombre,edad,opcion] = [...datos.values()];
   //console.log(nombre,edad,opcion);

   if(!nombre.trim() || !edad.trim() || !opcion.trim()){
         alert.classList.remove('d-none');
      return
   }

   if(opcion === "Estudiante"){
      const estudiante = new Estudiante(nombre,edad); //instaciamos calse estudiante  
      //console.log(estudiante);
      estudiantes.push(estudiante);                   //Regresamos el array con nuevas instancias 
      Persona.pintarPersonaUI(estudiantes,opcion);
   }
   if (opcion === "Profesor" ){

      const profesor = new Profesor(nombre,edad);
      profesores.push(profesor);
      Persona.pintarPersonaUI(profesores,opcion);
   }

});