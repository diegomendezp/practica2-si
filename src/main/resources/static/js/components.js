// Nicolae Alexe y Diego Méndez

const getService = (
  s,
  showButtons = true,
  showPrice = true
) => `<div class="service" serviceId='${
  s.id
}'><img class="map" src="./images/map.png" alt="map" />
                              <div class="service-description">
                                  ${
                                    s.estado
                                      ? `<p class='service-status'><span class=${
                                          s.estado === "Pendiente"
                                            ? "pending"
                                            : s.estado === "Aceptada"
                                            ? "accepted"
                                            : s.estado === "Rechazada"
                                            ? "rejected"
                                            : "notResponded"
                                        }>${s.estado}</span></p>`
                                      : ""
                                  }
                                  <p class='service-category'>${s.categoria}</p>
                                  <h3 onclick='displaySingleService(${s.id})'>${
  s.nombre
}</h3>
                                  <p class='service-author'>Ofrecido por: <span>${
                                    s.profesional.nombre
                                  }</span></p>
                                  ${
                                    showPrice
                                      ? `<p class='service-price'><span>${
                                          s.precio_acumulado
                                            ? "Total: "
                                            : s.solicitudesTotales
                                            ? "Solicitudes: "
                                            : ""
                                        }</span>${
                                          s.precio_acumulado
                                            ? `${s.precio_acumulado} €`
                                            : s.solicitudesTotales
                                            ? s.solicitudesTotales
                                            : `${s.precio_total} €`
                                        } </p>`
                                      : ""
                                  }
                                  ${
                                    showButtons
                                      ? `<div class="service-buttons">
                                     
                                        <button class="apply" onclick="openModal(${
                                          s.id
                                        })">Apply</button></div>`
                                      : ""
                                  }
                              </div>
                            </div>`;

const getModalService = s => `<p class='modal-pretitle'>Solicitando servicio...</p>
                                <div id='modal-body'>
                                  <h3>${s.nombre}</h3><p>User: ${
  s.profesional.nombre
}</p><p>${s.descripcion}</p>
                                </div>
                                <div class='modal-selects'>
                                  <input placeholder='Choose date: ' type="date" />
                                  <input placeholder='Hour: ' type="time">
                                </div>
                                <div class='modal-buttons'><button onclick='sendRequest()'>Solicitar!</button></div>
                                `;

const getServiceConfirmation = () =>
  "<div class='request-info'><h2>Solicitud enviada!</h2><h3>Estado: Pendiente</h3><p>Comprueba tu email para mas detalles.</p> </div>";

const getHome = (
  role = "CUSTOMER"
) => `<img class='bg-img' src='./images/profesionales2.jpg'/>
                        <div class='bg-cover'></div>
                        <div class='container-middle'>
                        <div class='home'>
                            <h1 class='home-title fadeInLeftBig'>Autonomos Network</h1>
                            <div class='home-body'>
                                ${
                                  role === "ANALYST"
                                    ? "<p class='home-body-title'>Que quieres ver?</p>"
                                    : ""
                                }
                                ${
                                  role !== "ANALYST"
                                    ? `<div class='home-body-options'>
                                    <button onclick="displayServices()">Servicios</button>
                                    <button onclick="renderRequests()">Solicitudes</button>
                                </div>`
                                    : `<div class='home-body-options'>
                                <button onclick="displayServicios()">Servicios</button>
                                <button onclick="displayProfesionales()">Profesionales</button>
                            </div>`
                                }

                            </div>
                        </div>`;

const getServicesPage = (browser = true, filters = false) => `${
  browser
    ? `<div class='browser'>
                                    <input type="text" id='search-input' oninput="filterServices(this.value)" placeholder="Buscar servicios..." />
                                    <select name="category" id="category" class='select' onchange="categoryChange(this.value)">
                                    </select>

                                    <div class='modal-selects'>
                                        <input id='date-filter'  type="date" />
                                    </div>                                    
                                </div>`
    : ""
}
                                ${
                                  filters
                                    ? `<div id='filtersContainer'><select name="filters" id="filters" class='select' onchange="filterChange(this)">
                                    
                                </select></div>`
                                    : ""
                                }
                                <div class="container">
                                    <div class="services"></div>
                                </div>`;
const getContainer = () => '<div class="container"></div>';

const getModalCancelation = id => `<p class='modal-pretitle'>Cancelando servicio...</p>
    <p>Indique el motivo de la cancelacion:</p>
    <select name="reason" id="reason" class='select'>
    <option>Fecha previamente ocupada</option>
    <option>Ubicacion del cliente</option>
    <option>Imprevisto personal</option>
    </select>
    <button onclick="cancelService(${id})">Confirmar</button>

            `;

const getTabs = () => `<div class='tabs'>
            <ul class='tabs-list'>
              <li class='tabs-list-item' id='serviciosTab' onclick="displayServicios()">Servicios</li>
              <li class='tabs-list-item' id='profesionalesTab' onclick="displayProfesionales()">Profesionales</li>
            </ul>
          </div>`;

const getProfesional = p =>
  `<div class="prof">
    <img class="prof-img" src="/images/user.jpg" />
    <div class="prof-info">
      <p class='prof-name'>${p.profesional.nombre}</p>
      <p class='prof-solicitudes'>${
        p.solicitudes.length
      } solicitudes <i class="fas fa-arrow-right"></i></p>
    </div>
  </div>`;

const getNoAutorizado = () => {};



const getNuevoServicioFields = () => `<div id='nuevo-servicio-container'><label for="service-name">Nombre</label><input name="nombre" id="nombre" type="text"/>
<label for="description">Descripcion</label><input name="descripcion" id="descripcion" type="text"/>
<label for="category">Categoria</label><input name="categoria" id="categoria" type="text"/>
<label for="hours">Horas</label><input name="horas" id="horas" type="number"/>
<label for="price">Precio</label><input name="precio" id="precio" type="number"/> <button id="nuevo-servicio-btn" onclick="addServicio()">Crear nuevo servicio</button></div>`