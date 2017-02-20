class Atividade {
  constructor(AppConstants, $http, $q) {
    "ngInject";

    this._AtividadeEndPoint = AppConstants.agendaApi;
    this._$http = $http;
    this._$q = $q;
  }

  // Cria um novo evento.
  new(data) {
    return this._$http({
      url: this._AtividadeEndPoint,
      method: "POST",
      data: data
    })
    .then(res => res.data)
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
    return this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: 'GET'
    })
    .then(res => res.data)
  }

  // Atualiza um evento
  update(id_pub, data) {
    return this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: 'PATCH',
      data: data
    })
    .then(res => res.data)
  }

  // Exclui um evento
  delete(id_pub) {
    return this._$http({
      url: `${this._AtividadeEndPoint}${id_pub}`,
      method: 'DELETE'
    })
    .then(res => res.data)
  }

  // Lista todos os eventos
  list(praca, month) {
    return this._$http({
      url: this._AtividadeEndPoint,
      method: 'GET',
      params: {
        praca: praca ? praca : undefined,
        mes: month ? month : undefined
      }
    })
    .then(res => res.data)
  }
}

export default Atividade;
