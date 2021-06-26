import http from "../http-common";

class SectorService {

  findAll() {
    return http.get(`/sectors`);
  }

  findById(id) {
    return http.get(`/sectors/${id}`);
  }

  create(data) {
    return http.post(`/sectors`, data);
  }

  update(data) {
    return http.put(`/sectors`, data);
  }

  delete(id) {
    return http.delete(`/sectors/${id}`);
  }

  findCompanies(id) {
    return http.get(`/sectorscomp/${id}`);
  }
}

export default new SectorService();