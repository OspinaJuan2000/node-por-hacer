const fs = require('fs');


let listaTareas = [];

const cargarDB = () => {
    try {
        listaTareas = require('../db/data.json');
    } catch (e) {
        listaTareas = [];
    }

    return listaTareas;
}

const guardarDB = () => {
    
    let data = JSON.stringify(listaTareas);

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const crearTarea = (descripcion) => {

    cargarDB();

    let porHacer = {
        descripcion,
        completado: false
    }

    listaTareas.push(porHacer);

    guardarDB();

    return `Se creo la tarea ${descripcion}`;
}

const obtenerListado = () => cargarDB();

const eliminarTarea = (tarea) => {
    let listado = cargarDB();

    let tareaEliminada = listado.findIndex(lista => lista.descripcion === tarea);

    if (tareaEliminada >= 0) {
        listado.splice(tareaEliminada, 1);

        guardarDB();
        return `La tarea ${tarea} ha sido eliminada`;
    } else {
        return `No se encontró la tarea ${tarea}`;
    }
}

const actualizarTarea = (tarea, completado = true) => {
    let listado = cargarDB();

    let tareaActualizada = listado.findIndex(lista => lista.descripcion === tarea);

    if (tareaActualizada >= 0) {
        listado[tareaActualizada].completado = completado;

        guardarDB();

        return `La tarea ${tarea} ha sido actualizada, ahora está en estado ${completado}`;
    } else {
        return `No se encontró la tarea ${tarea}`;
    }
}

const obtenerTareasCompletadas = () => {

    let listado = cargarDB();

    let completadas = listado.filter(tarea => tarea.completado === true);

    if (completadas.length) {
        return completadas;
    } else {
        return `No hay tareas completadas`;
    }
}

const obtenerTareasNoCompletadas = () => {

    let listado = cargarDB();

    let noCompletadas = listado.filter(tarea => tarea.completado !== true);

    if (noCompletadas.length) {
        return noCompletadas;
    } else {
        return `No hay tareas pendientes`;
    }
}

module.exports = {
    crearTarea,
    obtenerListado,
    eliminarTarea,
    actualizarTarea,
    obtenerTareasCompletadas,
    obtenerTareasNoCompletadas
}