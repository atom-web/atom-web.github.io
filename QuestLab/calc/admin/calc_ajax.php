<?php
add_action( 'wp_ajax_add_calc_option', 'add_calc_option' );
function add_calc_option(){
	$calc = new Calc();
	parse_str($_POST['serialize'], $serialize);

	if(isset($serialize['id']) && $serialize['id'] != ''){
		$result = $calc->updCalcOption($serialize,$serialize['id']);
	}else{
		$result = $calc->addCalcOption($serialize);
	}
var_dump($serialize);
}

add_action( 'wp_ajax_add_calc_param', 'add_calc_param' );
function add_calc_param(){
	$calc = new Calc();
	parse_str($_POST['serialize'], $serialize);

	if(isset($serialize['id']) && $serialize['id'] != ''){
		$result = $calc->updCalcParam($serialize,$serialize['id']);
	}else{
		$result = $calc->addCalcParam($serialize);
	}
echo $serialize['option_id'];
}

add_action( 'wp_ajax_calc_inc', 'calc_inc' );
function calc_inc(){
	$calc = new Calc();
	$id = $_POST['id'];
	$calc_check = $_POST['calc_check'];

	$result = $calc->updPostCalcCheck($id,$calc_check); 
var_dump($result);
	die;
}

add_action( 'wp_ajax_calc_op_del', 'calc_op_del' );
function calc_op_del(){
	$calc = new Calc();
	$id = $_POST['id'];
	
	$result = $calc->delCalcOption($id);
var_dump($result);
}

add_action( 'wp_ajax_calc_red_param_del', 'calc_red_param_del' );
function calc_red_param_del(){
	$calc = new Calc();
	$id = $_POST['id'];
	
	$result = $calc->delCalcParam($id);
var_dump($result);
}

add_action( 'wp_ajax_calc_param_del', 'calc_param_del' );
function calc_param_del(){
	$calc = new Calc();
	$id = $_POST['id'];
	
	$result = $calc->delCalcParam($id);
var_dump($result);
}

add_action( 'wp_ajax_calc_sort', 'calc_sort' );
function calc_sort(){
	$calc = new Calc();
	$id = $_POST['id'];
	if (!empty($_POST['sort'])) {
		foreach ($_POST['sort'] as $i => $row) {
			$result = $calc->updCalcSort($i,$row);
		}
	}
	
var_dump($result);
}

add_action( 'wp_ajax_calc_copy', 'calc_copy' );
function calc_copy(){
	$calc = new Calc();
	$id = $_POST['id'];
	$post_id = $_POST['post_id'];
	
	$result = $calc->addCalcCopy($id,$post_id);
	
	
var_dump($result);
}

add_action( 'wp_ajax_calc_param_sort', 'calc_param_sort' );
function calc_param_sort(){
	$calc = new Calc();
	$id = $_POST['id'];
	if (!empty($_POST['sort'])) {
		foreach ($_POST['sort'] as $i => $row) {
			$result = $calc->updCalcParamSort($i,$row);
		}
	}
	
var_dump($result);
}

add_action( 'wp_ajax_get_mail', 'get_mail' );
function get_mail(){

		if(isset($_POST["phone"]) && $_POST["phone"] != '' && $_POST["phone"] != '+7') {
			$phone_title = "Номер телефона:" .htmlspecialchars($_POST["phone"]);
			$phone = htmlspecialchars($_POST["phone"]);
		}
		if(isset($_POST["email"]) && $_POST["email"] != '') {
			
			$email_title = "Email:" .htmlspecialchars($_POST["email"]);
			$email = htmlspecialchars($_POST["email"]);
		}
		$str = htmlspecialchars($_POST["str"]);
		$tema = 'Запрос на квест '.htmlspecialchars($_POST["str"]);
		if(isset($_POST["price"]) && $_POST["price"] != '') $price = 'На человека с билетом: '.htmlspecialchars($_POST["price"]);
		if(isset($_POST["ticket"]) && $_POST["ticket"] != '') $ticket = "Участники:" .htmlspecialchars($_POST["ticket"]);
		if(isset($_POST["age"]) && $_POST["age"] != '') $age = "Возраст:" .htmlspecialchars($_POST["age"]);
		if(isset($_POST["col"]) && $_POST["col"] != '') $col = "Количество человек: ".htmlspecialchars($_POST["col"]);
		if(isset($_POST["price_ticket"]) && $_POST["price_ticket"] != '') $price_ticket = "Билеты: ".htmlspecialchars($_POST["price_ticket"]);
		if(isset($_POST["price_quest"]) && $_POST["price_quest"] != '') $price_quest = "Сумма: ".htmlspecialchars($_POST["price_quest"]);
		/* e-mail адресата */
		$myemail = "quest@quest-lab.ru";

		$message_to_myemail = "Запрос на квест $str
		Данные клиента: 
		$ticket 
		$age 
		$phone_title 
		$email_title  
		$col
		$price_ticket
		$price_quest
		$price";
		/* Отправляем сообщение */
		$from  = "From: $phone <$email> \r\n Reply-To: $email \r\n"; 
		$result = mail($myemail, $tema, $message_to_myemail, $from);
		echo $result;
//echo $myemail.' - '.$tema.' - '.$message_to_myemail.' - '.$from;

}

add_action( 'wp_ajax_calc_param_get', 'calc_param_get' );
function calc_param_get(){
	$calc = new Calc();
	$option_id = $_POST['option_id'];
	
	$calc_get_param = $calc->getCalcParam($option_id);
?>
<tr>
	<th>От</th>
	<th>До</th>
	<th>Цена</th>
	<th>Сортировка</th>
	<th>Редактировать</th>
	<th></th>
</tr>
<?php
foreach ($calc_get_param as $op): 
$optionsString = json_encode($op);									
?>
	
	<tr class="tr-opt" data-id-option="<?php echo $op['option_id']; ?>" data-options='<?php echo $optionsString;?>' >
		<input type="hidden" name="sort[]" value="<?php echo $op['id']; ?>">
		<td class="ident"><?php echo $op['ident']; ?></td>
		<td class="number"><?php echo $op['number']; ?></td>
		<td class="price"><?php echo $op['price']; ?></td>
		<td class="sort"><?php echo $op['sort']; ?></td>

		<td><a class="up-param-red" href="#" title="Редактировать" data-param-id="<?php echo $op['id']; ?>" data-toggle="modal" data-target="#myModal_param_red" ><i class="fa fa-pencil-square-o"></i></a></td>
		
		<td><a href="#" title="Удалить" onclick="calc_red_param_del('<?php echo $op['id']; ?>')"><i class="fa fa-times"></i></a></td>
	</tr>
<?php endforeach; 
}
