import http from "../utils/http-common";
class MatiereDataService {
  getAll(params) {
    return http.get("/matiere", {
      params
    });
  }
  get(id) {
    return http.get(`/matiere/${id}`);
  }
  create(data) {
    return http.post("/matiere", data);
  }
  update(id, data) {
    return http.put(`/matiere/${id}`, data);
  }
  delete(id) {
    return http.delete(`/matiere/${id}`);
  }
  deleteAll() {
    return http.delete(`/matiere`);
  }
  findByTitle(title) {
    return http.get(`/matiere?title=${title}`);
  }
}
export default new MatiereDataService();
