const txtcodigo = document.querySelector("#codigo");
const txtnombre = document.querySelector("#nombre");
const txtapellido = document.querySelector("#apellido");
const txtcorreo = document.querySelector("#email");
const guardar = document.querySelector("#boton-guardar");
const actualizar = document.querySelector("#boton-actualizar");
const eliminarbtn = document.querySelector("#boton-eliminar");
const consultar = document.querySelector("#boton-consultar");
const llenarDatos = document.querySelector(".llenar-datos");

class Nodo {
  constructor(codigo, nombre, apellido, correo) {
    this.codigo = codigo;
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correo;
    this.siguiente = null;
    this.anterior = null;
  }
}

class ListaEnlazadaDoble {
  constructor() {
    this.cabeza = null;
    this.longitud = 0;
  }

  agregar(codigo, nombre, apellido, correo) {
    const nodo = new Nodo(codigo, nombre, apellido, correo);
    if (this.cabeza === null) {
      this.cabeza = nodo;
    } else {
      let nodoActual = this.cabeza;
      while (nodoActual.siguiente !== null) {
        nodoActual = nodoActual.siguiente;
      }
      nodoActual.siguiente = nodo;
      nodo.anterior = nodoActual;
    }
    this.longitud++;
  }

  buscar(codigo) {
    let nodoActual = this.cabeza;
    while (nodoActual !== null) {
      if (nodoActual.codigo === codigo) {
        return nodoActual;
      }
      nodoActual = nodoActual.siguiente;
    }
    return null;
  }

  actualizar(codigo, nombre, apellido, correo) {
    const nodo = this.buscar(codigo);
    if (nodo !== null) {
      nodo.nombre = nombre;
      nodo.apellido = apellido;
      nodo.correo = correo;
    }
  }

  eliminar(codigo) {
    let nodoActual = this.cabeza;
    while (nodoActual !== null) {
      if (nodoActual.codigo === codigo) {
        if (nodoActual.anterior !== null) {
          nodoActual.anterior.siguiente = nodoActual.siguiente;
        } else {
          this.cabeza = nodoActual.siguiente;
        }
        if (nodoActual.siguiente !== null) {
          nodoActual.siguiente.anterior = nodoActual.anterior;
        }
        this.longitud--;
        return nodoActual;
      }
      nodoActual = nodoActual.siguiente;
    }
    return null;
  }
}

function LimpiarEntradas() {
  txtcodigo.value = "";
  txtnombre.value = "";
  txtapellido.value = "";
  txtcorreo.value = "";
  txtcodigo.focus();
}
const lista = new ListaEnlazadaDoble();

function VerDatos() {
  let cod, nom, apellido, correo;
  let nodoActual = lista.cabeza;
  num = 0;
  llenarDatos.innerHTML = "";
  while (nodoActual !== null) {
    cod = nodoActual.codigo;
    nom = nodoActual.nombre;
    apellido = nodoActual.apellido;
    correo = nodoActual.correo;
    num++;

    const fila = document.createElement("tr");
    fila.innerHTML = `
                <td>${num}</td>
                <td>${cod}</td>
                <td>${nom}</td>
                <td>${apellido}</td>
                <td>${correo}</td>
              `;

    llenarDatos.appendChild(fila);

    nodoActual = nodoActual.siguiente;
  }
}

guardar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  let nom = txtnombre.value.toUpperCase();
  let apellido = txtapellido.value.toUpperCase();
  let correo = txtcorreo.value;
  lista.agregar(cod, nom, apellido, correo);
  LimpiarEntradas();
  VerDatos();
});

eliminarbtn.addEventListener("click", () => {
  let cod = txtcodigo.value;
  lista.eliminar(cod);

  LimpiarEntradas();
  VerDatos();
});

consultar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  if (cod === "") {
    alert("Ingrese un codigo por favor");
  } else {
    busqueda = lista.buscar(cod);
    if (busqueda !== null) {
      txtnombre.value = busqueda.nombre;
      txtapellido.value = busqueda.apellido;
      txtcorreo.value = busqueda.correo;
    } else {
      alert("El código: " + cod + ", no esta en la Lista..");
    }
  }
});

actualizar.addEventListener("click", () => {
  let cod = txtcodigo.value;
  let nom = txtnombre.value.toUpperCase();
  let apellido = txtapellido.value.toUpperCase();
  let correo = txtcorreo.value;
  lista.actualizar(cod, nom, apellido, correo);

  LimpiarEntradas();
  VerDatos();
});
