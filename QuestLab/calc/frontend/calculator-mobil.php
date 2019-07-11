<?php
	if(get_post_meta($post->ID, 'calc_check', 1)==1){

	$calc = new Calc();
	
	$ages = $calc->getCalcOptionFront($post->ID, 1);

	$age_html = '';
	foreach($ages as $age){
		
		$params = $calc->getCalcParam($age['id']);
		$params = json_encode($params);
		$age_html .= ' <div class="radio">
							<label>
								<input class="age_class"
									   type="radio"
									   name="age"  id="age-'.$age['id'].'"
									   data-params=\''.$params.'\' data-price="'.$age['price'].'" data-value_on="'.$age['id'].'" data-value_off="0" onclick="calc_get_price()" />
								<span></span>
								<span class="label-text">
								'.$age['name'].'
								</span>
							</label>
						</div>';
	}
	
	$numbers = $calc->getCalcOptionFront($post->ID, 3);

	$number_html = '';
	foreach($numbers as $number){
			
		$params = $calc->getCalcParam($number['id']);
		$params = implode(",", $params);
		
		$number_html .= '<div class="radio">
							<label>
								<input class="number_class"
									   type="radio"
									   name="ticket"
									   data-params=\''.$params.'\' data-price="'.$number['price'].'" data-value_on="'.$number['id'].'" data-value_off="0" onclick="calc_get_price()" />
								<span></span>
								<span class="label-text">
									'.$number['name'].'
								</span>
							</label>
						</div>';
		
	}
	
	$cols = $calc->getCalcOptionFront($post->ID, 5);

?>
<div class="">
	<div class="calc sidebar__item js-scroll-section js-fixed-calc" data-scroll="#calc">
		<div class="calc__header calc-header">
			<div class="calc-header__price">
				<span class="js-price-user-ticket">от 700</span> руб/человека
			</div>
		</div>
		<div class="calc__body">
			<div class="h5">ПОСЧИТАТЬ СТОИМОСТЬ КВЕСТА</div>
			<label class="label label-title">Возраст:</label>
			<div class="form-group js-radio-wrap age-radios">
				<?php echo $age_html;?>
			</div>
			<label class="label label-title">Сколько людей планируется?</label>
			<div class="form-group">
				<div class="js-calc-slider" data-col="<?php echo $cols[0]['name'];?>"></div>
			</div>
			<div class="form-group">
				<input type="text" id="Editbox" class="js-edit-box" name="Сумма" value="0">
			</div>
			<label class="label label-title">Дополнительно оплачиваются входные билеты в
				музей:</label>
			<div class="form-group js-radio-wrap">
				<?php echo $number_html;?>
			</div>
			<div class="form-group">
				<div class="calc__total">
					<hr>
					<p>СТОИМОСТЬ ЗА КВЕСТ - <span class="js-total-price">0</span> руб.</p>
					<p>+ входные билеты в музей - <span class="js-price-ticket">0</span> руб.</p>
					<p>СТОИМОСТЬ ЗА УЧАСТНИКА (уже с билетами) - <span class="js-price-user-ticket">0</span> руб.</p>
					<hr>
				</div>
			</div>
			<label class="label label-title">Укажите ваш e-mail</label>
			<div class="form-wrap">
				<div class="form-group">
					<input type="email"
						   class="form-control js-calc-email"
						   placeholder="mail@mail.ru"
						   required="required"
						   value=""
						   name="email"
						   autocomplete="off"/>
					<div class="input-alert input-alert-nodel animated shake">Укажите корректный e-mail
					</div>
				</div>
				<label class="label label-title">или телефон</label>
				<div class="form-group">
					<input type="tel"
						   class="form-control js-calc-phone"
						   placeholder="+7"
						   required="required"
						   value="+7"
						   maxlength="12"
					/>
				</div>
				<div class="form-group">
					<button class="button button-black alt js-order-quest">ЗАКАЗАТЬ КВЕСТ</button>
					<div class="input-alert js-calc-alert"></div>
				</div>
			</div>

			<div class="accept-text">
				<p>Cоглашаюсь на <a href="#" class="btn-accept">обработку персональных данных</a></p>
			</div>

		</div>
	</div>

	 

</div>
<?php }?>