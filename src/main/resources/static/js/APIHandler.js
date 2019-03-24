// Nicolae Alexe y Diego Méndez

class APIHandler {
  constructor(baseUrl) {
    this.BASE_URL = baseUrl;
  }

  getFullList() {
    return axios
      .get(`${this.BASE_URL}/servicios`)
      .then(services => services.data);
  }

  getOneRegister(id) {
    return axios.get(`${this.BASE_URL}/servicios/${id}`).then(service => service.data);
  }

  createOneRegister(service) {
    return axios.post(`${this.BASE_URL}/servicios`, service);
  }


  deleteOneRegister(id) {
    return axios.delete(`${this.BASE_URL}/servicios/${id}`);
  }
}