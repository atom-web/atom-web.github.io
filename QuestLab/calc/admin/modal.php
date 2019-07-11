<?php 
$id = $_GET['post'];
?>
<!-- Модальное окно -->  
<div class="modal" id="myModal_option" tabindex="-1" data-target=".bd-example-modal-sm" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title" id="myModalLabel">Редактировать опцию</h4>
      </div>
		<form  action="#" class="calc-option-pop" method="post">
		  <div class="modal-body">
				<div class="calc-form-content" style="text-align: center;">
					<div class="row">
						<div class="col-4">
							<span>Название</span>
						</div>
						<div class="col-5">
							<input type="text" id="name" name="name" placeholder="Название опции" >
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-3">
							<span>Блок</span>
						</div>
						<div class="col-5">
							<select style="width:30%" class="select" id="block_id" name="block_id" >
							<option value="">Выберите блок</option>
							   <?php
							   $calc_block = Calc::getCalcBlock();
								$result = '';
								foreach($calc_block as $parametr) {
									$result .= '<option value="'.$parametr['id'].'">'.$parametr['name'].'</option>';
								}

								echo $result;
								?>
							</select>
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-3">
							<span>Цена</span>
						</div>
						<div class="col-5">
						
							<input type="text" id="price" name="price" placeholder="Цена" >
						</div>
					</div>
				
				<input type="hidden" id="post_id" name="post_id" value="<?php echo $id;?>" >
				<input type="hidden" id="id" name="id" value="" >
				<input type="hidden" id="sort" name="sort" value="0" >
				</div>
			
		  </div>
		  <div class="modal-footer">
			<button type="submit" class="btn btn-primary">Сохранить</button>
		  </div>
	  </form>
    </div>
  </div>
</div>

<div class="modal" id="myModal_param" tabindex="-1" data-target=".bd-example-modal-sm" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title title_param" id="myModalLabel">Параметры</h4>
      </div>
		  <div class="modal-body">
			<div class="calc_red_param">

								<br/>
								
									<!-- Кнопка пуска модальное окно -->  
									<button type="button" id="title_param_red" class="btn btn-primary btn-lg add-param-red" data-toggle="modal" data-target="#myModal_param_red">
									  Добавить параметр
									</button>
									
								<table   id='tbl_param' class="table-bordered table-striped table"  >
									
									
								</table>
							</div>
			
		  </div>
		  <div class="modal-footer">
			<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
		  </div>
    </div>
  </div>
</div>

<div class="modal" id="myModal_param_red" tabindex="-1" data-target=".bd-example-modal-sm" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <h4 class="modal-title label_param_red" id="myModalLabel">Редактировать параметр</h4>
      </div>
		<form  action="#" class="calc-param-pop" method="post">
		  <div class="modal-body">
				<div class="calc-form-content" style="text-align: center;">
				
					<div class="row">
						<div class="col-3">
							<span>От</span>
						</div>
						<div class="col-5">
							<input type="number" id="ident" name="ident" placeholder="от" >
						</div>
					</div>
					<br>
					<div class="row">
						<div class="col-4">
							<span>До</span>
						</div>
						<div class="col-5">
							<input type="number" id="number" name="number" placeholder="до" >
						</div>
					</div>
					
					<br>
					<div class="row">
						<div class="col-3">
							<span>Цена</span>
						</div>
						<div class="col-5">
						
							<input type="text" id="price" name="price" placeholder="Цена" >
						</div>
					</div>
				
				<input type="hidden" id="post_id" name="post_id" value="<?php echo $id;?>" >
				<input type="hidden" id="option_id" name="option_id" value="" >
				<input type="hidden" id="id" name="id" value="" >
				<input type="hidden" id="sort" name="sort" value="0" >
				</div>
			
		  </div>
		  <div class="modal-footer">
			<button type="submit" class="btn btn-primary">Сохранить</button>
		  </div>
	  </form>
    </div>
  </div>
</div>