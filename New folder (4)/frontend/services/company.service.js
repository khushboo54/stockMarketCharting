import http from "../http-common";

class CompanyService {

  findAll() {
    return http.get(`/companies`);
  }

  findById(id) {
    return http.get(`/companies/${id}`);
  }

  create(data) {
    return http.post(`/companies`, data);
  }

  update(data) {
    return http.put(`/companies`, data);
  }

  delete(id) {
    return http.delete(`/companies/${id}`);
  }

  findIpos(id) {
    return http.get(`/companyipos/${id}`);
  }

  findStockPrices(id) {
    return http.get(`/companystockprices/${id}`);
  }

  findByTitle(pattern){
    return http.get(`/companiesmatch/${pattern}`);}
}

export default new CompanyService();