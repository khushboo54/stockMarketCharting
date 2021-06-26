import http from "../http-common";

class IpoService {

  findAll() {
    return http.get(`/ipos`);
  }

  findById(id) {
    return http.get(`/ipos/${id}`);
  }

  create(data) {
    return http.post(`/ipos`, data);
  }

  update(data) {
    return http.put(`/ipos`, data);
  }

  delete(id) {
    return http.delete(`/ipos/${id}`);
  }
}

export default new IpoService();