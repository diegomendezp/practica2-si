// Nicolae Alexe y Diego Méndez

// const apiHandler = new APIHandler('http://localhost:8080');
let info = [];
let category = '';
let seccion;
const searchedValue = '';
let selectedService = null;
let rol;
const sendRequest = () => {
  const modal = document.getElementById('modal-container');
  modal.innerHTML = getServiceConfirmation();
};
const openModal = (serviceId) => {
  selectedService = serviceId;
  updateModal();
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
};

const updateModal = () => {
  const service = info.find(e => e.id === selectedService);
  const modal = document.getElementById('modal-container');
  modal.innerHTML = getModalService(service);
};

window.onresize = () => {
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  if (isMobile) {
    $('#user-menu-navigation').prepend('<li class="nav-link" onclick="profile()">Perfil</li>');
    $('#user-menu-navigation').append('<li class="nav-link exit" onclick="hideMenu()"><i class="fas fa-times"></i></li>');
  }
};
window.onload = () => {
  const servicesNavigation = document.querySelector('.services-navigation');

  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  if (isMobile) {
    $('#user-menu-navigation').prepend('<li class="nav-link" onclick="profile()">Perfil</li>');
    $('#user-menu-navigation').append('<li class="nav-link exit" onclick="hideMenu()"><i class="fas fa-times"></i></li>');
  }
  // ********  Modal configuration  ******//
  const modal = document.getElementById('myModal');

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName('close')[0];


  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = 'none';
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = (event) => {
    if (event.target == modal) {
      modal.style.display = 'none';
    }
  };

  // apiHandler.getFullList()
  //   .then((data) => {
  //     info = data;
  //     // servicesNavigation.onclick = ((e) => {
  //     //   displayServices(info);
  //     // });
  //     // displayServices(info)
  //   });
  displayHome();
};

const displayHome = (role='CUSTOMER') => {
  const main = document.getElementById('main');
  if (rol) return displayServices(info);
  main.innerHTML = getHome(role);
};


const displayServices = (data) => {
  const main = document.getElementById('main');
  main.innerHTML = getServicesPage();
  renderCategoryOptions();
  const container = document.querySelector('.container');
  renderServices(data, container);
};
const filterServices = (text = searchedValue) => {
  const data = info.filter(e => e.category.toLowerCase().includes(category.toLowerCase())).filter(e => e.author.toLowerCase().includes(text.toLowerCase()));
  const container = document.querySelector('.container');
  renderServices(data, container);
};

const categoryChange = (c) => {
  category = c === 'all' ? '' : c;
  filterServices();
};

const changeRol = (term) => {
  rol = term;
  displayServices(info);
  hideElementsForClient();
  const menu = $('#user-menu');
  menu.show();
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  if (!isMobile) {
    menu.hover((e) => {
      $('#user-menu-navigation').css({ display: 'flex' });
    });
  } else {
    $('#user-menu-icon').on('click', () => {
      // $('#user-menu-navigation').css({ 'display': 'flex' })
    });
  }

  menu.mouseleave(() => {
    $('#user-menu-navigation').hide();
  });

  rol === 'profesional' ? $('#nav-link-myServices').show() : $('#nav-link-myServices').hide();
};

const displayProfile = () => {
  const isMobile = window.matchMedia('only screen and (max-width: 760px)').matches;

  if (isMobile) {
    $('#user-menu-navigation').css({ display: 'flex' });
  } else {
    profile();
  }
};

const hideMenu = () => {
  $('#user-menu-navigation').hide();
};

const renderCategoryOptions = () => {
  const select = document.querySelector('#category');
  const categories = [];
  info.map(e => e.category).map(e => !categories.includes(e) && categories.push(e));
  // rol === 'profesional' && [''].map(e => categories.push(e))
  const options = categories.map(c => `<option value=${c}>${c}</option>`);
  select.innerHTML = ['<option value=\'all\'>All categories</option>', ...options].join('');
};


const displaySingleService = (id, services) => {
  const browser = document.querySelector('.browser');
  if(browser)  browser.style.display = 'none';
  // apiHandler.getOneRegister(id)
  //   .then((service) => {
  //     services.innerHTML = '';
  //     const container = document.querySelector('.container');
  //     container.innerHTML = `<div class="single-service"><div class="single-service-description"><h2>${service.name}</h2><h6>User: ${service.author}</h6><h6>Category: ${service.category}</h6><p>Price: ${service.price}</p><p>Description: ${service.description}</p></div><img class="single-map" src="./public/images/map.png" alt="map"/> <button class="apply" onclick="openModal(${service.id})">Apply</button></div>`;
  //   });
};


const renderServices = (data, container) => {
  const services = document.querySelector('.services');
  const browser = document.querySelector('.browser');
  browser.style.display = 'flex';
  services.innerHTML = '';
  data.length > 0 ? data.forEach((service) => {
    services.innerHTML += getService(service);
  }) : services.innerHTML = '<div class=\'no-results\'><h3>Not results found</h3></div>';


  container.appendChild(services);
  rol === 'client' && document.querySelectorAll('.see-more').forEach(item => item.addEventListener('click', (e) => {
    displaySingleService(e.currentTarget.id, services);
  }));
  // rol==='profesional'&& seccion ==='services' && $('#new-service-button').show()
  rol === 'profesional' && $('#search-input').attr('placeholder', 'Buscar entre mis servicios...');

  seccion = 'services';
  hideElementsForClient();
};

const hideElementsForClient = () => {
  if (rol === 'profesional') $('.service-buttons').hide();
  $('.service-status').hide();
};

const profile = () => {
  const main = document.querySelector('#main');
  main.innerHTML = getContainer();
  const container = document.querySelector('.container');
  container.classList.add('profile-container');
  container.innerHTML = '<div class="profile-menu"><h2>Mis datos</h2><p>Tus datos de contacto serán enviados al crear/solicitar un servicio.</p><form onsubmit="update()"><input type="radio" name="Hombre" id="hombre" /> <label id="hombre-label"> Hombre</label><input type="radio" name="Mujer" id="mujer" /> <label> Mujer</label><div class="username"><input type="text" name="username" id="username" value="James"/><input type="text" name="usersubname" id="usersubname" value="Milner"/></div><input type="text" name="email" id="email" value="jamesmilner@yahoo.es"/><div class="direccion"> <input type="text" name="address" value="Calle Mayor" id="direccion"/><input type="tel" name="tel" value="000-999-000" /></div><p>Fecha de nacimiento</p><input type="date" name="" id="date"/><button class="actualizar">Actualizar</button> <p>Modifica tu contraseña</p><div class="pass"><input type="text" name="current" id="current" placeholder="Introduce tu contraseña.."/><input type="text" name="new" id="new" placeholder="Nueva contraseña"/><input type="text" name="newr" id="newr" placeholder="Repite tu contraseña"/></div><button class="actualizar">Actualizar</button></form></div><div class="leave-account"><h3>Si realmente nos quieres dejar...</h3><div>Si eliminas tu cuenta:<ul><li>No podrás acceder a los servicios de Autónomos Network;</li><li>se cancelarán tus reservas</li><li>se eliminarán tus valoraciones</li></ul><button class="delete-account">Eliminar cuenta</button></div></div>';
};

const renderRequests = () => {
  $('#new-service-button').hide();
  displayServices(info);
  $('.service-status').show();
  const buttons = document.querySelectorAll('.service-buttons');
  for (let i = 0; i < buttons.length; i++) {
    if (rol === 'profesional') {
      buttons[i].style.display = 'flex';
      buttons[i].innerHTML = '<button class="accept" onclick="changeStatus(this)">Aceptar</button><button class="decline" onclick="renderCancelation(this)">Rechazar</button>';
    } else {
      // buttons[i].style.display = 'none'
      $('.service-buttons').hide();
    }
  }
  $('#search-input').attr('placeholder', 'Buscar entre mis solicitudes...');
  seccion = 'requests';
};

const changeStatus = (e, text) => {
  const span = $(e).closest('.service-description').find('.service-status').find('span');
  span.text('Aceptada');
  span.attr('class', 'accepted');
  $(e).closest('.service-buttons').hide();
};

const renderCancelation = (e) => {
  const service = $(e).closest('.service').attr('serviceId');
  const modal = document.getElementById('myModal');
  modal.style.display = 'block';
  $('#modal-container').html(getModalCancelation(service));
};

const cancelService = (id) => {
  $('#myModal').hide();
  $(`.service[serviceId="${id}"]`).find('.service-status').find('span').attr('class', 'rejected');
  $(`.service[serviceId="${id}"]`).find('.service-status').find('span').text('Rechazada');
  $(`.service[serviceId="${id}"]`).find('.service-buttons').hide();
};

const update = e => e.preventDefault();
