const descripcion = {
    demand: true,
    alias: 'd',
    desc: 'descripción de la tarea por hacer'
}

const completado = {
    default: true,
    alias: 'c',
    desc: 'marca como completada o pendiente una tarea'
}

const argv = require('yargs')
    .command('crear', 'crear un elemento por hacer', {
        descripcion
    })
    .command('actualizar', 'actualiza el estado de una tarea', {
        descripcion,
        completado
    })
    .command('eliminar', 'elimina una tarea', {
        descripcion
    })
    .help()
    .argv;


module.exports = {
    argv
}