<?php
header('Access-Control-Allow-Origin: "*"');
error_reporting(0);
/*
define('HOST','mysql.simple2.cl');
define('USER','simpledb2017');
define('PASS','mysimpleql');
define('BBDD','my_renault');
*/
define('HOST','localhost');
define('USER','root');
define('PASS','');
define('BBDD','appesco');

$conexion= "";
$insert_id=0;

function query ($sql){
    //echo "SQL->".$sql;
	global $conexion;
	global $insert_id;

	$mysqli = new mysqli(HOST, USER, PASS, BBDD);
	if ($mysqli->connect_errno) {
		die("error->".$mysqli->connect_error);
	}else{
		$mysqli->query("SET NAMES utf8");
	}

	$result = $mysqli->query($sql);
	$insert_id = $mysqli->insert_id;
	$mysqli->close();
	return $result;

}

function insert_id(){
	global $insert_id;
	return $insert_id;
}

/********************************************************************************************************************************/
function registro(){
	extract($_POST);
	$retorno = false;

	$sql = "insert into usuarios (nombre, email, telefono, empresa, cargo, password) values ('".$nombre."', '".$email."', '".$telefono."', '".$empresa."', '".$cargo."', MD5('".$password."'))";
  $retorno = query($sql);
	$id = insert_id();

	if($retorno){
		$data = array('id' => $id, 'nombre' => $nombre);

	}else{
		$data = array('error' => 'El email ingresado ya existe en el sistema');
	}

	echo json_encode($data);
}

/********************************************************************************************************************************/

function login(){
	extract($_POST);
	$retorno = false;
	$sql="SELECT id, nombre FROM usuarios where email ='".$email."' and password ='".md5($password)."'";
	//echo $sql;

	$res = query($sql);
	$row_tmp = $res->fetch_assoc();

	//
	//
	if(!empty($row_tmp)){
		$data = array('id' => $row_tmp['id'], 'nombre' => $row_tmp['nombre']);		
	}else{
		$data = array('error' => 'Login Incorrecto');
	}
	
	echo json_encode($data);
}
/********************************************************************************************************************************/

/*
function guarda($data){
	require ('PHPMailer-master/PHPMailerAutoload.php');
	extract($data);
	$retorno = false;

	//$wpdb->insert( 'testDrive', array('fechaTest'=> $_POST['fechaTest'], 'nombreTest'=> $_POST['nombreTest'], 'apellidoTest'=> $_POST['apellidoTest'], 'rutTest'=> $_POST['rutTest'],'comunaTest'=> $_POST['comunaTest'],'emailTest'=> $_POST['emailTest'],'telefonoTest'=> $_POST['telefonoTest'],'marcaTest'=> $_POST['marcaTest'],'modeloTest' => $_POST['modeloTest'],'modeloTest2' => $_POST['modeloTest2'], 'anoTest' => $_POST['anoTest'], 'campaign' => $_POST['campaign'] ));

  $sql = "insert into testDrive (fechaTest, nombreTest, apellidoTest, rutTest, comunaTest, emailTest, telefonoTest, marcaTest, modeloTest, modeloTest2, anoTest, campaign) values ('".$fechaTest."', '".$nombreTest."', '".$apellidoTest."', '".$rutTest."', '".$comunaTest."', '".$emailTest."', '".$telefonoTest."', '".$marcaTest."', '".$modeloTest."', '".$modeloTest2."', '".$anoTest."', '".$campaign."')";

	//echo '<!--'.$sql.'-->';

	$retorno = query($sql);

	$email['to'] = "milagroscorcuera@dercocenter.cl, gonzalocortes-monroy@derco.cl, testdriverenault@derco.cl, rodrigoedwards@derco.cl";

	//Emails específicos
	if ($_POST['modeloTest2'] == 'Duster' || $_POST['modeloTest2'] == 'Dokker' || $_POST['modeloTest2'] == 'Kangoo' || $_POST['modeloTest2'] == 'Master') {
		$email['to']=str_replace("claudiomorales@dercocenter.cl, ", "", str_replace("testdriverenault@derco.cl, ", "", $email['to']));
		$email['to'].=', rmalhue@anfrunsmotors.cl, astegmann@anfrunsmotors.cl';
	}

	if ($_POST['modeloTest2'] == 'Symbol') {
		$email['to']="michellesilva@dercocenter.cl,testdriverenault@derco.cl";
	}

	$email['subject'] = "Formulario Test Drive";
	$email['body'] = "<html>
											<head>
													<title>Renault - Testdrive</title>
											</head>
											<body>
													<h1>Formulario Test Drive</h1>
													<div>
															<p><strong>FECHA:</strong> 		".$_POST['fechaTest']."		</p></br>
															<h3>Vehículo para Test Drive</h3>
															<p><strong>MODELO:</strong> 	".$_POST['modeloTest2']."		</p></br>
															<h3>Datos del usuario</h3>
															<p><strong>NOMBRE:</strong> 	".$_POST['nombreTest']."		</p></br>
															<p><strong>APELLIDO:</strong>	".$_POST['apellidoTest']."	</p></br>
															<p><strong>RUT:</strong> 		".$_POST['rutTest']."		</p></br>
															<p><strong>COMUNA:</strong> 	".$_POST['comunaTest']."		</p></br>
															<p><strong>E-MAIL:</strong> 	".$_POST['emailTest']."		</p></br>
															<p><strong>TELEFONO:</strong> 	".$_POST['telefonoTest']."	</p></br>
															<h3>Vehículo del Usuario</h3>
															<p><strong>MARCA:</strong> 		".$_POST['marcaTest']."		</p></br>
															<p><strong>MODELO:</strong> 	".$_POST['modeloTest']."		</p></br>
															<p><strong>AÑO:</strong> 		".$_POST['anoTest']."		</p></br>
													</div>
											</body>
									</html>";


	$destinatarios = explode(',',$email['to']);

	$mail = new PHPMailer;
	//Set who the message is to be sent from
	$mail->setFrom('testdrive@renault.cl', 'Formulario Test Drive');
	//Set an alternative reply-to address
	$mail->addReplyTo($_POST['emailTest'], $_POST['nombreTest']." ".$_POST['apellidoTest']);

	//Set who the message is to be sent to

	foreach($destinatarios as $destinatario){
			$mail->addAddress($destinatario);
	}
	//Set the subject line
	$mail->Subject = $email['subject'];
	$mail->AddBCC('dev@simplechile.com');
	//Read an HTML message body from an external file, convert referenced images to embedded,
	//Replace the plain text body with one created manually
	//Attach an image file
	$mail->msgHTML($email['body']);

	//send the message, check for errors
	if (!$mail->send()) {
	    echo "Mailer Error: " . $mail->ErrorInfo;
	} else {
	    echo "Mail enviado";
	}

	return $retorno;
}
*/
//print_r($_REQUEST);
/*
$email['headers'] = array(
		"Content-type: text/html",
		"charset=\"" . get_option('blog_charset') . "\"",
		"BCC: dac@4sale.cl",
		"Reply-To: ".$_POST['nombreTest']." ".$_POST['apellidoTest']." <".$_POST['emailTest'].">"
);
*/

if($_REQUEST){

	if($_REQUEST['api']=='registro'){
		registro();
	}
	
	if($_REQUEST['api']=='login'){
		login();
	}

}



?>
