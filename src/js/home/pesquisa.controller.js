import angular from "angular";
import { silenceUncaughtInPromise } from "angular-ui-router";
import PracaListCtrl from "../praca/praca-list.controller";
import Praca from "../services/praca.service";

class PesquisaCtrl {
    constructor($scope, $q, Praca, $state, $window, $location, $timeout, Toast) {
        "ngInject";

        angular.extend(this, {
            $scope,
            $state,
            $window,
            Toast,
            Praca,
        })

        $scope.$state = $state;
        self = this

        this._absUrl = $location.absUrl();
        this._$window = $window;
        this._$timeout = $timeout;

        this._home = function() {
            $location.path($location.absUrl()+'#!');
        }

        this._ListaMunicipios = [];

        this.loadingPracas = true;
        this._Pracas = [];
        this._listaUf = [];

        Praca.options()
            .then((data) => {
                this._listaUf = data.uf.choices
                this._listaUf.unshift({ value: "", display_name: "----" })

                /*  this.listaRegiao = data.regiao.choices
                  this.listaRegiao.unshift({ value: "", display_name: "----" })
                  this.listaModelo = data.modelo.choices
                  this.listaModelo.unshift({ value: "", display_name: "----" })
                  this.listaSituacao = data.situacao.choices
                  this.listaSituacao.unshift({ value: "", display_name: "----" }) */
            }, this);

        Praca.list()
            .then((arrValues) => {
                this._Pracas = arrValues;
                console.log(arrValues[0].municipio);
                return arrValues;
            })


        this._$state = $state;
        this._$scope = $scope;
        this._$q = $q;
        this.paginas = [1, 2, 3, 4, 5, 6, 7];
        this.currentPage = "";

        $scope.pesquisa = {};
        $scope.pagTitle = "Pesquisa com equipamentos inaugurados 2021";
        $scope.listaMunicipios = {};
        $scope.listaUFs = {};

        $scope.nome = "";

        $scope.orgaoRelacao = ['Coordenador da Pracinha de Cultura',
            'Membro do Grupo Gestor - Poder público',
            'Membro do Grupo Gestor - Comunidade do entorno',
            'Membro do Grupo Gestor - Sociedade civil organizada',
            'Membro da Unidade Gestora Local',
            'Servidor público municipal que não faz parte das instâncias acima'];

        $scope.freqAtivProg = ['1 dia por semana',
            '2 dias por semana',
            '3 dias por semana',
            '4 dias por semana',
            '5 dias por semana',
            '6 dias por semana',
            'Todos os dias da semana'];

        $scope.tipoAtividade = ['Artes Plásticas',
            'Artesanato',
            'Produção audiovisual',
            'Fotografia',
            'Pintura',
            'Grafite',
            'Música',
            'Skate',
            'Vôlei',
            'Futebol',
            'Basquete',
            'Dança',
            'Capoeira',
            'Reforço escolar',
            'Capacitação profissional',
            'Informática',
            'Jogos',
            'Atividades lúdicas',
            'Leitura e Literatura',
            'Outras'];

        $scope.desenvolvimentoAtividade = ['Cursos',
            'Oficinas',
            'Apresentações artísticas',
            'Atividades em grupo',
            'Atendimentos',
            'Passeios',
            'Seminários',
            'Exposições',
            'Exibição de filmes',
            'Feiras',
            'Festas',
            'Reuniões',
            'Palestras',
            'Saraus',
            'Outras'];

        $scope.cicloAtividade = ['Uma semana',
            'Um mês',
            'Um bimestre',
            'Um trimestre',
            'Um semestre',
            'Um ano',
            'Varia muito de acordo com a atividade'];

        $scope.espacos = ['Cineteatro',
            'Biblioteca',
            'Laboratório multimídia',
            'Quadra',
            'Sala multiuso',
            'CRAS',
            'Pista de skate',
            'Áreas externas'];

        $scope.participacao = ['Oferecimento de recursos humanos',
            'Oferecimento de recursos financeiros',
            'Oferecimento de atividades',
            'Uso do espaço pelas secretarias',
            'Outra'];

        $scope.dificuldades = ['Violência',
            'Disputa pelo uso dos espaços',
            'Falta de recursos humanos',
            'Falta de recursos financeiros',
            'Falta de envolvimento da comunidade',
            'Falta de envolvimento do grupo gestor',
            'Organização logística das atividades',
            'Planejamento das atividades',
            'Outras'];

        $scope.publicoparticipante = ['Crianças',
            'Jovens',
            'Adultos',
            'Idosos'];

        $scope.funcionariosExclusivos = ['Cineteatro',
            'Biblioteca',
            'Laboratório multimídia',
            'Quadra',
            'Sala multiuso',
            'CRAS',
            'Pista de skate',
            'Áreas externas'];

        $scope.periodos = ['Semanal',
            'Quinzenal',
            'Mensal',
            'Bimestral',
            'Trimestral',
            'Semestral'];

        $scope.recursos = ['Governamentais',
            'Oriundos de doações',
            'Recursos de instituições parceiras',
            'Outros'];


        $scope.hideShow_pg1 = false;
        $scope.hideShow_pg2 = false;
        $scope.hideShow_pg3 = false;
        $scope.hideShow_pg4 = false;
        $scope.hideShow_pg5 = false;
        $scope.hideShow_pg6 = false;
        $scope.hideShow_pg7 = false;
        $scope.hideShow_pg8 = false;
        $scope.hideShowApresentacao = true;

        this.sortDict = function sort_object(obj) {
            let items = Object.keys(obj).map(function (key) {
                return [key, obj[key]];
            });

            items.sort(function (first, second) {
                return second[1] - first[1];
            });
            console.log(items);
            let sorted_obj = {};
            let use_key = [];
            let use_value = [];
            /*   $.each(items, function(k, v) {
                  use_key = v[0]
                  use_value = v[1]
                  sorted_obj[use_key] = use_value
              }) 
              return(sorted_obj)*/
            return items;
        }

        $scope.scrollToTop = function($var) {
            // 'html, body' denotes the html element, to go to any other custom element, use '#elementID'
            $('html, body').animate({
                scrollTop: 0
            }, 'fast'); // 'fast' is for fast animation
        };

    }

    clickProximo() {
        if (this._$scope.form.$valid) {
            switch (this.currentPage) {
                case 1:
                    this.currentPage = 2;
                    this._$scope.hideShow_pg1 = false;
                    this._$scope.hideShow_pg2 = true;
                    break;
                case 2:
                    this.currentPage = 3;
                    this._$scope.hideShow_pg2 = false;
                    this._$scope.hideShow_pg3 = true;
                    break;
                case 3:
                    this.currentPage = 4;
                    this._$scope.hideShow_pg3 = false;
                    this._$scope.hideShow_pg4 = true;
                    break;
                case 4:
                    this.currentPage = 5;
                    this._$scope.hideShow_pg4 = false;
                    this._$scope.hideShow_pg5 = true;
                    break;
                case 5:
                    this.currentPage = 6;
                    this._$scope.hideShow_pg5 = false;
                    this._$scope.hideShow_pg6 = true;
                    break;
                case 6:
                    this.currentPage = 7;
                    this._$scope.hideShow_pg6 = false;
                    this._$scope.hideShow_pg7 = true;
                    break;
                case 7:
                    this.currentPage = 8;
                    this._$scope.hideShow_pg7 = false;
                    this._$scope.hideShow_pg8 = true;
                    break;
            }
        } else {
            this.Toast.showRejectedToast("Preencha os campos obrigatŕorio antes de proseguir.")
            
            this.$scope.scrollToTop();           
        }
        
    }

    clickAnterior() {

        switch (this.currentPage) {
            case 1:
                break;
            case 2:
                this.currentPage = 1;
                this._$scope.hideShow_pg1 = true;
                this._$scope.hideShow_pg2 = false;
                break;
            case 3:
                this.currentPage = 2;
                this._$scope.hideShow_pg2 = true;
                this._$scope.hideShow_pg3 = false;
                break;
            case 4:
                this.currentPage = 3;
                this._$scope.hideShow_pg3 = true;
                this._$scope.hideShow_pg4 = false;
                break;
            case 5:
                this.currentPage = 4;
                this._$scope.hideShow_pg4 = true;
                this._$scope.hideShow_pg5 = false;
                break;
            case 6:
                this.currentPage = 5;
                this._$scope.hideShow_pg5 = true;
                this._$scope.hideShow_pg6 = false;
                break;
            case 7:
                this.currentPage = 6;
                this._$scope.hideShow_pg6 = true;
                this._$scope.hideShow_pg7 = false;
                break;
            case 8:
                this.currentPage = 7;
                this._$scope.hideShow_pg7 = true;
                this._$scope.hideShow_pg8 = false;
                break;

        }
    }

    startPesquisa() {
        this._$scope.hideShow_pg1 = true;
        this._$scope.hideShowApresentacao = false;
        this.currentPage = 1;
        //this._$scope.pagTitle = this._$scope.pagTitle + " - 1 de 7";

        var dict = [];
        dict.push({
            key: "-----",
            value: "Selecione um município"
        })
        angular.forEach(this._Pracas, function (item) {
            
            dict.push({
                key: item.municipio,
                value: item.id_pub
            })
        }, this);

        


        this.$scope.listaMunicipios = dict ;//this.sortDict(dict);
        
        this._$scope.listaUFs = this._listaUf;
        this.loadingPracas = false;

        console.log(dict);
        console.log(this._listaUf);
    }

    /* startPesquisa(){
       this._$scope.hideShow = true;
       this._$scope.hideShowApresentacao = false;
       this.currentPage = "1";
       this._$scope.pagTitle = this._$scope.pagTitle  + " - 1" ;
       //console.log(this._$scope.listaMunicipios);
       var dict = {};
       dict["-----"] = 'Selecione um município';
       angular.forEach(this._Pracas, function(item){
               //var itemLista = "{ id: '" + item.id_pub + ", name: '" +item.municipio + "'}";
               dict[item.municipio] = item.id_pub ;
               //console.log(arrayVallue);
               
       }, this);
       dict = this.sortDict(dict);
       this.$scope.listaMunicipios= dict;
       this._$scope.listaUFs = this._listaUf;
       console.log(this._$scope.listaUFs);
       console.log(this._$scope.listaMunicipios);
       this.loadingPracas = false;
    }  */

    enviarRespostas() {
        console.log(this._$scope._q62);

        this.Praca.enviaPesquisa(this._$scope.pesquisa)
        .then(
          (response) => {
            //this.$mdDialog.hide()
            
            setTimeout(function () {
                this.$scope.$apply(function(){
                    this.Toast.showSuccessToast("Pesquisa enviada com sucesso!")
                    this.$scope.scrollToTop();
                    this._$timeout(this._home, 2000); 
                });
            }, 5000);
            $location.absUrl();
          }
        )
        .catch(
          (err) => {
            //this.isSaving = false
            this.Toast.showRejectedToast("Problema ao enviar Pesquisa")
            this.$scope.scrollToTop();
          }

        )

    }

}

export default PesquisaCtrl;
