/**
 * @package src
 * @subpackage src\api
 * @author Mamy
 */

import http from "../utils/http-common";
/**
 * Cette classe permet de régrouper les methodes (get, create, update, delete) du professeur
 * @package src
 * @subpackage src\api
 */
class ProfesseurDataService {
  /**
   * @param {*} params paramètre sert à filtrer ou à paginer les listes des professeurs
   * @returns   tobject : liste des professeurs
   */
  getAll(params) {
    return http.get("/professeur", {
      params
    });
  }

  /**
   * @param {*} id  identifiant unique d'un professeur
   * @returns  tobject : return un professeur
   */
  get(id) {
    return http.get(`/professeur/${id}`);
  }
  /**
   * @param {*} data données necessaire pour créer un professeur
   * @returns smessage : message de confirmation
   */
  create(data) {
    return http.post("/professeur", data);
  }

    /**
   * @param {*} id  $ID :  identifiant unique d'un professeur
   * @param {*} data : données qui vont modifiées les données  existant
   * @returns  smessage : message de confirmation
   */
  update(id, data) {
    return http.put(`/professeur/${id}`, data);
  }

  /**
   *  @param {*} id  $ID  identifiant unique d'un professeur
   * @returns smessage : message de confirmation
   */
  delete(id) {
    return http.delete(`/professeur/${id}`);
  }

  /**
   *
   * @returns smessage : message de confirmation
   */
  deleteAll() {
    return http.delete(`/professeur`);
  }

  /**
   *
   * @param {*} title $NAME : variable  qui permet de trier les professeur par son nom
   * @returns tobject : liste des professeur filtrer par nom
   */
  findByTitle(title) {
    return http.get(`/professeur?title=${title}`);
  }
}
export default new ProfesseurDataService();
