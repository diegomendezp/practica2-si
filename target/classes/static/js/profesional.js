const apiHandler = new APIHandler('http://localhost:8080');


const displayServices = () => {
  apiHandler.getFullList()
    .then((data) => {
      const container = document.querySelector('#results');
      container.innerHTML = '';
      data._embedded.servicios.forEach((service) => { container.innerHTML += `<li>${service.nombre}</li>`; });
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
    .then((data) => {
      const container = document.querySelector('#singleService');
      container.innerHTML = '';
      container.innerHTML += `<li>${data.nombre}</li><li>${data.descripcion}</li>`;
    })
    .catch(err => console.error(err));
};
