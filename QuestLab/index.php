<?php
/**
 * Главная страница (index.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */
get_header(); // подключаем header.php 
$ppp = get_page_by_title('Главная','OBJECT','post');
$id_title = $ppp->ID;
?> 
    <main class="main">
        <section class="homepage-hero component">
            <div class="video-back" style="background-image: url('<?php echo get_the_post_thumbnail_url( $id_title, 'glavnaya' );?>');" data-poster="<?php echo get_post_meta( $id_title, 'video', true ); ?>" data-src-webm="<?php echo get_post_meta( $id_title, 'video', true ); ?>" data-src-mp4="<?php echo get_post_meta( $id_title, 'video', true ); ?>"></div>
            <div class="homepage-hero__copy">
                <span class="tag homepage-hero__tag"></span>
                <div class="alt h1 homepage-hero__title">
                    <?php echo get_post_meta( $id_title, 'title1', true ); ?> <br />
                    <?php echo get_post_meta( $id_title, 'title2', true ); ?> <br />
                    <?php echo get_post_meta( $id_title, 'title3', true ); ?>
                </div>
                <div class="homepage-hero__description"></div>
                <a href="" class="homepage-hero__link button alt gtm-homepage-hero">
                    узнать больше
                </a>
            </div>
        </section>
		
        <div class="container">
			<?php if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' » '); ?>
            <div class="home-text ctext">
                <h1><?php echo get_post_meta( $id_title, 'top_title', true ); ?></h1>
                <p><?php echo get_post_meta( $id_title, 'top_text', true ); ?></p>
            </div>

            <div class="search-filter">
                <div class="j-module n j-formnew  j-md" id="cc-m-7924260886">
                    <form id="filter" action="<?php echo site_url() ?>/wp-admin/admin-ajax.php" class="cc-form cc-m-form-layout-1" method="POST">
                        <div class="cc-m-form-loading">&nbsp;</div>

                        <div class="cc-m-form-view-sortable">
                            <div class="cc-m-form-view-element cc-m-form-select " data-action="element">
                                <div  class="options_div cc-m-form-view-input-wrapper">
                                    <select  class="options_select"  id = 'dif' name="dif" >
										<option value=''>Повод</option>
										<?php dropdown_list('Повод');?>
                                    </select>
                                </div>
                                <div  class="options_div cc-m-form-view-input-wrapper">
                                    <select  class="options_select"  id = 'type' name="type" >
                                        <option value=''>Тип квеста</option>
                                        <?php dropdown_list('Тип');?>
                                    </select>
                                </div>
                                <div  class="options_div cc-m-form-view-input-wrapper">
                                    <select  class="options_select" id = 'age' name="age" >
                                        <option value=''>Возраст</option>
                                        <?php dropdown_list('Возраст');?>
                                    </select>
                                </div>
                                <div  class="options_div cc-m-form-view-input-wrapper">
                                    <select  class="options_select" id = 'col' name="col" >
                                        <option value=''>Количество</option>
                                        <?php dropdown_list('Количество');?>
                                    </select>
                                </div>
                                <div  class="options_div cc-m-form-view-input-wrapper">
                                    <input class="options_select save_kv" type="submit" value="Искать квесты" >
									<input type="hidden" name="action" value="myfilter">
                                </div>
								
                            </div>
                        </div>
                    </form>
					<div id="response"></div>
                </div>
            </div>
        </div>
		<section class="center slider">
		<?php if (have_posts()) : while (have_posts()) : the_post(); // если посты есть - запускаем цикл wp ?>
			<div><?php get_template_part('loops'); // для отображения каждой записи берем шаблон loop.php ?></div>
				<?php endwhile; // конец цикла
				else: echo '<p>Нет записей.</p>'; endif; // если записей нет, напишим "простите" ?>	 
</section>


        <div class="container">
            <div class="quests">
                <div class="row">
					<?php records_cats('quests');?>
                    
                </div>
            </div>
            <div class="home-ctext ctext">
                <?php 
				echo $ppp->post_content; // контент записи
				?>
            </div>
        </div>
        <div class="js-slick-carousel slick-carousel cfix">
			<?php mayak_cats_images(2, 'carousel-item__absolute'); ?>
        </div>
		<section class="center slider">
		<?php if (have_posts()) : while (have_posts()) : the_post(); // если посты есть - запускаем цикл wp ?>
			<div><?php get_template_part('loops'); // для отображения каждой записи берем шаблон loop.php ?></div>
				<?php endwhile; // конец цикла
				else: echo '<p>Нет записей.</p>'; endif; // если записей нет, напишим "простите" ?>	 
</section>
        <div class="component homepage-email">
            <form>
                <div class="homepage-email__wrapper">
                    <label class="homepage-email__label" for="email">
                        <span class="alt homepage-email__title">Добавьте квестов в свою почту</span>
                    </label>
                    <div class="homepage-email__form-fields">
                        <div class="homepage-email__input-wrapper is-visible">
                            <input class="homepage-email__input is-invalid" type="email" autocomplete="email" id="email" placeholder="Email" required="required">
                            <button class="homepage-email__submit" type="submit">
                                <svg class="homepage-email__button-icon" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" viewBox="0 0 32 32">
                                    <path fill="currentColor" d="M6 1.958l1.978-1.98 18.022 16.042-18.020 16.022-1.98-1.98 16.084-14.084z"></path>
                                </svg>
                            </button>
                        </div>
                        <div class="error">
                          
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </main>
<?php get_footer(); // подключаем footer.php ?>