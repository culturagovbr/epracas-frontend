function ShowAuthedManagers(User, Praca) {
  "ngInject"

  function permissionIsManagerOrAdmin(user, praca) {
    if (user.is_staff === true) {
      return true
    } else if ((angular.isDefined(praca.gestor) && praca.gestor !== null)) {
      return user.id_pub === praca.gestor.user_id_pub
    }
    return false
  }

  return {
    restrict: "A",
    link(scope, element, attrs) {
      scope.User = User
      scope.Praca = Praca

      scope.$watch("User.current", (user) => {
        // If user detected
        if (user && permissionIsManagerOrAdmin(user, Praca)) {
          if (attrs.showAsManager === "true") {
            element.css({ display: "inherit" })
          } else {
            element.css({ display: "none" })
          }
        } else {
          if (attrs.showAsManager === "true") {
            element.css({ display: "none" })
          } else {
            element.css({ display: "inherit" })
          }
        }
      })
    },
  }
}

export default ShowAuthedManagers
