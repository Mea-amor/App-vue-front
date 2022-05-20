import http from "../utils/http-common";
class ProfesseurDataService {
  getAll() {
    return http.get("/professeur");
  }
  get(id) {
    return http.get(`/professeur/${id}`);
  }
  create(data) {
    return http.post("/professeur", data);
  }
  update(id, data) {
    return http.put(`/professeur/${id}`, data);
  }
  delete(id) {
    return http.delete(`/professeur/${id}`);
  }
  deleteAll() {
    return http.delete(`/professeur`);
  }
  findByTitle(title) {
    return http.get(`/professeur?title=${title}`);
  }
}
export default new ProfesseurDataService();
