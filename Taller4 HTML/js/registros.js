/* ================= FUNCIONES UTILITARIAS DE VALIDACIÓN ================= */

function gestionarClasesBootstrap(campo, esValido) {
    if (!campo) return; // Validación de seguridad
    if (esValido) {
        campo.classList.remove('is-invalid');
        campo.classList.add('is-valid');
    } else {
        campo.classList.remove('is-valid');
        campo.classList.add('is-invalid');
    }
}

function validarCampoObligatorio(campo, errorElement, mensaje) {
    if (campo.value.trim() === '') {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarSoloLetras(campo, errorElement, mensaje) {
    const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
    if (!soloLetrasRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarSoloNumeros(campo, errorElement, mensaje) {
    const soloNumerosRegex = /^\d+$/;
    if (!soloNumerosRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarCorreoFormato(campo, errorElement, mensaje) {
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!correoRegex.test(campo.value.trim())) {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarLongitud(campo, errorElement, min, max, mensaje) {
    if (campo.value.length < min || campo.value.length > max) {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarIgualdad(campo1, campo2, errorElement, mensaje) {
    if (campo1.value !== campo2.value || campo2.value.trim() === '') {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo2, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo2, true);
        return true;
    }
}

function validarCheckbox(campo, errorElement, mensaje) {
    if (!campo.checked) {
        errorElement.textContent = mensaje;
        gestionarClasesBootstrap(campo, false);
        return false;
    } else {
        errorElement.textContent = '';
        gestionarClasesBootstrap(campo, true);
        return true;
    }
}

function validarGenero(opciones, errorElement, mensaje) {
    let seleccionado = Array.from(opciones).some(radio => radio.checked);
    if (!seleccionado) {
        errorElement.textContent = mensaje;
        return false;
    } else {
        errorElement.textContent = '';
        return true;
    }
}

function mostrarMensajeExito() {
    Toastify({
        text: "✅ ¡Registro exitoso!",
        duration: 3000,
        gravity: "top",
        position: "right",
        style: {
            background: "rgba(0, 128, 0, 0.8)",
            color: "#fff",
            borderRadius: "12px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
            padding: "12px 20px"
        },
        stopOnFocus: true,
    }).showToast();
}

/* ================= LÓGICA DEL FORMULARIO DE REGISTRO ================= */

function validarFormularioRegistro() {
    const inputNombres = document.getElementById('nombres');
    const inputApellidos = document.getElementById('apellidos');
    const inputIdentificacion = document.getElementById('identificacion');
    const inputCorreo = document.getElementById('correo');
    const inputContrasenia = document.getElementById('contrasenia');
    const inputConfirmar = document.getElementById('confirmarContrasenia');
    const inputTerminos = document.getElementById('aceptaTerminos');
    const opcionesGenero = document.getElementsByName('genero');

    const errorNombres = document.getElementById('errorNombres');
    const errorApellidos = document.getElementById('errorApellidos');
    const errorIdentificacion = document.getElementById('errorIdentificacion');
    const errorCorreo = document.getElementById('errorCorreo');
    const errorContrasenia = document.getElementById('errorContrasenia');
    const errorConfirmar = document.getElementById('errorConfirmarContrasenia');
    const errorTerminos = document.getElementById('errorTerminos');
    const errorGenero = document.getElementById('errorGenero');

    const nombresValidos = validarCampoObligatorio(inputNombres, errorNombres, 'Este campo es obligatorio.') 
        && validarSoloLetras(inputNombres, errorNombres, 'El nombre solo puede contener letras.');
        
    const apellidosValidos = validarCampoObligatorio(inputApellidos, errorApellidos, 'Este campo es obligatorio.') 
        && validarSoloLetras(inputApellidos, errorApellidos, 'Los apellidos solo pueden contener letras.');
        
    const idValida = validarCampoObligatorio(inputIdentificacion, errorIdentificacion, 'Este campo es obligatorio.') 
        && validarSoloNumeros(inputIdentificacion, errorIdentificacion, 'La identificación solo debe contener números.');
        
    const correoValido = validarCampoObligatorio(inputCorreo, errorCorreo, 'Este campo es obligatorio.') 
        && validarCorreoFormato(inputCorreo, errorCorreo, 'Ingresa un formato de correo válido.');
        
    const contraseniaValida = validarCampoObligatorio(inputContrasenia, errorContrasenia, 'Este campo es obligatorio.') 
        && validarLongitud(inputContrasenia, errorContrasenia, 8, 50, 'La contraseña debe tener al menos 8 caracteres.');
        
    const confirmarValida = validarCampoObligatorio(inputConfirmar, errorConfirmar, 'Debes confirmar tu contraseña.') 
        && validarIgualdad(inputContrasenia, inputConfirmar, errorConfirmar, 'Las contraseñas no coinciden.');
        
    const generoValido = validarGenero(opcionesGenero, errorGenero, 'Debes seleccionar un género.');
    const terminosValidos = validarCheckbox(inputTerminos, errorTerminos, 'Debes aceptar los términos y condiciones.');

    if (nombresValidos && apellidosValidos && idValida && correoValido && contraseniaValida && confirmarValida && generoValido && terminosValidos) {
        mostrarMensajeExito();
        const formulario = document.getElementById('formRegistro');
        
        setTimeout(() => {
            formulario.reset();
            [inputNombres, inputApellidos, inputIdentificacion, inputCorreo, inputContrasenia, inputConfirmar, inputTerminos].forEach(input => {
                input.classList.remove('is-valid');
                input.classList.remove('is-invalid');
            });
        }, 2000);
        return true;
    } else {
        return false;
    }
}

/* ================= EVENTOS EN TIEMPO REAL Y AL CAMBIAR FOCO ================= */

function validarCamposRegistroInteractivo() {
    const inputs = [
        { id: 'nombres', errorId: 'errorNombres', func: (input, error) => validarCampoObligatorio(input, error, 'Este campo es obligatorio.') && validarSoloLetras(input, error, 'El nombre solo puede contener letras.') },
        { id: 'apellidos', errorId: 'errorApellidos', func: (input, error) => validarCampoObligatorio(input, error, 'Este campo es obligatorio.') && validarSoloLetras(input, error, 'Los apellidos solo pueden contener letras.') },
        { id: 'identificacion', errorId: 'errorIdentificacion', func: (input, error) => validarCampoObligatorio(input, error, 'Este campo es obligatorio.') && validarSoloNumeros(input, error, 'La identificación solo debe contener números.') },
        { id: 'correo', errorId: 'errorCorreo', func: (input, error) => validarCampoObligatorio(input, error, 'Este campo es obligatorio.') && validarCorreoFormato(input, error, 'Ingresa un formato de correo válido.') }
    ];

    // Asignar eventos de input y blur a textos básicos
    inputs.forEach(config => {
        const input = document.getElementById(config.id);
        const error = document.getElementById(config.errorId);
        if (input && error) {
            input.addEventListener('input', () => config.func(input, error));
            input.addEventListener('blur', () => config.func(input, error));
        }
    });

    // Validar contraseña 
    const inputContrasenia = document.getElementById('contrasenia');
    const errorContrasenia = document.getElementById('errorContrasenia');
    const inputConfirmar = document.getElementById('confirmarContrasenia');
    const errorConfirmar = document.getElementById('errorConfirmarContrasenia');

    const validarContra = () => validarCampoObligatorio(inputContrasenia, errorContrasenia, 'Este campo es obligatorio.') && validarLongitud(inputContrasenia, errorContrasenia, 8, 50, 'La contraseña debe tener al menos 8 caracteres.');
    const validarConfirma = () => validarIgualdad(inputContrasenia, inputConfirmar, errorConfirmar, 'Las contraseñas no coinciden.');

    if (inputContrasenia && inputConfirmar) {
        inputContrasenia.addEventListener('input', () => { validarContra(); if(inputConfirmar.value.length > 0) validarConfirma(); });
        inputContrasenia.addEventListener('blur', validarContra);
        inputConfirmar.addEventListener('input', validarConfirma);
        inputConfirmar.addEventListener('blur', validarConfirma);
    }

    // Validar género y checkbox
    const opcionesGenero = document.getElementsByName('genero');
    const errorGenero = document.getElementById('errorGenero');
    Array.from(opcionesGenero).forEach(radio => {
        radio.addEventListener('change', () => validarGenero(opcionesGenero, errorGenero, 'Debes seleccionar un género.'));
    });

    const inputTerminos = document.getElementById('aceptaTerminos');
    const errorTerminos = document.getElementById('errorTerminos');
    if (inputTerminos && errorTerminos) {
        inputTerminos.addEventListener('change', () => validarCheckbox(inputTerminos, errorTerminos, 'Debes aceptar los términos y condiciones.'));
    }
}

/* ================= INICIALIZACIÓN Y MANEJO DEL SUBMIT ================= */
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Aseguramos el Formulario PRIMERO para que JAMÁS recargue la página[cite: 11]
    const formRegistro = document.getElementById('formRegistro');
    if (formRegistro) {
        formRegistro.addEventListener('submit', (e) => {
            e.preventDefault(); // Detiene la recarga de inmediato[cite: 11]
            validarFormularioRegistro();
        });
    }

    // 2. Cargamos los eventos de cambiar de foco y escribir
    try {
        validarCamposRegistroInteractivo();
    } catch (error) {
        console.error("Error al asignar validaciones:", error);
    }
});