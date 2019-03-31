const apiHandler = new APIHandler('http://localhost:8080');

let id;
window.onload = () => {
  const userName = document.querySelector('#professional-name');
  const userId = document.querySelector('#professional-id');
  const userEmail = document.querySelector('#professional-email');

  apiHandler.getCurrentUser()
    .then((user) => {
      id = user.id;
      changeContent(userName, `Bienvenid@ a tu perfil de profesional ${user.nombre}`);
      changeContent(userId, `Tu id de usuario es: ${user.id}`);
      changeContent(userEmail, `Tu email es: ${user.email}`);
    });
};

const displayProfessionalServices = () => {
  apiHandler.getCurrentUser()
    .then((user) => {
      apiHandler.getFullList()
        .then((data) => {
          const container = document.querySelector('#results');
          container.innerHTML = '';
          data.forEach((s, i) => {
            const serviceId = s._links.self.href.split('/servicios/')[1];
            apiHandler.getProfessional(s._links.profesional.href)
              .then((profesional) => {
                if (profesional.email == user.email) {
                  container.innerHTML += `<div class="service" serviceId='${s.id}'><img class="map" src="/images/map.png" alt="map" />
            <div class="service-description">
                <p class='service-category'>${s.categoria}</p>
                <h3>${s.nombre}</h3>
                <p class='service-price'>${s.precio_total} $</p>
                <div class="service-buttons"><button class="see-more" id="${s.id}">More</button><button class="apply" onclick="openDeleteModal(${serviceId})">Borrar</button></div>
            </div>
          </div>`;
                }
              });
          });
        });
    });
};


const addServicio = () => {
  apiHandler.getCurrentUser()
    .then((user) => {
      const formData = {};

      formData.nombre = $('#nombre').val();
      formData.descripcion = $('#descripcion').val();
      formData.categoria = $('#categoria').val();
      formData.horas = $('#horas').val();
      formData.precio_total = $('#precio').val();
      // Para el usuario hay que enviar la URI completa al objeto existente:
      formData.profesional = `http://localhost:8080/usuarios/${user.id}`;
      apiHandler.createOneRegister(formData)
        .then(() => {
          console.log('Service added');
          $('#nuevo-servicio')[0].reset();
        })
        .catch(err => console.error(err));
    });
};


const getServicioById = () => {
  const id = $('#idservicio').val();
  const container = document.querySelector('#singleService');
  container.innerHTML = '';
  apiHandler.getCurrentUser()
    .then((user) => {
      apiHandler.getOneRegister(id)
        .then((s) => {
          apiHandler.getProfessional(s._links.profesional.href)
            .then((profesional) => {
              s.nombre != undefined && profesional.email == user.email
                ? container.innerHTML += `<div class="service" serviceId='${s.id}'><img class="map" src="/images/map.png" alt="map" />
        <div class="service-description">
            <p class='service-category'>${s.categoria}</p>
            <h3>${s.nombre}</h3>
            <p class='service-price'>${s.precio_total} $</p>
            <div class="service-buttons"><button class="see-more" id="${s.id}">More</button><button class="apply" onclick="openDeleteModal(${id})">Borrar</button></div>
        </div>
      </div>` : container.innerHTML = '<h4>No tienes servicios con ese identificador</h4>';
            });
        })
        .catch(err => container.innerHTML = '<h4>No tienes servicios con ese identificador</h4>');
    });
};


openDeleteModal = (id) => {
  document.querySelector('#delete-modal').style.display = 'block';
  changeContent(document.querySelector('#delete-id'), id);
};

closeDeleteModal = () => {
  document.querySelector('#delete-modal').style.display = 'none';
};

deleteService = () => {
  const id = document.querySelector('#delete-id').innerHTML;
  console.log(id);
  apiHandler.deleteOneRegister(id)
    .then(() => closeDeleteModal());
};

const changeContent = (selector, content) => {
  selector.innerHTML = '';
  selector.innerHTML = content;
};
