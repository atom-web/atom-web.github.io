<?php
/**
 * Шаблон комментариев (comments.php)
 * Выводит список комментариев и форму добавления
 * @package WordPress
 * @subpackage your-clean-template-3
 */
?>
<div class="row" id="comments">
    
	<?php if (have_comments()) : // если комменты есть
			wp_list_comments(array( 'callback' => 'my_comments_callback' )); // выводим комменты
		endif;	
		?>
		
	
</div>