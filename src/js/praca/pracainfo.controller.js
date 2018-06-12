import moment from "moment"

class PracaInfoCtrl {
  constructor($mdDialog, $log, User, Praca, ErrorCatcher, Toast, praca) {
    "ngInject"

    angular.extend(this, {
      $mdDialog,
      $log,
      User,
      Praca,
      ErrorCatcher,
      Toast,
      praca,
    });

    this.praca.funciona_util = (typeof this.praca.funciona_util == 'undefined')? false : this.praca.funciona_util;
    this.praca.funciona_sabado = (typeof this.praca.funciona_sabado == 'undefined')? false : this.praca.funciona_sabado;
    this.praca.funciona_domingo = (typeof this.praca.funciona_domingo == 'undefined')? false : this.praca.funciona_domingo;
      $(document).ready(() => {
          this.applyEffect(this.praca);
      });

    this.isAdmin = this.User.IsAdmin();

    this.Praca.options(praca)
      .then((data) => {
        this.listaUf = data.uf.choices;
        this.listaRegiao = data.regiao.choices;
        this.listaModelo = data.modelo.choices;
        this.listaSituacao = data.situacao.choices;

        angular.forEach(data.uf.choices, (uf) => {
          
          if(uf.value.toUpperCase() == praca.uf){
            this.praca.uf = uf;
          }
        })

      });
    
    console.info("novo teste:")
    console.info(this.listaUf)

    this.isSaving = false

  }

  cancel() {
    this.$mdDialog.cancel()
  }

    applyEffect(praca) {
        let elmContainerUtil = $('#container-util'),
            elmContainerSabado = $('#container-sabado'),
            elmContainerDomingo = $('#container-domingo');
        setTimeout(function(){
            if (!praca.funciona_dia_util) {
                elmContainerUtil.fadeOut('slow');
            } else {
                elmContainerUtil.fadeIn('slow')
            }
            if (!praca.funciona_sabado) {
                elmContainerSabado.fadeOut('slow');
            } else {
                elmContainerSabado.fadeIn('slow')
            }
            if (!praca.funciona_domingo) {
                elmContainerDomingo.fadeOut('slow');
            } else {
                elmContainerDomingo.fadeIn('slow')
            }
        }, 200);
    }

  save(data) {
    this.isSaving = true
    if(data.data_inauguracao) {
      data.data_inauguracao = moment(data.data_inauguracao).format("YYYY-MM-DD");
    }

    if (angular.isUndefined(data.id_pub) || data.id_pub === null) {
      this.Praca.new(data)
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Praca cadastrada com Sucesso!")
          }
        )
        .catch(
          (err) => {
            this.isSaving = false
            this.$mdDialog.hide()
            this.ErrorCatcher.error("PracaInfoCtrl", err)
          }
        )
    } else {
      let praca_data = {}
      let fields = ["id_pub", "situacao", "modelo", "nome", "data_inauguracao",
          "bio", "telefone1", "telefone2", "fax", "email1", "email2", "pagina",
          "logradouro", "cep", "bairro", "regiao", "uf", "municipio", "funciona_dia_util",
          "hora_abertura_dia_util", "hora_fechamento_dia_util", "funciona_sabado",
          "hora_abertura_sabado", "hora_fechamento_sabado", "funciona_domingo",
          "hora_abertura_domingo", "hora_fechamento_domingo"]

      if (this.isAdmin) {
        fields.push("repasse", "modelo", "contrato", "lat", "long")
      }

      praca_data = fields.reduce((acc, field) => {
        acc[field] = angular.copy(data[field])
        return acc
      }, {})

      this.Praca.save(praca_data.id_pub, praca_data)
        .then(
          () => {
            this.$mdDialog.hide()
            this.Toast.showSuccessToast("Informações alteradas com sucesso!")
          }
        )
        .catch(
          (err) => {
            this.isSaving = false
            this.Toast.showRejectedToast("Problema ao salvar a Praça")
            this.$mdDialog.hide()
          }
        )
    }
  }
}
export default PracaInfoCtrl
