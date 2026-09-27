
/* ================= REFERENCIAS HTML ================= */

const listaEspecialidades =
    document.getElementById("listaEspecialidades");

const descripcionEspecialidad =
    document.getElementById("descripcionEspecialidad");

const contenedorMedicos =
    document.getElementById("contenedorMedicos");


/* ================= MOSTRAR ESPECIALIDADES ================= */

function mostrarEspecialidades() {
    listaEspecialidades.innerHTML = "";

    especialidades.forEach((especialidad, indice) => {
        const boton = document.createElement("button");

        boton.type = "button";
        boton.className = "list-group-item list-group-item-action";

        if (indice === 0) {
            boton.classList.add("active");
        }

        boton.textContent = especialidad.nombre;

        boton.addEventListener("click", () => {
            seleccionarEspecialidad(especialidad.id, boton);
        });

        listaEspecialidades.appendChild(boton);
    });
}


/* ================= SELECCIONAR ESPECIALIDAD ================= */

function seleccionarEspecialidad(idEspecialidad, botonSeleccionado) {
    const especialidadSeleccionada = especialidades.find(
        especialidad => especialidad.id === idEspecialidad
    );

    if (!especialidadSeleccionada) {
        return;
    }

    // Actualizar botón activo
    const botones = listaEspecialidades.querySelectorAll("button");

    botones.forEach(boton => {
        boton.classList.remove("active");
    });

    botonSeleccionado.classList.add("active");


    // Mostrar descripción
    descripcionEspecialidad.innerHTML = `
        <h4 class="h6">
            ${especialidadSeleccionada.nombre}
        </h4>

        <p class="mb-0">
            ${especialidadSeleccionada.descripcion}
        </p>
    `;


    // Filtrar y mostrar médicos
    if (idEspecialidad === "todas") {
        mostrarMedicos(medicos);
    } else {
        const medicosFiltrados = medicos.filter(
            medico => medico.especialidad === idEspecialidad
        );

        mostrarMedicos(medicosFiltrados);
    }
}


/* ================= MOSTRAR TARJETAS ================= */

function mostrarMedicos(listaMedicos) {
    contenedorMedicos.innerHTML = "";

    if (listaMedicos.length === 0) {
        contenedorMedicos.innerHTML = `
            <div class="col-12">
                <div class="alert alert-info">
                    No hay médicos registrados en esta especialidad.
                </div>
            </div>
        `;

        return;
    }

    listaMedicos.forEach(medico => {
        const columna = document.createElement("div");

        columna.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        columna.innerHTML = `
            <article class="card tarjeta-medico h-100">

                <img
                    src="${medico.imagen}"
                    class="card-img-top imagen-medico"
                    alt="Fotografía de ${medico.nombre} ${medico.apellido}"
                >

                <div class="card-body">

                    <h3 class="h5 card-title">
                        ${medico.nombre} ${medico.apellido}
                    </h3>

                    <p class="small text-primary fw-bold mb-2">
                        ${obtenerNombreEspecialidad(medico.especialidad)}
                    </p>

                    <p class="card-text">
                        <strong>Subespecialidades:</strong>
                        ${medico.subespecialidades}
                    </p>

                    <p class="card-text">
                        <strong>Motivación:</strong>
                        ${medico.motivacion}
                    </p>

                    <a
                        href="#registro"
                        class="btn btn-primary"
                    >
                        Agendar
                    </a>

                </div>

            </article>
        `;

        contenedorMedicos.appendChild(columna);
    });
}


/* ================= NOMBRE DE ESPECIALIDAD ================= */

function obtenerNombreEspecialidad(idEspecialidad) {
    const especialidad = especialidades.find(
        item => item.id === idEspecialidad
    );

    return especialidad ? especialidad.nombre : "Sin especialidad";
}


/* ================= INICIALIZACIÓN ================= */

mostrarEspecialidades();
mostrarMedicos(medicos);