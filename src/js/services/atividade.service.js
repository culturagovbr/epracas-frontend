class Atividade {
  constructor(AppConstants, $http, $q) {
    "ngInject";

    this._AtividadeEndPoint = AppConstants.agendaApi;
    this._$http = $http;
    this._$q = $q;
  }

  // Cria um novo evento.
  new(data) {
    const deferred = this._$q.defer();

    this._$http({
      url: this._AtividadeEndPoint,
      method: "POST",
      data: data,
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Recupera o registro de um evento
  get(id_pub) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: "GET",
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Atualiza um evento
  update(id_pub, data) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: "PATCH",
      data: data,
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }

  // Exclui um evento
  delete(id_pub) {
    const deferred = this._$q.defer();

    this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: "DELETE",
    })
      .then(
        res => deferred.resolve(res.data),
        err => deferred.reject(err)
      );
    return deferred.promise;
  }
}

export default Atividade;
