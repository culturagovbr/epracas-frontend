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

  options(data) {
    return this._$http({
      url: this._AtividadeEndPoint,
      method: "OPTIONS"
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
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

  // Lista todos os eventos
  list(praca, month) {
    const deferred = this._$q.defer();

    if (praca && month){
      this._$http({
        url: this._AtividadeEndPoint,
        method: "GET",
        params: {praca: praca, mes: month}
      })
        .then(
            res => deferred.resolve(res.data),
            err => deferred.reject(err)
        );
    } else if (praca){
      this._$http({
        url: this._AtividadeEndPoint,
        method: "GET",
        params: {praca: praca}
      })
        .then(
            res => deferred.resolve(res.data),
            err => deferred.reject(err)
        );
    } else if (month){
      this._$http({
        url: this._AtividadeEndPoint,
        method: "GET",
        params: {mes: month}
      })
        .then(
            res => deferred.resolve(res.data),
            err => deferred.reject(err)
        );
    } else {
      this._$http({
        url: this._AtividadeEndPoint,
        method: "GET",
      })
        .then(
            res => deferred.resolve(res.data),
            err => deferred.reject(err)
        );
    }

    return deferred.promise;
  }

}

export default Atividade;
