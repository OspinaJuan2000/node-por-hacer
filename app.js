
const argv = require('./config/yargs').argv
const porHacer = require('./por-hacer/por-hacer');
const colors = require('colors');
let comando = argv._[0];

switch (comando) {
    case 'crear':
        let tarea = porHacer.crearTarea(argv.descripcion);
        console.log(colors.green(tarea));
        break;

    case 'listar':
        let listaTareas = porHacer.obtenerListado();
        console.log('============Por hacer============'.green);
        listaTareas.map((tarea => {
            console.log(tarea.descripcion);
            console.log(colors.blue('Estado:'), tarea.completado);
            console.log('========================'.green);
        }));
        break;

    case 'eliminar':
        let tareaEliminada = porHacer.eliminarTarea(argv.descripcion);
        console.log(colors.red(tareaEliminada));
        break;
    
    case 'actualizar':
        let tareaActualizada = porHacer.actualizarTarea(argv.descripcion, argv.completado);
        console.log(colors.blue(tareaActualizada));
        break;

    case 'completadas':
        let tareas = porHacer.obtenerTareasCompletadas();
        if (typeof (tareas) === 'object') {
            tareas.map((tarea => {
                console.log(tarea.descripcion);
                console.log(colors.blue('Estado:'), tarea.completado);
                console.log('========================'.green);
            }));
        } else {
            console.log(colors.magenta(tareas));
        }
        break;

    case 'nocompletadas':
        let tareasNoCompletadas = porHacer.obtenerTareasNoCompletadas();

        if (typeof (tareasNoCompletadas) === 'object') {
            tareasNoCompletadas.map((tarea => {
                console.log(tarea.descripcion);
                console.log(colors.blue('Estado:'), tarea.completado);
                console.log('========================'.green);
            }));
        } else {
            console.log(colors.magenta(tareasNoCompletadas));
        }
        break;
    default:
        console.log('Comando desconocido');
}