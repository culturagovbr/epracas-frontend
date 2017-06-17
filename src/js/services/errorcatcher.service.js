import Raven from "raven-js"
import moment from "moment"

class ErrorCatcher {
  constructor($log, $mdDialog, User) {
    "ngInject"

    angular.extend(this, {
      $log,
      $mdDialog,
      User,
    })
  }

  callerName() {
    try {
      throw new Error();
    }
    catch (e) {
      try {
        return e.stack.split('at ')[3].split(' ')[0];
      } catch (e) {
        return '';
      }
    }

  }
    
  error(controller, err) {
    const logMsg = `Error: ${controller} - HTTP Status Code ${angular.toJson(err.status)} - ${angular.toJson(err.statusText)}, Msg: ${angular.toJson(err.data)}`

    const htmlMsg = `<span style="font-weight: bold">HTTP Status Code</span> ${angular.toJson(err.status)} - ${angular.toJson(err.statusText)}, <span style="font-weight: bold">Msg:</span> ${angular.toJson(err.data)} <span style="font-weight: bold">em</span> ${controller}`

    this.$log.error(logMsg)

    Raven.setUserContext({
      email: this.User.current.email,
      id: this.User.current.id_pub,
      sub: this.User.current.sub,
      is_staff: this.User.current.is_staff,
      name: this.User.current.full_name,
    })

    Raven.captureException(logMsg, {extra: err})

    this.$mdDialog.show({
      template: `
        <md-dialog layout="column" aria-label="Mensagem de Erro">
          <md-dialog-content>
            <md-content md-theme="docs-dark" layout-padding>

              <h2>Ocorreu um erro inesperado! :(</h2>
              <p>Infelizmente ocorreu um erro inesperado. Já notificamos a equipe de sistema, e estamos trabalhando para solucionar o mais rapido possivel. Além disso, você poderia enviar uma imagem desta mensagem de erro e seu conteudo para os gestores do Ministério da Cultura a fim de prover mais informações sobre o momento e situação do erro.</p>
            </md-content>
            <div layout-padding layout-margin flex>
              <md-content>
                <p><span style="font-weight: bold">Data e Hora:</span> ${moment().format("LLL")}</p> 
                <p><span style="font-weight: bold">Usuário:</span> ${this.User.current.full_name}</p>
                <p><span style="font-weight: bold">Mensagem de Erro:</span> ${htmlMsg}</p>
              </md-content>
            </div>
          </md-dialog-content>
          <md-dialog-actions>
            <md-button class="md-no-focus md-raised md-primary" ng-click="$ctrl.cancel()">
              Fechar
            </md-button>
          </md-dialog-actions>
        </md-dialog>
      `,
      fullscreen: true,
      multiple: true,
      controller: function DialogController($mdDialog) {
        "ngInject"
        this.cancel = () => $mdDialog.cancel()
      },
      controllerAs: "$ctrl",
    },
   )
  }
}

export default ErrorCatcher
