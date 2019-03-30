const apiHandler = new APIHandler('http://localhost:8080');


const displayServices = () => {
  apiHandler.getFullList()
    .then((data) => {
      const container = document.querySelector('#results');
      container.innerHTML = '';
      data._embedded.servicios.forEach((s) => {
        container.innerHTML += `<div class="service" serviceId='${s.id}'><img class="map" src="/images/map.png" alt="map" />
      <div class="service-description">
          <p class='service-category'>${s.categoria}</p>
          <h3>${s.nombre}</h3>
          <p class='service-price'>${s.precio_total} $</p>
          <div class="service-buttons"><button class="see-more" id="${s.id}">More</button><button class="apply" onclick="openModal(${s.id})">Apply</button></div>
      </div>
    </div>`;
      });
    });
};


const addServicio = () => {
  const formData = {};

  formData.nombre = $('#nombre').val();
  formData.descripcion = $('#descripcion').val();
  formData.categoria = $('#categoria').val();
  formData.horas = $('#horas').val();
  formData.precio_total = $('#precio').val();
  // Para el usuario hay que enviar la URI completa al objeto existente:
  formData.profesional = `http://localhost:8080/usuarios/${$('#profesional').val()}`;
  apiHandler.createOneRegister(formData)
    .then(() => {
      console.log('Service added');
      $('#nuevo-servicio')[0].reset();
    })
    .catch(err => console.error(err));
};


const getServicioById = () => {
  const id = $('#idservicio').val();
  apiHandler.getOneRegister(id)
    .then((s) => {
      const container = document.querySelector('#singleService');
      container.innerHTML = '';
      s.nombre != undefined
        ? container.innerHTML += `<div class="service" serviceId='${s.id}'><img class="map" src="/images/map.png" alt="map" />
      <div class="service-description">
          <p class='service-category'>${s.categoria}</p>
          <h3>${s.nombre}</h3>
          <p class='service-price'>${s.precio_total} $</p>
          <div class="service-buttons"><button class="see-more" id="${s.id}">More</button><button class="apply" onclick="openModal(${s.id})">Apply</button></div>
      </div>
    </div>` : container.innerHTML ='<h4>NO RESULTS</h4>';
    })
    .catch(err => console.error(err));
};
