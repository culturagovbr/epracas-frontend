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
    return this._$http({
      url: this._PracaEndPoint,
      method: 'POST',
      data: data
    })
    .then(res => res.data)
  }

  // Exclui uma Praça
  delete(pk) {
    return this._$http({
      url: `${this._PracaEndPoint}${pk}/`,
      method: 'DELETE'
    })
    .then(res => res.data)
  }

  // Recupera o registro de uma Praça
  get(pk) {
    return this._$q((resolve, reject) => {
      if(!pk.replace(" ", "")) {
        reject("O id_pub está vazio!")
      } else {
        resolve()
      }
    })
    .then(() => this._$http({
      url: `${this._PracaEndPoint}${pk}/`,
      method: 'GET'
    }))
    .then(res => res.data)
  }

  // Recupera as imagens de uma praca
  getImages(pk) {
    return this._$q((resolve, reject) => {
      if(!pk.replace(" ", "")) {
        reject("O id_pub está vazio!")
      } else {
        resolve()
      }
    })
    .then(() => this._$http({
      url: `${this._PracaEndPoint}${pk}/imagens/`,
      method: 'GET'
    }))
    .then(res => res.data)
  }

  // Recupera as imagens de uma praca
  deleteImg(pkPraca, pkImg) {
    return this._$q((resolve, reject) => {
      if(!pkPraca.replace(" ", "")) {
        reject("O id_pub está vazio!")
      } else {
        resolve()
      }
    })
    .then(() => this._$http({
      url: `${this._PracaEndPoint}${pkPraca}/imagens/${pkImg}/`,
      method: 'DELETE'
    }))
    .then(res => res.data)
  }

  // Lista todas as Praças
  list() {
    return this._$http({
      url: this._PracaEndPoint,
      method: "GET"
    })
    .then(res => res.data)
  }

  // Procura por uma Praça utilizando o parametro query
  search(query) {
    return this._$http({
      url: this._PracaEndPoint,
      method: "GET",
      params: { search: query }
    })
    .then(res => res.data)
  }

  // Salva os dados de uma Praça
  save(praca, data) {
    return this._$http({
      url: `${this._PracaEndPoint}${praca}/`,
      method: 'PATCH',
      data: data
    })
    .then(res => res.data)
  }

  // Retorna as opções disponiveis para alguns campos
  options(praca) {
    if (praca) {
      return this._$http({
        url: `${this._PracaEndPoint}${praca.id_pub}/`,
        method: "OPTIONS",
      })
      .then(response => response.data)
      .then(data => data.actions.PUT)
    }
    return this._$http({
      url: this._PracaEndPoint,
      method: "OPTIONS",
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
  }
}
