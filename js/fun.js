const carrito = document.querySelector('#carrito');
const template = document.querySelector('#template');
const footer =  document.querySelector('#footer');
const templateFotter =  document.querySelector('#templateFooter')
const fragment = document.createDocumentFragment();


document.addEventListener('click', (e) =>{
    if(e.target.matches(".card .btn-outline-primary")){
        console.log("EJECUTAR");
        agregarAlCarrito(e);
    }

    //console.log(e.target.matches(".list-group-item .btn-success"));
    if(e.target.matches(".list-group-item .btn-success")){
        btnSumar(e);
    }

    if(e.target.matches(".list-group-item .btn-danger")){
        btnRestar(e);
    }

});


let carritoObjeto = [];

const agregarAlCarrito = (e) => {
    //console.log(e.target.dataset.fruta);

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        precio: parseInt(e.target.dataset.precio),
        cantidad: 1,
    };
    console.log(producto);
const indice = carritoObjeto.findIndex((item) => item.id === producto.id);
    //console.log(indice);
        if( indice === -1){
            carritoObjeto.push(producto);
        }else{
            carritoObjeto[indice].cantidad++;
            // carritoObjeto[indice].precio= carritoObjeto[indice].cantidad * producto.precio;
        }
     pintarCarrito(carritoObjeto);
    console.log();
};


const pintarCarrito = () => {

    carrito.textContent = ""

    carritoObjeto.forEach((item) =>{
        const clone = template.content.cloneNode(true); /* const clone = template.content.firstElementChild.cloneNode(true); */
        clone.querySelector('.text-white .lead').textContent = item.titulo;
        clone.querySelector('.badge').textContent = item.cantidad;
        clone.querySelector('div .lead span').textContent = item.precio * item.cantidad;

        clone.querySelector('.btn-danger').dataset.id = item.id ;
        clone.querySelector('.btn-success').dataset.id = item.id ;

        fragment.appendChild(clone);
    });
    carrito.append(fragment);
    pintarFooter();
};
const pintarFooter = () =>{
     footer.textContent = "";
     const total = carritoObjeto.reduce(
         (acc,current) => acc + current.cantidad * current.precio , 0
     ); 
     const clone = templateFotter.content.cloneNode(true); 
     clone.querySelector('span').textContent = total;

     footer.appendChild(clone);
};
const btnSumar = (e) => {
    console.log("me diste click ", e.target.dataset.id);
    carritoObjeto = carritoObjeto.map( item => {
        if(item.id ===  e.target.dataset.id){
            item.cantidad ++;
        }
        return item;
    });
    pintarCarrito();
};

const btnRestar = (e) => {
    console.log("me diste click ", e.target.dataset.id);
    carritoObjeto = carritoObjeto.filter( item => {
        if(item.id ===  e.target.dataset.id){
            if(item.cantidad > 0){
                item.cantidad --;
                if(item.cantidad === 0) return
                return item
            }
        }else{
            return item;
        }
    });
    pintarCarrito();
};

