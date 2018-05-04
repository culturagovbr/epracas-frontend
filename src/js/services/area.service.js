class Area {
  constructor($http, $q, ErrorCatcher, AppConstants) {
    "ngInject"

    angular.extend(this, {
      $http,
      $q,
      ErrorCatcher,
      AreaEndPoint: AppConstants.areaEndPoint,
    })
  }

  // Cria uma nova area.
  new(data) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AreaEndPoint,
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

  options(data) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: this.AreaEndPoint,
      method: "OPTIONS"
    })
    .then(response => response.data)
    .then(data => data.actions.POST)
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
      url: `${this.AreaEndPoint}${id_pub}/`,
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

  // Atualiza uma area
  update(id_pub, data) {
    const caller = this.ErrorCatcher.callerName()
    return this.$http({
      url: `${this.AreaEndPoint}${id_pub}/`,
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

  // Exclui uma area
  delete(id_pub) {
    const caller = this.ErrorCatcher.callerName()

    return this.$http({
      url: `${this.AreaEndPoint}${id_pub}`,
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

  // Lista todas as áreas
  list() {
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
}

export default Area
