class Atividade {
  constructor($http, $q, ErrorCatcher, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $q,
      ErrorCatcher,
      AtividadeEndPoint: AppConstants.agendaApi,
      AreaEndPoint: AppConstants.areaEndPoint,
    })
  }

  // Cria um novo evento.
  new(data) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AtividadeEndPoint,
      method: "POST",
      data: data,
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  listAreas() {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AreaEndPoint,
      method: "GET",
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
  

  options(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AtividadeEndPoint}${id_pub}/`,
      method: "OPTIONS"
    })
    .then(response => response.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  // Recupera o registro de um evento
  get(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AtividadeEndPoint}${id_pub}/`,
      method: "GET"
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  // Atualiza um evento
  update(id_pub, data) {
    const caller = this.ErrorCatcher.callerName()
    return this.$http({
      url: `${this.AtividadeEndPoint}${id_pub}/`,
      method: "PATCH",
      data: data
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  // Exclui um evento
  delete(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AtividadeEndPoint}${id_pub}`,
      method: "DELETE"
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }

  // Lista todos os eventos
  list(praca, month, year) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AtividadeEndPoint,
      method: "GET",
      params: {
        praca: praca,
        mes: month,
        ano: year,
      }
    })
    .then(res => res.data)
    .catch(
      (err) => {
        this.ErrorCatcher.error(caller, err)
        return this.$q.reject()
      }
    )
  }
}

export default Atividade
