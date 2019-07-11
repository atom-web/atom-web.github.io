<?php
/**
 * Запись в цикле (loop.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */ 
?>
  <div class="queasts__col category-street category-7-9 category-10-12" data-order="1">
                        <a href="<?php the_permalink(); ?>" class="quest-item">
                            <div class="quest-item__image">
                                <div class="quest-item__img">
                                    <img src="<?php the_post_thumbnail(); ?>" alt=""/>
                                </div>
                                <div class="quest-item__price">
                                    <div class="label">
                                   <span>
                                       <?php echo get_post_meta( get_the_ID(), 'цена', true ); ?>
                                   </span>
                                    </div>
                                </div>
                            </div>
                            <div class="quest-item__text">
                                <div class="quest-item__absolute">
                                    <div class="quest-item__title h1">
                                        <?php the_title(); ?>
                                    </div>
                                    <!-- <div class="quest-item__subtitle h2">
                                        <?php echo get_post_meta( get_the_ID(), 'второе_имя', true ); ?>
                                    </div> --!>

                                   
                                    
                                </div>
                                
                            </div>
                        </a>
                    </div>