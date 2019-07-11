<?php
/**
 * Шаблон отдельной записи (single.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */
get_header(); // подключаем header.php ?>

    <main class="main">
        <div class="top-image">
			<?php 
$attachment_id = get_field('foto_zas');
$front = 'full'; //'singlehead'; 
$front_min = 'front_min';
?>
            <div class="jarallax visible-desktop" style="background-image: url(<?php echo wp_get_attachment_image_url( $attachment_id, $front );?>);"></div>
            <div class="jarallax visible-mobile" style="background-image: url(<?php echo wp_get_attachment_image_url( $attachment_id, $front_min );?>);"></div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-lg-8 col-xs-12">
                    <?php if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' » '); ?>
                    <div class="content-menu js-scrolldown">
                        <ul>
                            <li>
                                <a href="#information">
                                    Информация
                                </a>
                            </li>
                            <li>
                                <a href="#legend">
                                    Легенда
                                </a>
                            </li>
                            <li>
                                <a href="#features">
                                    Особенности
                                </a>
                            </li>
                            <li>
                                <a href="#how_is_going">
                                    Как проходит
                                </a>
                            </li>
                            <li>
                                <a href="#reviews">
                                    Отзывы
                                </a>
                            </li>
                            <li class="hidden-desktop">
                                <a href="#calc">
                                    Посчитать стоимость
                                </a>
                            </li>
                        </ul>
                    </div>
                    <h1><?php single_post_title(); ?></h1>
                    <div class="ctext quest-text js-scroll-section" data-scroll="#information">
                        <h2><?php echo get_post_meta( get_the_ID(), 'второе_имя', true );?></h2>
                        <?php echo wpautop(  get_post_meta( get_the_ID(), 'полное_описание', true ));?>
                    </div>


                    <div class="attributes">
                        <div class="row">
                            <div class="col">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="attribute-item">
                                            <div class="attribute-item__icon">
                                                <img src="<?php echo get_template_directory_uri();?>/img/icon_5.jpg" alt="">
                                            </div>
                                            <div class="attribute-item__text">
                                                <?php dropdown_list('Тип');?>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="attribute-item">
                                            <div class="attribute-item__icon">
                                                <img src="<?php echo get_template_directory_uri();?>/img/icon_1.jpg" alt="">
                                            </div>
                                            <div class="attribute-item__text">
                                                <?php dropdown_list('Возраст');?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div class="row">
                                    <div class="col-sm-6">
                                        <div class="attribute-item">
                                            <div class="attribute-item__icon">
                                                <img src="<?php echo get_template_directory_uri();?>/img/icon_2.jpg" alt="">
                                            </div>
                                            <div class="attribute-item__text">
                                               <?php echo get_post_meta( get_the_ID(), 'продолжительность', true );?>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-sm-6">
                                        <div class="attribute-item">
                                            <div class="attribute-item__icon">
                                                <img src="<?php echo get_template_directory_uri();?>/img/icon_3.jpg" alt="">
                                            </div>
                                            <div class="attribute-item__text">
                                                <?php echo get_post_meta( get_the_ID(), 'количество', true );?>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section class="js-scroll-section quest-info" data-scroll="#legend">
                        <div class="quest-info__title h1">
                            ЛЕГЕНДА:
                        </div>
                        <hr/>
                        <div class="quest-info__info legend">
                            <div class="row">
                                <div class="col-lg-6">
                                    <?php 

$images = get_field('gallery');
$size = 'full'; // (thumbnail, medium, large, full или произвольный размер)

if( $images ): 
echo '<div class="slick-gallery">
		<div class="js-slider-for">';
// не забудьте указать свои значения ширины 
		foreach( $images as $image ) {
			echo '<div class="slick-gallery-item">';
			echo wp_get_attachment_image( $image['ID'], 'slider' );
			echo '</div>';
		}
echo '</div><div class="js-slider-nav">'; 
		foreach( $images as $image ) {
			echo '<div class="slick-gallery-item">';
			echo wp_get_attachment_image( $image['ID'], 'min' );
			echo '</div>';
		}
echo '</div></div>';
endif; ?>
							
                                    
                                </div>
                                <div class="col-lg-6">
                                    <div class="ctext">
                                        <?php echo wpautop(  get_post_meta( get_the_ID(), 'легенда', true ));?>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div class="js-scroll-section quest-info" data-scroll="#features">
                        <div class="quest-info__title h1">
                            ОСОБЕННОСТИ КВЕСТА:
                        </div>
                        <hr/>
                        <div class="quest-info__info features">
                            <div class="row">
							 <div class="col-md-6">
							     <?php
							     if(!empty(get_field('особенность1'))){
							     if(get_field('особенность1')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка1');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание1');?>
                                        </div>
                                        <div class="features-item__map">
                                           <?php echo get_field('карта');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php 
							     if(!empty(get_field('особенность2'))){
                                 if(get_field('особенность2')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка2');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание2');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                
                                 <?php
							     if(!empty(get_field('особенность3'))){
							     if(get_field('особенность3')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка3');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание3');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php
							     if(!empty(get_field('особенность4'))){
							     if(get_field('особенность4')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка4');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание4');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php
							     if(!empty(get_field('особенность5'))){
							     if(get_field('особенность5')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка5');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание5');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php
							     if(!empty(get_field('особенность6'))){ 
							     if(get_field('особенность6')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка6');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                           <?php echo get_field('описание6');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                </div>
                                 <div class="col-md-6">
							     <?php
							     if(!empty(get_field('особенность1право'))){
							     if(get_field('особенность1право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка1право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание1право');?>
                                        </div>
                                        <div class="features-item__map">
                                           <?php echo get_field('карта');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php 
                                 if(!empty(get_field('особенность2право'))){
                                 if(get_field('особенность2право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка2право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание2право');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                
                                 <?php
                                 if(!empty(get_field('особенность3право'))){
                                 if(get_field('особенность3право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка3право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание3право');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php
                                 if(!empty(get_field('особенность4право'))){
                                 if(get_field('особенность4право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка4право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание4право');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php 
                                 if(!empty(get_field('особенность5право'))){
                                 if(get_field('особенность5право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка5право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                            <?php echo get_field('описание5право');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                 <?php
                                 if(!empty(get_field('особенность6право'))){
                                 if(get_field('особенность6право')[0] == 1){?>
                                    <div class="features-item">
                                        <div class="features-item__img">
                                            <img src="<?php echo get_field('картинка6право');?>" alt="">
                                        </div>
                                        <div class="features-item__text">
                                           <?php echo get_field('описание6право');?>
                                        </div>
                                    </div>
                                 <?php }}?>
                                </div>
							</div>
                        </div>
                    </div>
                    <div class="js-scroll-section quest-info" data-scroll="#how_is_going">
                        <div class="quest-info__title h1">
                            КАК ПРОХОДИТ КВЕСТ
                        </div>
                        <hr/>
                       <div class="quest-info__info how_is_going">
                            <div class="ctext">
                               
                                        <?php echo wpautop(  get_post_meta( get_the_ID(), 'как_проходит_квест', true ));?>
                            </div>
                            <div class="ctext">
                                <h4>
                                    ПОСМОТРЕТЬ:
                                </h4>
                                <div class="j-module n j-video">
                                    <div class="cc-m-video-gutter cc-m-video-align-center cc-m-video-ratio-2">
                                        <div class="cc-m-video-wrapper">
                                            <iframe allowfullscreen="true" class="cc-m-video-container" frameborder="0" src="<?php echo get_post_meta( get_the_ID(), 'видео', true );?>"></iframe>
                                            
                                        </div>
                                    </div>

                                    <div class="cc-clear">&nbsp;</div>
                                </div>
                            </div>

                        </div>
                    </div>
                    <div class="js-scroll-section quest-info" data-scroll="#reviews">
                        <div class="quest-info__title h1">
                            Отзывы:
                        </div>
                        <hr/>
                        <div class="quest-info__info reviews">
                               <?php 
                               comments_template(  );  ?>
                               
                                <?php 
                                global $user_ID;
                                if( is_super_admin( $user_ID ) ){
                                	comment_form( $args='', get_the_ID() );
                                }
                                ?>

                               
                        </div>
                    </div>
                </div>
                <div class="col-lg-4" >

                    <div class="hidenmobil"><?php   require get_template_directory() . '/calc/frontend/calculator.php';?></div>
					 <div class="hidenpc"><?php   require get_template_directory() . '/calc/frontend/calculator-mobil.php';?></div>
					
                    

                </div>
            </div>
        </div>

        <div class="outer-wrapper">
            <div class="promo-area--footer">
                <div class="promo-area__row">
<?php
$related_tax = 'category';
// получаем ID всех элементов (категорий, меток или таксономий), к которым принадлежит текущий пост
$cats_tags_or_taxes = wp_get_object_terms( $post->ID, $related_tax, array( 'fields' => 'ids' ) );

// массив параметров для WP_Query
$args = array(
	'posts_per_page' => 4, // сколько похожих постов нужно вывести,
	'tax_query' => array(
		array(
			'taxonomy' => $related_tax,
			'post__not_in' => $post->ID,
			'field' => 'id',
			'include_children' => false, // нужно ли включать посты дочерних рубрик
			'terms' => $cats_tags_or_taxes,
			'operator' => 'IN' // если пост принадлежит хотя бы одной рубрике текущего поста, он будет отображаться в похожих записях, укажите значение AND и тогда похожие посты будут только те, которые принадлежат каждой рубрике текущего поста
		)
	)
);
$misha_query = new WP_Query( $args );

// если посты, удовлетворяющие нашим условиям, найдены
if( $misha_query->have_posts() ) :
 
	// запускаем цикл
	while( $misha_query->have_posts() ) : $misha_query->the_post();?>
            <div class="promo-area__promo">
                <a href="<?php echo get_permalink( $misha_query->post->ID );?>">
                    <img src="<?php echo get_the_post_thumbnail_url( $misha_query->post->ID, 'front_min' ); ?>" alt="">
                </a>
                <div class="promo-area__text">
                    <div class="h2">
                        <a href="<?php echo get_permalink( $misha_query->post->ID );?>"><?php echo get_the_title();?></a>
                    </div>
                    <p><?php echo get_post_meta( get_the_ID(), 'описание_для_карточки', true );?></p>
                </div>
            </div>
        <?php
	endwhile;
endif;
 
// не забудьте про эту функцию, её отсутствие может повлиять на другие циклы на странице
wp_reset_postdata();
?>
                   
                </div>
            </div>
        </div>
        
        
        
    </main>
<?php get_footer(); // подключаем footer.php ?>
