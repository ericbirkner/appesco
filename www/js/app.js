var animateApp = angular.module('animateApp', ['ngRoute', 'ngAnimate']);

//var server = "http://192.168.0.210/appesco_api/";
var server = "http://pesco.cl/appesco_api/";

animateApp.config(function($routeProvider) {
    $routeProvider
      .when('/', {
    		templateUrl: 'page-login.html',
            controller: 'mainController'
       })
      .when('/registro', {
    		templateUrl: 'page-registro.html',
            controller: 'registroController'
       })
	  .when('/editar-datos', {
    		templateUrl: 'page-user_info.html',
            controller: 'editar-datosController'
       })	
      .when('/sucursales', {
    		templateUrl: 'page-sucursales.html',
            controller: 'sucursalesController'
       })
      .when('/home', {
    		templateUrl: 'page-home.html',
            controller: 'homeController'
       })
	  .when('/ventas', {
    		templateUrl: 'page-ventas.html',
            controller: 'ventasController'
       })		
	  .when('/postventa', {
    		templateUrl: 'page-postventa.html',
            controller: 'postventaController'
       })	
      .when('/sos', {
    		templateUrl: 'page-sos.html',
            controller: 'sosController'
       });
});

animateApp.controller('mainController', function($scope,$location,$http) {
    $scope.pageClass = 'page-home';
	
	console.log(localStorage.id_user);
	
	if(localStorage.id_user>0){
		
		$location.path('/home');
		
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
						$location.path('/home');
					}
					
					if(response.data.error){
						showAlert(response.data.error);	
					}
				 },function (error){
					console.log('Errores');
					//console.log(response.data);
					showAlert(response.data.error);
				 });
		
	};
	
});

animateApp.controller('ventasController', function($scope,$location,$http) {
    $scope.pageClass = 'page-about';
	$scope.enviar = function(){
		
		var myobject = {'equipo':$scope.equipo, 'telefono':$scope.telefono, 'email':$scope.email, 'id_user':localStorage.id_user};

			Object.toparams = function ObjecttoParams(obj) {
				var p = [];
				for (var key in obj) {
					p.push(key + '=' + encodeURIComponent(obj[key]));
				}
				return p.join('&');
			};

			$http({
				method: 'POST',
				url: server + 'index.php?api=ventas',
				data: Object.toparams(myobject),
				headers: {'Content-Type': 'application/x-www-form-urlencoded'}
			}).then(function (response){
				console.log(response.data);

				if(response.data.ok){

					$scope.equipo= ""; 
					$scope.telefono= "";
					$scope.email= "";
					
					showAlert(response.data.ok);
					$location.path('/home');
				}

				if(response.data.error){
					showAlert(response.data.error);	
				}

			 },function (error){
				console.log('Errores');
				//console.log(response.data);
				showAlert(response.data.error);
			 });
	};
});


animateApp.controller('homeController', function($scope) {
    $scope.pageClass = 'page-contact';	
});

animateApp.controller('postventaController', function($scope, $http, $location) {
    $scope.pageClass = 'page-about';
	$scope.ocultar = function(val){
		
		if(val == 1){
			if($scope.fecha_desde!=""){
				$scope.fecha_desde_label = {
					"opacity" : "0"
				}
			}
		}	
		
		if(val == 2){
			if($scope.fecha_hasta!=""){
				$scope.fecha_hasta_label = {
					"opacity" : "0"
				}
			}
		}
	};
	
	$scope.enviar = function(){
		
		var myobject = {'equipo':$scope.equipo, 'modelo':$scope.modelo, 'fecha_desde':$scope.fecha_desde, 'fecha_hasta':$scope.fecha_hasta, 'comentarios':$scope.comentarios, 'id_user':localStorage.id_user};

				Object.toparams = function ObjecttoParams(obj) {
					var p = [];
					for (var key in obj) {
						p.push(key + '=' + encodeURIComponent(obj[key]));
					}
					return p.join('&');
				};

				$http({
					method: 'POST',
					url: server + 'index.php?api=postventa',
					data: Object.toparams(myobject),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					console.log(response.data);
										
					if(response.data.ok){
						
						$scope.equipo= ""; 
						$scope.modelo= "";
						$scope.fecha_desde= "";
						$scope.fecha_hasta= "";
						$scope.comentarios= "";
						
						showAlert(response.data.ok);
						$location.path('/home');
					}
					
					if(response.data.error){
						showAlert(response.data.error);	
					}
					
				 },function (error){
					console.log('Errores');
					//console.log(response.data);
					showAlert(response.data.error);
				 });
		
	};
});


animateApp.controller('sucursalesController', function($scope) {
    $scope.pageClass = 'page-about';
	$scope.open = function(url){
		window.open(url);
		//showAlert(url);
	}
});

animateApp.controller('registroController', function($scope, $http, $location) {
    $scope.pageClass = 'page-home';
	$scope.registro = function() {
		
        if($scope.password.length<6){
			showAlert('la password debe tener al menos 6 caracteres');
		}else{
			
			if($scope.password !== $scope.cpassword ){
				showAlert('debes confirmar tu password');
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
						showAlert('Te haz registrado con éxito, ahora puedes ingresar');
						$location.path('/');
					}
					
					if(response.data.error){
						showAlert(response.data.error);	
					}
				 },function (error){
					console.log('Errores');
					//console.log(response.data);
					showAlert(response.data.error);
				 });
						
				
			}
			
		}
		
		
    }
});

animateApp.controller('sosController', function($scope, $http, $location) {
    $scope.pageClass = 'page-about';
	$scope.enviar = function(){
		
		var myobject = {'problema':$scope.problema, 'telefono':$scope.telefono, 'id_user':localStorage.id_user};

				Object.toparams = function ObjecttoParams(obj) {
					var p = [];
					for (var key in obj) {
						p.push(key + '=' + encodeURIComponent(obj[key]));
					}
					return p.join('&');
				};

				$http({
					method: 'POST',
					url: server + 'index.php?api=sos',
					data: Object.toparams(myobject),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					console.log(response.data);
										
					if(response.data.ok){
						showAlert(response.data.ok);
						$scope.problema= ""; 
						$scope.telefono= "";
						$location.path('/home');
					}
					
					if(response.data.error){
						showAlert(response.data.error);	
					}
					
				 },function (error){
					console.log('Errores');
					//console.log(response.data);
					showAlert(response.data.error);
				 });
		
	};
	
});

animateApp.controller('editar-datosController', function($scope, $http, $location) {
	
	if(localStorage.id_user>0){
		$http.get(server + 'index.php?api=get_user&id='+localStorage.id_user)
		.then(function(response) {
			console.log(response.data);
			$scope.nombre = response.data.nombre; 
			$scope.email = response.data.email; 
			$scope.cargo = response.data.cargo;
			$scope.telefono = response.data.telefono;
			$scope.empresa = response.data.empresa;
		});
		
	}else{
		showAlert('El usuario no éxiste');
		$location.path('/');
	}	
	
    $scope.pageClass = 'page-about';
	$scope.guardar_datos = function() {
	 	
		var myobject = {'nombre':$scope.nombre, 'email':$scope.email, 'telefono':$scope.telefono, 'empresa':$scope.empresa, 'cargo':$scope.cargo,'id':localStorage.id_user};

				Object.toparams = function ObjecttoParams(obj) {
					var p = [];
					for (var key in obj) {
						p.push(key + '=' + encodeURIComponent(obj[key]));
					}
					return p.join('&');
				};

				$http({
					method: 'POST',
					url: server + 'index.php?api=update_user',
					data: Object.toparams(myobject),
					headers: {'Content-Type': 'application/x-www-form-urlencoded'}
				}).then(function (response){
					console.log(response.data);
					localStorage.nombre = $scope.nombre;
					
					if(response.data.ok){
						showAlert(response.data.ok);
						$location.path('/home');
					}
					
					if(response.data.error){
						showAlert(response.data.error);	
					}
				 },function (error){
					console.log('Errores');
					//console.log(response.data);
					showAlert(response.data.error);
				 });	
		
    }
});
