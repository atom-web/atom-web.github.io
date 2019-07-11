<?php
/**
 * Шаблон рубрики (category.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */
get_header(); // подключаем header.php ?> 
<!--<section>
	<div class="quests quests-catalog">
        <h2>Лучшие квесты для детей в Москве</h2>
        <div class="queasts__inner js-quests-filter quests-grid" id="filter-mix-сontainer">
            <div class="fail-message"><span>Ничего не найдено</span></div>
				<?php if (have_posts()) : while (have_posts()) : the_post(); // если посты есть - запускаем цикл wp ?>
					<?php get_template_part('loop'); // для отображения каждой записи берем шаблон loop.php ?>
				<?php endwhile; // конец цикла
				else: echo '<p>Нет записей.</p>'; endif; // если записей нет, напишим "простите" ?>	 
				<?php pagination(); // пагинация, функция нах-ся в function.php ?>
			</div>
			<?php get_sidebar(); // подключаем sidebar.php ?>
		</div>
	</div>
</section>-->
    <main class="main">
        <div class="container">
		<?php if( function_exists('kama_breadcrumbs') ) kama_breadcrumbs(' » '); ?>
            <section class="top-block">
                <div class="toggle-view cfix">
                    <button class="btn active js-toggle-view" data-view="quests-grid">
                        <svg class="icon" viewBox="0 0 20 20">
                            <path d="M1243 768h8v8h-8v-8zm-12 0h8v8h-8v-8zm12 12h8v8h-8v-8zm-12 0h8v8h-8v-8z"
                                  transform="translate(-1231 -768)"></path>
                        </svg>
                    </button>
                    <button class="btn js-toggle-view" data-view="quests-list">
                        <svg class="icon" viewBox="0 0 21 21">
                            <path
                                d="M1278 788v-4h12v4h-12zm0-12h12v4h-12v-4zm0-8h12v4h-12v-4zm-8 16h4v4h-4v-4zm0-8h4v4h-4v-4zm0-8h4v4h-4v-4z"
                                transform="translate(-1269.5 -767.5)"></path>
                        </svg>
                    </button>
                </div>
                <div class="filter-mobile">
                    <div class="filter-bar__button">
                        <div class="button button--filter js-toggle-mobile-filter">
                            <svg class="icon" viewBox="0 0 20 16" style="width: 15px;height: 15px;">

                                <path d="M9.859 13A3.991 3.991 0 0 1 6 16c-1.862 0-3.412-1.278-3.859-3H0v-2h2.141C2.588 9.278 4.138 8 6 8c1.862 0 3.412 1.278 3.859 3H20v2H9.859zM6 10a2 2 0 1 0-.001 3.999A2 2 0 0 0 6 10zm7-2c-1.862 0-3.412-1.278-3.859-3H0V3h9.141C9.588 1.278 11.138 0 13 0c1.862 0 3.412 1.278 3.859 3H20v2h-3.141A3.991 3.991 0 0 1 13 8zm0-6a2 2 0 1 0-.001 3.999A2 2 0 0 0 13 2z" class="cls-2" fill="currentColor"></path></svg>
                            Фильтр
                        </div>
                    </div>
                </div>
                <h1>
                   <?php single_cat_title(); // название категории ?>
                </h1>
                
                    <?php 
the_archive_description( '
<div class="taxonomy-description ctext">', '</div>
 
' ); 
?>
                <form class="mixed-filters" id="mixed-filters">
                    <fieldset>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-street">
                                <span></span>
                                <span class="label-text">Уличные</span>
                            </label>
                        </div>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-museum">
                                <span></span>
                                <span class="label-text">Музейные</span>
                            </label>
                        </div>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-openair">
                                <span></span>
                                <span class="label-text">Выездные</span>
                            </label>
                        </div>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-7-9">
                                <span></span>
                                <span class="label-text">7-9 лет</span>
                            </label>
                        </div>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-10-12">
                                <span></span>
                                <span class="label-text">10-12 лет</span>
                            </label>
                        </div>
                        <div class="checkbox checkbox--inline">
                            <label>
                                <input type="checkbox" name="checkbox" value=".category-13-15">
                                <span></span>
                                <span class="label-text">13-15 лет</span>
                            </label>
                        </div>
                    </fieldset>
                    <div class="filter-bar__button">
                        <button id="reset-mixed-filter" class="button button-black alt">Сбросить фильтр</button>
                        <div class="button button--filter js-toggle-mobile-filter">
                            Применить
                        </div>
                    </div>

                </form>
            </section>
            <div class="quests quests-catalog">
                <h2><?php single_cat_title(); // название категории ?> в Москве</h2>
                <div class="queasts__inner js-quests-filter quests-grid" id="filter-mix-сontainer">
                    <div class="fail-message"><span>Ничего не найдено</span></div>
                    
<?php if (have_posts()) : while (have_posts()) : the_post(); // если посты есть - запускаем цикл wp ?>
	<?php get_template_part('loop'); // для отображения каждой записи берем шаблон loop.php ?>
<?php endwhile; // конец цикла
else: echo '<p>Нет записей.</p>'; endif; // если записей нет, напишим "простите" ?>	 
<?php pagination(); // пагинация, функция нах-ся в function.php ?>                           
                    </div>
                </div>
            </div>
            <div class="home-ctext ctext">
                
            </div>
        </div>
        <div class="outer-wrapper">
            <div class="promo-area--footer">
                <div class="promo-area__row">
				<?php if (have_posts()) : ?>
<?php query_posts('posts_per_page=4'); ?>
<?php while (have_posts()) : the_post(); ?>
			<div class="promo-area__promo"><?php get_template_part('loops-promo'); // для отображения каждой записи берем шаблон loop.php ?> </div>
				<?php endwhile; // конец цикла
				else: echo '<p>Нет записей.</p>'; endif; // если записей нет, напишим "простите" ?>	
</div>
            </div>
        </div>

    </main>
<?php get_footer(); // подключаем footer.php ?>