import http from "../http-common";

class StockExchangeService {

  findAll() {
    return http.get(`/stockExchanges`);
  }

  findById(id) {
    return http.get(`/stockExchanges/${id}`);
  }

  create(data) {
    return http.post(`/stockExchanges`, data);
  }

  update(data) {
    return http.put(`/stockExchanges`, data);
  }

  delete(id) {
    return http.delete(`/stockExchanges/${id}`);
  }

  findCompanies(id) {
    return http.get(`/stockExchangescomp/${id}`);
  }
}

export default new StockExchangeService();