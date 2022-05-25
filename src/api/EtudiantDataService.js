import http from "../utils/http-common";
class EtudiantDataService {
  getAll(params) {
    return http.get("/etudiant", {
      params
    });
  }
  get(id) {
    return http.get(`/etudiant/${id}`);
  }
  create(data) {
    return http.post("/etudiant", data);
  }
  update(id, data) {
    return http.put(`/etudiant/${id}`, data);
  }
  delete(id) {
    return http.delete(`/etudiant/${id}`);
  }
  deleteAll() {
    return http.delete(`/etudiant`);
  }
  findByTitle(title) {
    return http.get(`/etudiant?title=${title}`);
  }
}
export default new EtudiantDataService();
