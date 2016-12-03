export default class Praca {
  constructor(AppConstants, $http, $q) {
    "ngInject";

    this._AppConstants = AppConstants;
    this._PracaEndPoint = `${AppConstants.api}/pracas/`;

    this._$http = $http;
    this._$q = $q;
  }

  // Cria uma nova Praça e retorna a um JSON com os dados
  new(data) {
    const deferred = this._$q.defer();

    this._$http({
      url: this._PracaEndPoint,
      method: "POST",
      data: data,
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Exclui uma Praça
  delete(pk) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._PracaEndPoint}${pk}/`,
      method: "DELETE",
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Recupera o registro de uma Praça
  get(pk) {
    const deferred = this._$q.defer();

    // Verifica a existencia do id_pub
    if (!pk.replace(" ", "")) {
      deferred.reject("O id_pub está vazio!");
      return deferred.promise;
    }

    this._$http({
      url: `${this._PracaEndPoint}${pk}/`,
      method: "GET",
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Lista todas as Praças
  list() {
    const deferred = this._$q.defer();

    this._$http({
      url: this._PracaEndPoint,
      method: "GET",
    })
      .then(
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    );
    return deferred.promise;
  }

  // Procura por uma Praça utilizando o parametro query
  search(query) {
    const deferred = this._$q.defer();

    this._$http({
      url: this._PracaEndPoint,
      method: "GET",
      params: { search: query },
    })
      .then(
      //    (res) => res.data,
      //    (err) => err
      res => deferred.resolve(res.data),
      err => deferred.reject(err)
    );
    return deferred.promise;
    //  return res.data;
  }

  // Salva os dados de uma Praça
  save(praca, data) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._PracaEndPoint}${praca}/`,
      method: "PATCH",
      data: data,
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }
}
