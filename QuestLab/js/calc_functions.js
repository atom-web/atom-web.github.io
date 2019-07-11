var a = document.getElementById('dropdown');

$(document).ready(function(){

    $('#select1').change(function(){
        var select1 = document.getElementById('select1').value;

        $.ajax({
            type: 'GET',
            url: '/lib/ajax/select1.php',
            data: ({select1: select1}),
            success: function(data){
				data = JSON.parse(data);
				var selects = '';
				$.each(data, function(){
					sel = '<li class="facebook" onclick="select_date(\''+this.meta_value+'\', \''+$('#select1').val()+'\')">'+this.meta_value+'</li>';
					selects = selects + sel;
				});
				$('#dropdown').html(selects);
				a.style.display = 'block';
            }
        });
    });


	$( "#select2" ).keydown(function(e) {
		if (e.keyCode === 13) {
			post_id = $(".niz").attr("id");
			meta_value = $('#select2').val();
			meta_key = $('#select1').val();
			op_add(post_id,meta_value,meta_key);
		}
	});
	
		
	$('.calc-option-pop').on('submit', function (e) {
		e.preventDefault();
		$.ajax({
            type: 'POST',
            url: ajaxurl,
            data: ({action: 'add_calc_option', serialize: $('.calc-option-pop').serialize()}),
            success: function(data){
				$('#myModal_option').modal("hide");
				location.reload();
				
            }
        });
	});	
		
			
	$('.calc-param-pop').on('submit', function (e) {
		var opt_id = $('#title_param_red').attr('data-option-id');
		e.preventDefault();
		$.ajax({
            type: 'POST',
            url: ajaxurl,
            data: ({action: 'add_calc_param', serialize: $('.calc-param-pop').serialize()}),
            success: function(data){
				$('#myModal_param_red').modal("hide");
				$.ajax({
					type: 'POST',
					url: ajaxurl,
					data: ({action: 'calc_param_get', option_id: data }),
					success: function(data){
						$('#tbl_param').empty();
						$('#tbl_param').html(data);
						$('#option_id').val(opt_id);
						$('.calc-param-pop').find('#id').val('');
					}
				});
            }
        });
	});	
		
	
	$('.up-option').on('click', function () {
		var options = $(this).parents('.tr-opt').attr('data-options'),
			options_arr = JSON.parse(options);
			
		$.each(options_arr,function(index,value){
			$('.calc-form-content').find('#'+index).val(value);
		});
		
	});
	
	$('#calc_check').on('change', function () {
		if ($(this).is(':checked')){
			var calc_check = 1;
			$('#calc_check_title').text('Выключить калькулятор для этой страницы');
			$('.calc_option').show();
		}else{
			var calc_check = 0;
			$('#calc_check_title').text('Включить калькулятор для этой страницы');
			$('.calc_option').hide();
		}
		$.ajax({
			type: 'POST',
			url: ajaxurl,
			data: ({ action: 'calc_inc', id: $('#post_id').val(), calc_check: calc_check }),
			success : function( response ){ console.log(response) },
			error : function(error){ console.log(error) }
		});
	});
	
	$('.up-param').on('click', function () {	
		var option_id = $(this).parents('.tr-opt').attr('data-id-option'),
		option_name = $(this).parents('.tr-opt').find('.name').text();
		$.ajax({
			type: 'POST',
			url: ajaxurl,
			data: ({action: 'calc_param_get', option_id: option_id }),
			success: function(data){
				$('#tbl_param').empty();
				$('#tbl_param').html(data);
				$('#title_param_red').attr('data-option-id', option_id);
				$('.title_param').text('Параметры '+option_name);
				$('.title_param').attr('data-name-option',option_name);
				
			}
		});
	});
	

	$(document).on('click', '.up-param-red', function () {
		var option_id = $(this).parents('.tr-opt').attr('data-id-option'),
			option_name = $(this).parents('.tr-opt').find('.name').text(),
			param_id = $(this).attr('data-param-id'),
			items = [];
			$(this).parents('.tr-opt').find('td').each(function(){
				$(this).attr('class');
				$('#myModal_param_red').find('#'+$(this).attr('class')).val($(this).text());
				//items.push({$(this).class(): $(this).text()});
			});
			items = JSON.stringify(items);
			
	
			$('#myModal_param_red').find('#id').val(param_id);
			$('#option_id').val(option_id);
			$('.label_param_red').text(option_name);
			
	});
	
	$('.add-param-red').on('click', function () {

		var option_id = $(this).attr('data-option-id'),
			option_name = $(this).find('.name').text();

	
			$('#option_id').val(option_id);
			$('.label_param_red').text(option_name);
			
	});
		
	$('#calc_copy').on('change', function () {

		var id = $(this).val(),
			post_id = $(this).attr('data-id');
		$.ajax({
			url: ajaxurl,
			method: 'post',
			data:  ({action:'calc_copy',id:id,post_id:post_id}),
			success: function(data){
				data = data;
			}
		});
			
	});
	
	var fixHelper = function(e, ui) {
		ui.children().each(function() {
			$(this).width($(this).width());
		});
		return ui;
	};    

	$('.sortable-table').sortable({
		helper: fixHelper,
		stop: function() {
			$.ajax({
				url: ajaxurl,
				method: 'post',
				data:  $('.sortable-table input').serialize()+'&action=calc_sort',
				success: function(data){
					data = data;
				}
			});
		}
	});
	
	$('.sortable-param').sortable({
		helper: fixHelper,
		stop: function() {
			$.ajax({
				url: ajaxurl,
				method: 'post',
				data:  $('.sortable-table input').serialize()+'&action=calc_param_sort',
				success: function(data){
					data = data;
				}
			});
		}
	});
});

function calc_op_del(id)
{
	var is = confirm("Опция будет удалена! Продолжить?");
	
	$.ajax({
		type: 'POST',
		url: ajaxurl,
		data: ({id: id, action: 'calc_op_del'}),
		success: function(data){
			location.reload();
		}
	});
}

function calc_red_param_del(id)
{
	var is = confirm("Параметр будет удален! Продолжить?");
	
	$.ajax({
		type: 'POST',
		url: ajaxurl,
		data: ({id: id, action: 'calc_red_param_del'}),
		success: function(data){
			location.reload();
		}
	});
}

function down()
{
  if ( a.style.display == 'none' )
	a.style.display = 'block';
  else
	if ( a.style.display == 'block' )
	a.style.display = 'none';
};

function select_date(meta_value,meta_key){
//alert(meta_value)
	var post_id = $(".niz").attr("id");
	var b = document.getElementById('select2');
	b.value=meta_value;
	down();
	
	op_add(post_id, meta_value, meta_key)

}


function op_del(meta_id)
{
	var is = confirm("Вы точно хотите удалить опцию?");
	//alert( is );
	
	$.ajax({
		type: 'GET',
		url: '/lib/ajax/select1.php',
		data: 'meta_id='+meta_id+'&op_del=op_del',
	});
}

function op_add(post_id,meta_value,meta_key)
{
//alert('post_id='+post_id+'&meta_value='+meta_value+'&meta_key='+meta_key+'&op_add=op_add')

var res = encodeURIComponent(meta_value);
	$.ajax({
		type: 'GET',
		url: '/lib/ajax/select1.php',
		data: 'post_id='+post_id+'&meta_value='+res+'&meta_key='+meta_key+'&op_add=op_add',
		success: function(data){
//alert(data)
			data = JSON.parse(data);
			var selects = '<tr><th>Опция</th><th>Значение</th><th></th></tr>';
			$.each(data, function(){
				sel = '<tr><td>'+this.meta_key+'</td><td>'+this.meta_value+'</td><td><a href="#" title="Удалить" onclick="op_del(\''+this.meta_id+'\')"><i class="fa fa-times"></i></a></td></tr>';
				selects = selects + sel;
			});
			$('#tbl').html(selects);
			a.style.display = 'none';
			$(".info").attr("style", "display:block");
		}
	});
}
