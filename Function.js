
const dinamics = document.querySelector("#card-dinamics");
const templateCard = document.querySelector("#templateCard").content


document.addEventListener("DOMContentLoaded", () => {
    fetchData();
})


const fetchData = async () => {

    try{
        loadingData(true);

        const res = await fetch('https://rickandmortyapi.com/api/character');
        const  data = await res.json();
        console.log(data);
        pintarDatos(data);
    }catch(error){
        console.log(error);
    }finally{
        loadingData(false)

    }

}

const pintarDatos = data =>{
    const dinamics = document.querySelector("#card-dinamics");
    const templateCard = document.querySelector("#templateCard").content
    const fragment = document.createDocumentFragment();
        //console.log(data);
    data.results.forEach(element => {
       //console.log(element); 
       const clone = templateCard.cloneNode(true)
       clone.querySelector("h5").textContent = element.name;
       clone.querySelector("p").textContent =  element.species;
       clone.querySelector(".card-img-top").setAttribute("src", element.image);
        //Guardamos en fragment para evitar el reflow s 
       fragment.appendChild(clone);
    });
    dinamics.appendChild(fragment);
}
    //pintar el loading
const  loadingData =  estado  => {
    const  loading =  document.querySelector("#loading");
    if(estado){
        loading.classList.remove('d-none');
    }else{
        loading.classList.add('d-none')
    }
}