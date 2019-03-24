// Nicolae Alexe y Diego Méndez

const getService = s => `<div class="service" serviceId='${s.id}'><img class="map" src="./public/images/map.png" alt="map" />
                              <div class="service-description">
                                  <p class='service-status'><span class=${s.status === 'Pendiente' ? 'pending' : s.status === 'Aceptada' ? 'accepted' : s.status === 'Rechazada' ? 'rejected' : 'notResponded'}>${s.status}</span></p>
                                  <p class='service-category'>${s.category}</p>
                                  <h3>${s.name}</h3>
                                  <p class='service-price'>${s.price} $</p>
                                  <div class="service-buttons"><button class="see-more" id="${s.id}">More</button><button class="apply" onclick="openModal(${s.id})">Apply</button></div>
                              </div>
                            </div>`;

const getModalService = s => `<p class='modal-pretitle'>Solicitando servicio...</p>
                                <div id='modal-body'>
                                  <h3>${s.name}</h3><p>User: ${s.author}</p><p>${s.description}</p>
                                </div>
                                <div class='modal-selects'>
                                  <input placeholder='Choose date: ' type="date" />
                                  <input placeholder='Hour: ' type="time">
                                </div>
                                <div class='modal-buttons'><button onclick='sendRequest()'>Solicitar!</button></div>
                                `;

const getServiceConfirmation = () => '<div class=\'request-info\'><h2>Solicitud enviada!</h2><h3>Estado: Pendiente</h3><p>Comprueba tu email para mas detalles.</p> </div>';

const getHome = () => `<img class='bg-img' src='./public/images/profesionales2.jpg'/>
                        <div class='bg-cover'></div>
                        <div class='container-middle'>
                        <div class='home'>
                            <h1 class='home-title fadeInLeftBig'>Autonomos Network</h1>
                            <div class='home-body'>
                                <p class='home-body-title'>Who are you?</p>
                                <div class='home-body-options'>
                                    <button onclick="changeRol('profesional')">Profesional</button>
                                    <button onclick="changeRol('client')">Client</button>
                                </div>

                            </div>
                        </div>`;

const getServicesPage = () => `<div class='browser'>
                                    <input type="text" id='search-input' oninput="filterServices(this.value)" placeholder="Buscar servicios..." />
                                    <select name="category" id="category" class='select' onchange="categoryChange(this.value)">
                                    </select>

                                    <div class='modal-selects'>
                                        <input id='date-filter'  type="date" />
                                    </div>                                    
                                </div>
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
