// Nicolae Alexe y Diego Méndez

const apiHandler = new APIHandler("http://localhost:8080");
let services = [];
let category = "";
let section;
const searchedValue = "";
let selectedService = null;
let rol;
let currentUser = {};

// window.onerror = function(e) {
//   alert("Error caught");
// };
const sendRequest = () => {
  const modal = document.getElementById("modal-container");
  modal.innerHTML = getServiceConfirmation();
};
const openModal = serviceId => {
  updateModal(serviceId);
  showModal();
};

const showModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
};
const hideModal = () => {
  const modal = document.getElementById("myModal");
  modal.style.display = "none";
};

const nuevoServicioModal = () => {
  const modal = document.getElementById("modal-container");
  modal.innerHTML = getNuevoServicioFields();
  showModal();
};

const updateModal = id => {
  const service = services.find(e => e.id === id);
  const modal = document.getElementById("modal-container");
  modal.innerHTML = getModalService(service);
};

window.onresize = () => {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;

  if (isMobile) {
    $("#user-menu-navigation").prepend(
      '<li class="nav-link" onclick="profile()">Perfil</li>'
    );
    $("#user-menu-navigation").append(
      '<li class="nav-link exit" onclick="hideMenu()"><i class="fas fa-times"></i></li>'
    );
  }
};
window.onload = () => {
  const servicesNavigation = document.querySelector(".services-navigation");

  const isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;

  if (isMobile) {
    $("#user-menu-navigation").prepend(
      '<li class="nav-link" onclick="profile()">Perfil</li>'
    );
    $("#user-menu-navigation").append(
      '<li class="nav-link exit" onclick="hideMenu()"><i class="fas fa-times"></i></li>'
    );
  }
  // ********  Modal configuration  ******//
  const modal = document.getElementById("myModal");

  // Get the <span> element that closes the modal
  const span = document.getElementsByClassName("close")[0];

  // When the user clicks on <span> (x), close the modal
  span.onclick = () => {
    modal.style.display = "none";
  };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = event => {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  apiHandler.getCurrentUser().then(user => {
    // console.log(user);
    currentUser = user;
    changeRol(user.role.name);
    displayHome(rol);
    apiHandler.getFullList().then(data => {
      data = data.map((e, index) => ({ ...e, id: index }));
      let servicesWithProfessionals = data.map(e =>
        getServiceWithProfessional(e)
      );
      Promise.all(servicesWithProfessionals).then(ss => {
        if (rol === "PROFESSIONAL")
          ss = ss.filter(e => e.profesional.nombre === currentUser.nombre);
        services = ss;
      });
    });
  });
};

const displayHome = (role = "CUSTOMER") => {
  const main = document.getElementById("main");
  // if (rol) return displayServices(services);
  main.innerHTML = getHome(role ? role : rol);
};

const displayServices = (data = services) => {
  if (rol === "PROFESSIONAL")
      $("#nuevo-servicio").css("visibility", "visible");
  const main = document.getElementById("main");
  main.innerHTML = getServicesPage();
  renderCategoryOptions();
  const container = document.querySelector(".container");
  renderServices(data, container);

};

const getServiceWithProfessional = service => {
  return apiHandler
    .getProfessional(service._links.profesional.href)
    .then(profesional => ({ ...service, profesional }))
    .catch(e => {
      console.log(e);
      window.location = "/home";
    });
};

const filterServices = (text = searchedValue) => {
  const data = services
    .filter(e => e.categoria.toLowerCase().includes(category.toLowerCase()))
    .filter(e => e.nombre.toLowerCase().includes(text.toLowerCase()));
  const container = document.querySelector(".container");
  section === 'services' ? renderServices(data, container) : renderRequests(data,container);
};

const categoryChange = c => {
  category = c === "all" ? "" : c;
  filterServices();
};

const changeRol = term => {
  rol = term;
  hideElementsForClient();
  const menu = $("#user-menu-icon");
  const isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;

  if (!isMobile) {
    menu.hover(e => {
      $("#user-menu-navigation").css({ display: "flex" });
    });
    $("#user-menu").mouseleave(() => {
      $("#user-menu-navigation").hide();
    });
  } else {
    $("#user-menu-icon").on("click", e => {
      e.stopPropagation();
      $("#user-menu-navigation").css({ display: "flex" });
    });
    $(window).on("click", () => {
      $("#user-menu-navigation").css({ display: "none" });
    });
  }

  rol === "PROFESSIONAL"
    ? $("#nav-link-myServices").show()
    : $("#nav-link-myServices").hide();
};

const displayProfile = () => {
  const isMobile = window.matchMedia("only screen and (max-width: 760px)")
    .matches;

  if (isMobile) {
    $("#user-menu-navigation").css({ display: "flex" });
  } else {
    profile();
  }
};

const hideMenu = () => {
  $("#user-menu-navigation").hide();
};

const renderCategoryOptions = () => {
  const select = document.querySelector("#category");
  const categories = [];
  services
    .map(e => e.categoria)
    .map(e => !categories.includes(e) && categories.push(e));
  // rol === 'profesional' && [''].map(e => categories.push(e))
  const options = categories.map(c => `<option value=${c}>${c}</option>`);
  select.innerHTML = [
    "<option value='all'>All categories</option>",
    ...options
  ].join("");
};

const displaySingleService = id => {
  const browser = document.querySelector(".browser");
  if (browser) browser.style.display = "none";

  let service = services.find(e => e.id === id);
  services.innerHTML = "";
  const container = document.querySelector(".container");
  container.innerHTML = `<div class="single-service"><div class="single-service-description"><h2>${
    service.nombre
  }</h2><h6>User: ${service.profesional.nombre}</h6><h6>Category: ${
    service.categoria
  }</h6><p>Price: ${service.precio_total}</p><p>Description: ${
    service.descripcion
  }</p></div><img class="single-map" src="/images/map.png" alt="map"/> <button class="apply" onclick="openModal(${
    service.id
  })">Apply</button></div>`;
};

const renderServices = (data, container) => {
  section = 'services'
  const services = document.querySelector(".services");
  const browser = document.querySelector(".browser");
  browser.style.display = "flex";
  services.innerHTML = "";
  data.length > 0
    ? data.forEach(service => {
        services.innerHTML += getService(service);
      })
    : (services.innerHTML =
        "<div class='no-results'><h3>Not results found</h3></div>");

  container.appendChild(services);
  rol === "CUSTOMER" &&
    document.querySelectorAll(".see-more").forEach(item =>
      item.addEventListener("click", e => {
        displaySingleService(e.currentTarget.id, services);
      })
    );
  // rol==='profesional'&& seccion ==='services' && $('#new-service-button').show()
  rol === "PROFESSIONAL" &&
    $("#search-input").attr("placeholder", "Buscar entre mis servicios...");

  seccion = "services";
  hideElementsForClient();
};

const hideElementsForClient = () => {
  if (rol === "PROFESSIONAL") $(".service-buttons").hide();
  $(".service-status").hide();
};

const profile = () => {
  const main = document.querySelector("#main");
  main.innerHTML = getContainer();
  const container = document.querySelector(".container");
  container.classList.add("profile-container");
  container.innerHTML =
    '<div class="profile-menu"><h2>Mis datos</h2><p>Tus datos de contacto serán enviados al crear/solicitar un servicio.</p><form onsubmit="update()"><input type="radio" name="Hombre" id="hombre" /> <label id="hombre-label"> Hombre</label><input type="radio" name="Mujer" id="mujer" /> <label> Mujer</label><div class="username"><input type="text" name="username" id="username" value="James"/><input type="text" name="usersubname" id="usersubname" value="Milner"/></div><input type="text" name="email" id="email" value="jamesmilner@yahoo.es"/><div class="direccion"> <input type="text" name="address" value="Calle Mayor" id="direccion"/><input type="tel" name="tel" value="000-999-000" /></div><p>Fecha de nacimiento</p><input type="date" name="" id="date"/><button class="actualizar">Actualizar</button> <p>Modifica tu contraseña</p><div class="pass"><input type="text" name="current" id="current" placeholder="Introduce tu contraseña.."/><input type="text" name="new" id="new" placeholder="Nueva contraseña"/><input type="text" name="newr" id="newr" placeholder="Repite tu contraseña"/></div><button class="actualizar">Actualizar</button></form></div><div class="leave-account"><h3>Si realmente nos quieres dejar...</h3><div>Si eliminas tu cuenta:<ul><li>No podrás acceder a los servicios de Autónomos Network;</li><li>se cancelarán tus reservas</li><li>se eliminarán tus valoraciones</li></ul><button class="delete-account">Eliminar cuenta</button></div></div>';
};

const renderRequests = () => {
  section = 'solicitudes'
  $("#new-service-button").hide();
  displayServices(services);
  $(".service-status").show();
  const buttons = document.querySelectorAll(".service-buttons");
  for (let i = 0; i < buttons.length; i++) {
    if (rol === "PROFESSIONAL") {
      buttons[i].style.display = "flex";
      buttons[i].innerHTML =
        '<button class="accept" onclick="changeStatus(this)">Aceptar</button><button class="decline" onclick="renderCancelation(this)">Rechazar</button>';
    } else {
      // buttons[i].style.display = 'none'
      $(".service-buttons").hide();
    }
  }
  $("#search-input").attr("placeholder", "Buscar entre mis solicitudes...");
};

const changeStatus = (e, text) => {
  const span = $(e)
    .closest(".service-description")
    .find(".service-status")
    .find("span");
  span.text("Aceptada");
  span.attr("class", "accepted");
  $(e)
    .closest(".service-buttons")
    .hide();
};

const renderCancelation = e => {
  const service = $(e)
    .closest(".service")
    .attr("serviceId");
  const modal = document.getElementById("myModal");
  modal.style.display = "block";
  $("#modal-container").html(getModalCancelation(service));
};

const cancelService = id => {
  $("#myModal").hide();
  $(`.service[serviceId="${id}"]`)
    .find(".service-status")
    .find("span")
    .attr("class", "rejected");
  $(`.service[serviceId="${id}"]`)
    .find(".service-status")
    .find("span")
    .text("Rechazada");
  $(`.service[serviceId="${id}"]`)
    .find(".service-buttons")
    .hide();
};

const update = e => e.preventDefault();


const addServicio = () => {
  return apiHandler.getCurrentUser()
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
          hideModal()
        })
        .catch(err => console.error(err));
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
