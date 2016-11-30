angular.module('starter.controllers', [])

  .controller('DashCtrl', function ($scope, ContactoWS, $ionicModal) {
    $scope.listaContacto = [];
    ContactoWS.getAll().success(function (data) {
      $scope.listaContacto = data;
    }).error(function (error) {
      alert(JSON.stringify(error));
    });

    $ionicModal.fromTemplateUrl('templates/modal-add.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function (modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function () {
      $scope.modal.show();
    };
    $scope.closeModal = function () {
      $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
      $scope.modal.remove();
    });

    $scope.nuevoContacto = {
      "nombre": "Nombre",
      "telefono": "Telefono",
      "direccion": "Direccion",
      "correo": "correo@gmail.com"
    };

    $scope.crearContacto = function () {
      ContactoWS.add($scope.nuevoContacto).success(function () {
        $scope.listaContacto = [];
        ContactoWS.getAll().success(function (data) {
          $scope.listaContacto = data;
          $scope.modal.hide();
        }).error(function (error) {
          alert(JSON.stringify(error));
        });
      });
    };
    $scope.eliminarContacto = function (id) {
      ContactoWS.remove(id).success(function () {
        $scope.listaContacto = [];
        ContactoWS.getAll().success(function (data) {
          $scope.listaContacto = data;
          $scope.modal.hide();
        }).error(function (error) {
          alert(JSON.stringify(error));
        });
      });
    }
  })

  .controller('ChatsCtrl', function ($scope, Chats) {
    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    //
    //$scope.$on('$ionicView.enter', function(e) {
    //});

    $scope.chats = Chats.all();
    $scope.remove = function (chat) {
      Chats.remove(chat);
    };
  })

  .controller('ChatDetailCtrl', function ($scope, $stateParams, Chats) {
    $scope.chat = Chats.get($stateParams.chatId);
  })

  .controller('AccountCtrl', function ($scope) {
    $scope.settings = {
      enableFriends: true
    };
  });
