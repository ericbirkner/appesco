var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

var server = "http://192.168.0.210/appesco_api/";

animateApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
    		templateUrl: 'page-home.html',
            controller: 'mainController'
       })
      .when('/registro', {
    		templateUrl: 'page-registro.html',
            controller: 'registroController'
       })
      .when('/sucursales', {
    		templateUrl: 'page-sucursales.html',
            controller: 'aboutController'
       })
      .when('/contact', {
            controller: 'sucursalesController'
       })
	  .when('/home', {
    		templateUrl: 'page-home.html',
            controller: 'homeController'
       })
      .when('/contact', {
    		templateUrl: 'page-contact.html',
            controller: 'contactController'
       });
});

animateApp.controller('mainController', function($scope,$location,$http) {
    $scope.pageClass = 'page-home';
	
	if(localStorage.id_user>0){
		$location.path('/sucursales');
	}

	$scope.login = function(){
		
		var myobject = {'email':$scope.email, 'password':$scope.password};

				Object.toparams = function ObjecttoParams(obj) {
					var p = [];
					for (var key in obj) {
						p.push(key + '=' + encodeURIComponent(obj[key]));
					}
					return p.join('&');
				};

				$http({
					method: 'POST',
					url: server + 'index.php?api=login',
					data: Object.toparams(myobject),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					console.log(response.data);
					
					if(response.data.id>0){
						localStorage.id_user = response.data.id;
						localStorage.nombre = response.data.nombre;
						$location.path('/sucursales');
					}
					
					if(response.data.error){
						alert(response.data.error);	
					}
				 },function (error){
					console.log('tapao en errores zii');
					//console.log(response.data);
					alert(response.data.error);
				 });
		
	}
	
});

animateApp.controller('aboutController', function($scope) {
    $scope.pageClass = 'page-about';	
});

animateApp.controller('homeController', function($scope) {
    $scope.pageClass = 'page-about';	
});


animateApp.controller('sucursalesController', function($scope) {
    $scope.pageClass = 'page-about';
	$scope.open = function(url){
		window.open(url);		
	}
});

animateApp.controller('registroController', function($scope, $http, $location) {
    $scope.pageClass = 'page-home';
	$scope.registro = function() {
		
        if($scope.password.length<6){
			alert('la password debe tener al menos 6 caracteres');
		}else{
			
			if($scope.password !== $scope.cpassword ){
				alert('debes confirmar tu password');
			}else{
				
				
				var myobject = {'nombre':$scope.nombre, 'email':$scope.email, 'telefono':$scope.telefono, 'empresa':$scope.empresa, 'cargo':$scope.cargo, 'password':$scope.password};

				Object.toparams = function ObjecttoParams(obj) {
					var p = [];
					for (var key in obj) {
						p.push(key + '=' + encodeURIComponent(obj[key]));
					}
					return p.join('&');
				};

				$http({
					method: 'POST',
					url: server + 'index.php?api=registro',
					data: Object.toparams(myobject),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					console.log(response.data);
					if(response.data.id>0){
						/*
						localStorage.id_user = response.data.id;
						localStorage.nombre = response.data.nombre;
						*/
						alert('Te haz registrado con éxito, ahora puedes ingresar');
						$location.path('/');
					}
					
					if(response.data.error){
						alert(response.data.error);	
					}
				 },function (error){
					console.log('tapao en errores zii');
					//console.log(response.data);
					alert(response.data.error);
				 });
						
				
			}
			
		}
		
		
    }
});

animateApp.controller('contactController', function($scope) {
    $scope.pageClass = 'page-contact';
});
