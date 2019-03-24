const apiHandler = new APIHandler('http://localhost:8080');


const displayServices = () => {
  apiHandler.getFullList()
    .then((data) => {
      const container = document.querySelector('#results');
      console.log(data);
      data._embedded.servicios.forEach((service) => { container.innerHTML += `<li>${service.nombre}</li>`; });
    });
};
