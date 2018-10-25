document.addEventListener("deviceready", onDeviceReady, false);

// PhoneGap is ready
//
function onDeviceReady() {
	// Empty
}

// alert dialog dismissed
function alertDismissed() {
	// do something
}

// Show a custom alert
//
function showAlert(msg) {
	//cambiar cuando se testea por navegador
	/*
	navigator.notification.alert(
		msg,  // message
		alertDismissed,         // callback
		'Pesco App',            // title
		'Cerrar'                  // buttonName
	);
	*/
	alert(msg);
	
	
}