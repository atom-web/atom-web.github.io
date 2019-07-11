<?php
/**
 * Запись в цикле (loop.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */ 
?>
<a href="<?php the_permalink(); ?>">
  <?php the_post_thumbnail(); ?>
<div class="promo-area__text">
<h2><?php the_title(); ?></h2>
<p><?php echo get_post_meta( get_the_ID(), 'второе_имя', true ); ?></p>
</div>
                                
                   