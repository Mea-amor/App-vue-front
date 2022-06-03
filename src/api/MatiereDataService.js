/**
 * @package src
 * @subpackage src\api
 * @author Mamy
 */
import http from "../utils/http-common";

/**
 * Cette classe permet de régrouper les methodes (get, create, update, delete) du matière
 * @package src
 * @subpackage src\api
 */
class MatiereDataService {
  /**
   * @param {*} params paramètre sert à filtrer ou à paginer les listes des matières
   * @returns   tobject : liste des matières
   */

  getAll(params) {
    return http.get("/matiere", {
      params
    });
  }

  /**
   * @param {*} id  identifiant unique d'une matiere
   * @returns  tobject : return une matiere
   */
  get(id) {
    return http.get(`/matiere/${id}`);
  }
  /**
   * @param {*} data données necessaire pour créer une matiere
   * @returns smessage : message de confirmation
   */
  create(data) {
    return http.post("/matiere", data);
  }

  /**
   * @param {*} id  $ID :  identifiant unique d'une matiere
   * @param {*} data : données qui vont modifiées les données  existant
   * @returns  smessage : message de confirmation
   */
  update(id, data) {
    return http.put(`/matiere/${id}`, data);
  }

  /**
   *  @param {*} id  $ID  identifiant unique d'une matiere
   * @returns smessage : message de confirmation
   */
  delete(id) {
    return http.delete(`/matiere/${id}`);
  }

  /**
   *
   * @returns smessage : message de confirmation
   */
  deleteAll() {
    return http.delete(`/matiere`);
  }

  /**
   *
   * @param {*} title $NAME : variable  qui permet de trier les matiere par son libellee
   * @returns tobject : liste des matieres filtrer par nom
   */
  findByTitle(title) {
    return http.get(`/matiere?title=${title}`);
  }
}
export default new MatiereDataService();
