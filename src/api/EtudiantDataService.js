/**
 * @package src
 * @subpackage src\api
 * @author Mamy
 */
import http from "../utils/http-common";
/**
 * Cette classe permet de régrouper les methodes (get, create, update, delete) de l'etudiant
 * @package src
 * @subpackage src\api
 */
class EtudiantDataService {
  /**
   * @param {*} params paramètre sert à filtrer ou à paginer les listes des étudiants
   * @returns   tobject : liste des étudiants
   */
  getAll(params) {
    return http.get("/etudiant", {
      params
    });
  }

  /**
   * @param {*} id  identifiant unique d'un étudiant
   * @returns  tobject : return un etudiant
   */
  get(id) {
    return http.get(`/etudiant/${id}`);
  }

  /**
   * @param {*} data données necessaire pour créer un étudiant
   * @returns smessage : message de confirmation
   */
  create(data) {
    return http.post("/etudiant", data);
  }

  /**
   * @param {*} id  $ID :  identifiant unique d'un étudiant
   * @param {*} data : données qui vont modifiées les données  existant
   * @returns  smessage : message de confirmation
   */
  update(id, data) {
    return http.put(`/etudiant/${id}`, data);
  }

  /**
   *  @param {*} id  $ID  identifiant unique d'un étudiant
   * @returns smessage : message de confirmation
   */
  delete(id) {
    return http.delete(`/etudiant/${id}`);
  }

  /**
   *
   * @returns smessage : message de confirmation
   */
  deleteAll() {
    return http.delete(`/etudiant`);
  }

  /**
   *
   * @param {*} title $NAME : variable  qui permet de trier les etudiants par son nom
   * @returns tobject : liste des étudiants filtrer par nom
   */
  findByTitle(title) {
    return http.get(`/etudiant?title=${title}`);
  }
}
export default new EtudiantDataService();
