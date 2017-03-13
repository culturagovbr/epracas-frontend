import moment from 'moment'

class PracaDetailCtrl {
    constructor($scope, $document, $window, $mdDialog, $log, User, Atividade, praca) {
        "ngInject";

        angular.extend(this, {
            _$scope: $scope,
            _$document: $document,
            _$mdDialog: $mdDialog,
            _$log: $log,
            currentUser: User.current,
            praca: praca
        });


        Atividade.list(praca)
            .then(atividades => atividades.map(atividade => {
                if (!atividade.ocorrencia) return atividade;

                const formatString = "DD.MM.YYYY";
                atividade.data_inicio = moment(atividade.ocorrencia.start.slice(0, 10))
                    .format(formatString);
                atividade.data_encerramento = moment(atividade.ocorrencia.repeat_until)
                    .format(formatString);
                return atividade
            }))
            .then(atividades => {
                console.log(atividades);
                // $scope.praca.agenda = atividades
                this.praca.agenda = atividades
            })

        if ((praca.header_url.lastIndexOf(".jpg") == -1) && (praca.header_url.lastIndexOf(".png") == -1)) {
            praca.header_url = "/assets/header.jpg";
        }

        if (!praca.bio) {
            praca.bio = "Texto de apresentação da Praça(a ser preenchido pelo Gestor)";
        }

        const geoLoc = {
            defaults: {
                tileLayerOptions: {
                    detectRetina: true,
                    reuseTiles: true,
                },
                scrollWheelMouse: false,
                doubleClickZoom: false,
                zoomControl: false,
                dragging: false,
            },

            center: {
                lat: Number(praca.lat),
                lng: Number(praca.long),
                zoom: 13,
            },

            markers: {
                marker: {
                    lat: Number(praca.lat),
                    lng: Number(praca.long),
                    message: praca.localizacao,
                    focus: true,
                    draggable: false,
                },
            },
        };
        $scope.geoLoc = geoLoc;

        $scope.$watch(
            () => User.current,
            (newUser) => {
                if (newUser) {
                    this.currentUser = newUser;
                    this.userMenu = this.buildMenu(this.currentUser);
                }
            }
        );
        $scope.tabIntSelected = 2;

        // Pegando o evento scroll da tela para deixar as abas dinamicas conforme o scroll.
        // angular.element(document).ready(function(){
        $document.ready(function () {
            $('.materialboxed').materialbox()
            let elmTabPracas = $('.tab-pracas'),
                intPracasPosition = elmTabPracas.offset().top;
            $document.on('scroll', () => {
                let arrElmScrollContainers = $('md-tab'),
                    arrObjScrollContainers = arrElmScrollContainers.map((intKey, elm) => {
                        let intPositionStart = $($(elm).attr('scroll')).offset().top, // Pega a posicao do container.
                            intPositionEnd = (arrElmScrollContainers[intKey + 1]) ? $($(arrElmScrollContainers[intKey + 1]).attr('scroll')).offset().top : ''; // Pega a posicao do proximo container e diminui um, no caso e o limite deste container.
                        return {
                            strSelector: $(elm).attr('scroll'),
                            intPositionStart: intPositionStart - 96,
                            intPositionEnd: intPositionEnd - 1
                        }
                    });

                let intPosition = $window.scrollY;
                arrObjScrollContainers.each((intKey, objValue) => {
                    if (intPosition >= objValue.intPositionStart && intPosition <= objValue.intPositionEnd && intKey != $scope.tabIntSelected) {
                        $scope.tabIntSelected = intKey;
                        $scope.$apply();
                        // console.info('Ativou Comeco:' + objValue.intPositionStart + ' Final ' + objValue.intPositionEnd );
                    }
                });
                if ($window.scrollY >= intPracasPosition) {
                    elmTabPracas.addClass('fixed');
                } else {
                    elmTabPracas.removeClass('fixed');
                }
            });
        });

        // Dados fake para fotos.
        $scope.arrPhotos = this.buildGridModel({
            icon: "avatar:svg-",
            title: "Svg-",
            background: ""
        });
    }

    buildGridModel(tileTmpl) {
        let it, results = [];
        for (let j = 0; j < 16; j++) {
            it = angular.extend({}, tileTmpl);
            it.icon = it.icon + (j + 1);
            it.title = it.title + (j + 1);
            it.span = {row: 1, col: 1};

            switch (j + 1) {
                case 1:
                    it.title = 'Prédio';
                    it.background = "red";
                    it.span.row = it.span.col = 2;
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/1.jpg";
                    break;
                case 2:
                    it.title = 'Prédios';
                    it.background = "green";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/2.jpg";
                    break;
                case 3:
                    it.title = 'Praça de Skates';
                    it.background = "darkBlue";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/3.jpg";
                    break;
                case 4:
                    it.title = 'San Francisco';
                    it.background = "blue";
                    it.span.col = 2;
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/4.jpg";
                    break;
                case 5:
                    it.title = 'Farol';
                    it.background = "yellow";
                    it.span.row = it.span.col = 2;
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/5.jpg";
                    break;
                case 6:
                    it.title = 'aAs doauishdoaisdh aosidh ';
                    it.background = "pink";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/6.jpg";
                    break;
                case 7:
                    it.background = "darkBlue";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/7.jpg";
                    break;
                case 8:
                    it.title = 'Rua';
                    it.background = "purple";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/8.jpg";
                    break;
                case 9:
                    it.background = "deepBlue";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/9.jpg";
                    break;
                case 10:
                    it.background = "lightPurple";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/10.jpg";
                    break;
                case 11:
                    it.background = "yellow";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/11.jpg";
                    break;
                case 12:
                    it.background = "yellow";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/12.jpg";
                    // it.span.row = it.span.col = 2;
                    break;
                case 13:
                    it.background = "pink";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/13.jpg";
                    break;
                case 14:
                    it.background = "darkBlue";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/14.jpg";
                    break;
                case 15:
                    it.background = "purple";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/15.jpg";
                    it.span.col = 2;
                    // it.span.row = it.span.col = 2;
                    break;
                case 16:
                    it.background = "deepBlue";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/16.jpg";
                    break;
                case 17:
                    it.background = "lightPurple";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/17.jpg";
                    break;
                case 18:
                    it.background = "yellow";
                    it.url = "https://tympanus.net/Development/GammaGallery/images/large/18.jpg";
                    break;
            }
            results.push(it);
        }
        return results;
    }

    parseDate(dataObj) {
        if (!this.dateSet) {
            return undefined
        }

        return moment(dataObj).format("DD.MM.YYYY")
    }

    buildMenu(currentUser) {
        const userMenu = {};

        if (angular.isDefined(currentUser) &&
            (this.currentUser.is_staff || this.currentUser.praca_manager === this.praca.id_pub)) {
            userMenu.event = {
                id: "evento",
                name: "Adicionar Evento",
                icon: "insert_invitation",
                dialog: {
                    controller: "EventCtrl",
                    controllerAs: "$ctrl",
                    templateUrl: "praca/event-dialog.tmpl.html",
                    parent: angular.element(this._$document.body),
                    locals: {praca: this.praca},
                    fullscreen: true,
                },
            };

            userMenu.partner = {
                id: "parceiro",
                name: "Adicionar Parceiro",
                icon: "people",
                dialog: {
                    controller: "ParceirosCtrl",
                    controllerAs: "$ctrl",
                    templateUrl: "praca/parceiros-dialog.tmpl.html",
                    parent: angular.element(this._$document.body),
                    locals: {praca: this.praca},
                    fullscreen: true,
                },
            };

            userMenu.profile = {
                id: "perfil",
                name: "Editar informações sobre a Praça",
                icon: "info",
                dialog: {
                    controller: "PracaInfoCtrl",
                    controllerAs: "$ctrl",
                    templateUrl: "praca/pracainfo-dialog.tmpl.html",
                    parent: angular.element(this._$document.body),
                    locals: {praca: this.praca},
                    fullscreen: true,
                },
            };

            userMenu.headerImg = {
                id: "headerImg",
                name: "Editar o cabeçalho da pagina da Praça",
                icon: "aspect_ratio",
                dialog: {
                    controller: "ChangeHeaderImgCtrl",
                    controllerAs: "$ctrl",
                    templateUrl: "praca/header-dialog.tmpl.html",
                    parent: angular.element(this._$document.body),
                    locals: {praca: this.praca},
                },
            };
        }

        if ((!currentUser.is_staff) && angular.isUndefined(currentUser.praca_manager)) {
            userMenu.vinculo = {
                id: "evento",
                name: "Solicitar vinculo para gestão da Praça",
                icon: "assignment_ind",
                action: this.showVinculacao,
                dialog: {
                    controller: "VinculacaoCtrl",
                    controllerAs: "$ctrl",
                    templateUrl: "praca/vinculacao.tmpl.html",
                    parent: angular.element(this._$document.body),
                    locals: {praca: this.praca},
                    clickOutsiteToClose: false,
                    fullscreen: true,
                },
            };
        }
        return userMenu;

    }
    showDialog(dialog, $event) {
        this._$mdDialog.show(dialog, $event);
    }
}

export default PracaDetailCtrl;
