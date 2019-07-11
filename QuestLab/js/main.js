jQuery(function($){
	$('#filter').submit(function(){
		var filter = $(this);
		$.ajax({
			url:myajax.url, // обработчик
			data:filter.serialize(), // данные
			type:filter.attr('method'), // тип запроса
			beforeSend:function(xhr){
				filter.find('.save_kv').val('Загружаю...'); // изменяем текст кнопки
			},
			success:function(data){
				filter.find('.save_kv').val('ИСКАТЬ КВЕСТЫ'); // возвращаеи текст кнопки
				$('#response').html(data);
			}
		});
		return false;
	});
});