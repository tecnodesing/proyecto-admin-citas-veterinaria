import Citas from './classes/Citas.js';
import UI from './classes/UI.js';
import { mascotaInput,
     propietarioInput,
     telefonoInput,
     fechaInput,
     horaInput,
     sintomasInput,
     formulario 
} from './selectores.js';

const ui = new UI();
const administrarCitas = new Citas();

let editando;

//obj con la info de la cita
const citaObj = {
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas: ''
}

//para leeer obj
export function datosCita(e){
    citaObj[e.target.name] = e.target.value;
}

//valida y agrega una nueva cita a la clase de citas
export function nuevaCita(e){
    e.preventDefault();
    //extraer la informacion del objeto de citas
    const {mascota, propietario, telefono, fecha, hora, sintomas} = citaObj;
    //validar
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
        ui.imprimirAlerta('Todos los campos son obligatorios', 'error');
        return;
    }

    if(editando){
        ui.imprimirAlerta('Editado correctamente');
        //pasar obj de cita a edicion
        administrarCitas.editarCita({...citaObj})
        //regresar texto boton a estado original
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';
        //quitar modo edicion
        editando = false;

    }else{
        //generar id
        citaObj.id = Date.now();
        //creando cita
        administrarCitas.agregarCita({...citaObj});
        //mensaje correcto
        ui.imprimirAlerta('Se agregó correctamente');
    }
    //reiniciar objeto
    reiniciarObjeto();
    //reiniciar formulario
    formulario.reset();
    //mostrar el html
    ui.imprimirCitas(administrarCitas);
}

export function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora = '';
    citaObj.sintomas = '';
}

export function eliminarCita(id){
    //eliminar la cita
    administrarCitas.eliminarCita(id);

    //muestra mensaje
    ui.imprimirAlerta('La cita se elimino correctamente');

    //refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

export function cargarEdicion(cita){
    const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;
    //llenar los inputs
    mascotaInput.value = mascota;
    propietarioInput.value = propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //llenar el objeto
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;

    //cambiar texto de boton
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar cambios';

    editando = true;

}