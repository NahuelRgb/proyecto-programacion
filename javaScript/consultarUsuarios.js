// variable global que guarda el id del método setInterval() de la interfaz Win
let idIntervalo = 0;

function crearTabla(usuariosConectados) {

    // obtener elemento contenedor
    const contenedor = document.getElementById('contenedor');

    // obtener la tabla creada con HTML
    const tabla = document.getElementById('tabla');

    // Eliminar filas existentes
    while (tabla.rows.length > 0) {
        tabla.deleteRow(0);
    }

    // crear el cabezal de la tabla
    const thead = document.createElement('thead');

    // agregar una fila para los datos del encabezado
    thead.innerHTML = '<tr><th>Usuario..........</th><th>Estado</th></tr>';

    // crear el body de la tabla
    const tbody = document.createElement('tbody');
    for (let i = 0; i < usuariosConectados.length; i++) {

        const usuario = usuariosConectados[i];

        // crear una fila (trow)
        const tr = document.createElement('tr');

        const estado = usuario.conectado ? 'conectado' : 'no conectado';

        // agregar los datos (tdatos) a la fila - ascii alt96 para las comillas
        tr.innerHTML = `
            <td>${usuario.nombreUsuario}
            </td>
            <td>
                ${estado}
            </td>`;

        // agrega la fila al cuerpo de la tabla
        tbody.appendChild(tr);

    } // fin for

    // agrega el cabezal a la tabla
    tabla.appendChild(thead);

    // agrega el body a la tabla
    tabla.appendChild(tbody);

    //agrega la tabla al contenedor
    contenedor.appendChild(tabla);
}

async function consultarUsuarios() {

    // requerimientos con metodos GET/HEAD no pueden tener body
    const config = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // archivo que recibe los datos
let url = "seleccionarUsuariosconectados.php";

try {
    const respuesta = await (fetch(url, config));

    // verificar si la respuesta es OK (status 200-299)
    if (!respuesta.ok) {
        throw new Error('Error en la red o en el servidor: ' + respuesta.statusText);
    }

    // guardar la respuesta del servidor php
    const datos = await respuesta.json();

    console.log('Respuesta del servidor: ', datos);

    // obtener elemento div para mostrar mensajes
    const respuestaDiv = document.getElementById('respuesta');

    if (datos.status === 'exito') {
        crearTabla(datos.enviados);
    }
    else {
        respuestaDiv.style.color = 'red';
        respuestaDiv.innerHTML = 'Error en la petición';
    }

} 
// captura cualquier error durante la petición y el procesamiento
catch (error) {
    console.error('Error capturado ', error);
    }
}

function iniciar() {
    idIntervalo = setInterval(function () { consultarUsuarios() }, 5000);  
    // fijar ejecución de consultarUsuarios()
}

function detenerMostrarUsuarios() {
    clearInterval(idIntervalo); // detener ejecución de la función consultarUsuarios
}
