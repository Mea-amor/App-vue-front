import http from "../utils/http-common";
class MatiereDataService {
  getAll() {
    return http.get("/matiere");
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
