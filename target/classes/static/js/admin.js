let filteredItems = [];
let page = 'servicios';
const serviciosFilters = {
  masDemandada: {
    name: 'Mas demandadas',
    applied: true,
    filter: filterByMasDemandados,
    type: 'servicios',
  },
  noDemandadas: {
    name: 'No demandadas',
    applied: false,
    filter: filterByNoDemandados,
    type: 'servicios',
  },
  masIngresos: {
    name: 'Con mas ingresos',
    applied: false,
    filter: filterByMasIngresos,
    type: 'servicios',
  },
};
const profesionalesFilters = {
  profesionalesMasDemandados: {
    name: 'Profesionales mas demandados',
    applied: true,
    filter: filterProfesionalesByMasDemandados,
    type: 'profesionales',
  },
};

const filterApplied = 'MasDemand';

const services2 = [
  {
    nombre: 'test',
    id: 1,
    descripcion: 'test',
    categoria: 'Informática',
    horas: 50,
    precio_total: 100,
    profesional: {
      nombre: 'zico',
    },
    solicitudes: [
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 50,
        estado: 'Pendiente',
        descripcion_estado: null,
      },
    ],
  },
  {
    nombre: 'Reparación de ordenadores',
    descripcion: 'Reparamos todo tipo de dispositivos',
    categoria: 'Informática',
    horas: 50,
    id: 2,
    precio_total: 100,
    profesional: {
      nombre: 'Diego',
    },
    solicitudes: [
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 50,
        estado: 'Pendiente',
        descripcion_estado: null,
      },
    ],
  },
  {
    nombre: 'prueba de servicio',
    descripcion: 'prueba',
    categoria: 'Diseño',
    horas: 50,
    id: 3,
    precio_total: 10,
    profesional: {
      nombre: 'Nico',
    },
    solicitudes: [],
  },

  {
    nombre: 'Veterinario',
    descripcion: 'Veterinario a domicilio',
    categoria: 'Veterinaria',
    horas: 5,
    id: 4,
    precio_total: 15,
    profesional: {
      nombre: 'Diego',
    },
    solicitudes: [
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 5,
        estado: 'Confirmada',
        descripcion_estado: null,
      },
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 5,
        estado: 'Confirmada',
        descripcion_estado: null,
      },
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 50,
        estado: 'No repondida',
        descripcion_estado: null,
      },
      {
        fecha_solicitud: '15-03-2019',
        fecha_servicio: '16-03-19',
        direccion: 'Paseo de la Chopera 14, Madrid',
        importe: 10,
        estado: 'Pendiente',
        descripcion_estado: null,
      },
    ],
  },
];

// window.addEventListener('DOMContentLoaded', (event) => {
//   const main = document.getElementById('main');
//   main.innerHTML = getServicesPage();
//   displayHome('ANALYST');
// });

const displayServicios = () => {
  page = 'servicios';
  displayElements(serviciosFilters);

  $('#filters').attr('type', 'servicios');
  $('#filters').append(getFilterOptions(serviciosFilters));
  $('#filters').val(getActiveFilter(serviciosFilters));

  $('#serviciosTab').addClass('active');
};
const displayElements = (filters) => {
  applyFilter(filters);
  const main = document.getElementById('main');
  main.innerHTML = getTabs() + getServicesPage(false, true);
  const servicesWrapper = document.querySelector('.services');
  services.innerHTML = '';
  filteredItems.length > 0
    ? filteredItems.forEach((item) => {
      servicesWrapper.innerHTML
          += page === 'servicios' ? getService(item, false) : getProfesional(item);
    })
    : (servicesWrapper.innerHTML = "<div class='no-results'><h3>Not results found</h3></div>");
  $('.tabs-list > li').removeClass('active');
};

// Generar options a partir de los filtros pasados
const getFilterOptions = filters => Object.keys(filters).map(
  e => `<option value="${e}">${filters[e].name}</option>`,
);

// Devolver filtro activo
const getActiveFilter = filters => Object.keys(filters).filter(e => filters[e].applied)[0];

const displayProfesionales = () => {
  page = 'profesionales';
  displayElements(profesionalesFilters);
  $('#filters').append(getFilterOptions(profesionalesFilters));
  $('#filters').val(getActiveFilter(profesionalesFilters));
  $('#profesionalesTab').addClass('active');
};

const applyFilter = filters => Object.keys(filters).map((filter) => {
  if (filters[filter].applied) {
    filteredItems = filters[filter].filter([...services]);
  }
});

const filterChange = (select) => {
  let filters;
  let func;
  if (page === 'profesionales') {
    filters = profesionalesFilters;
    func = displayProfesionales;
  } else {
    filters = serviciosFilters;
    func = displayServicios;
  }
  Object.keys(filters).map((filter) => {
    if (filter === select.value) filters[filter].applied = true;
    else filters[filter].applied = false;
  });
  func();
};

const displayServiceView = (serviceId) => {
  const service = filteredItems.find(e => e.id === serviceId);
  const services = document.querySelector('.services');
  services.innerHTML = '';
  const container = document.querySelector('.container');
  container.innerHTML = `<div class="single-service"><div class="single-service-description"><h2>${
    service.nombre
  }</h2><h6>User: ${service.profesional.nombre}</h6><h6>Categoria: ${
    service.categoria
  }</h6><p>Price: ${service.precio_total}</p><p>Descripcion: ${
    service.descripcion
  }</p></div><img class="single-map" src="/images/map.png" alt="map"/> <button class="apply" onclick="openModal(${
    service.id
  })">Apply</button></div>`;
};


const displayRe = (id) => {
  const profesional = services.filter(service => service.id === id)[0].profesional;

  console.log(profesional);
  const ser = document.querySelector('.services');
  ser.innerHTML = '';
  const container = document.querySelector('.container');
  services.forEach((service) => {
    apiHandler.getProfessional(service._links.profesional.href)
      .then((p) => {
        if (profesional.email == p.email) {
          service.solicitudes.forEach((request) => {
            console.log(request);
            ser.innerHTML += `<div class="prof">
            <div class="prof-info">
              <p class='prof-name'>Fecha solicitud: ${request.fecha_solicitud}</p>
              <p class='prof-name'>Estado solicitud: ${request.estado}</p>
            </div>
          </div>`;
          });
        }
      });
  });
};
