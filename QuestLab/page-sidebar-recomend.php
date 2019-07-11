<?php
/**
 Template Name: Шаблон страницы с сайдбаром и блоком рекомендуемые
 * @package WordPress
 * @subpackage your-clean-template-3
 */
get_header(); // подключаем header.php ?>
<section>
	<div class="container">
		<div class="row">
			<div class="col-sm-8">
				<?php if ( have_posts() ) while ( have_posts() ) : the_post(); // старт цикла ?>
					<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>> <?php // контэйнер с классами и id ?>
						<h1><?php the_title(); // заголовок поста ?></h1>
						<?php the_content(); // контент ?>
					</article>
				<?php endwhile; // конец цикла ?>
			</div>
			<div class="col-sm-4">
			 <div class="sidebar-bottom">
		<div class="js-bottom-scroll-of">
			<div class="similar-quests sidebar__item">
				<h4 class="similar-quests__title">
					Вам так же могут подойти:
				</h4>
				<hr>
				<?php
				$related_tax = 'category';
				// получаем ID всех элементов (категорий, меток или таксономий), к которым принадлежит текущий пост
				$cats_tags_or_taxes = wp_get_object_terms( $post->ID, $related_tax, array( 'fields' => 'ids' ) );
			 
				// массив параметров для WP_Query
				$args = array(
					'posts_per_page' => 2, // сколько похожих постов нужно вывести,
					'tax_query' => array(
						array(
							'taxonomy' => $related_tax,
							'post__not_in' => $post->ID,
							'field' => 'id',
							'include_children' => false, // нужно ли включать посты дочерних рубрик
							'terms' => $cats_tags_or_taxes,
							'operator' => 'AND' // если пост принадлежит хотя бы одной рубрике текущего поста, он будет отображаться в похожих записях, укажите значение AND и тогда похожие посты будут только те, которые принадлежат каждой рубрике текущего поста
						)
					)
				);
				$misha_query = new WP_Query( $args );
				 
				// если посты, удовлетворяющие нашим условиям, найдены
				if( $misha_query->have_posts() ) :
				 
					// запускаем цикл
					while( $misha_query->have_posts() ) : $misha_query->the_post();?>
							 <a href="<?php echo get_permalink( $misha_query->post->ID );?>" class="quest-item">
								<div class="quest-item__img">
									<img src="<?php echo get_the_post_thumbnail_url( $misha_query->post->ID, 'Plan' ); ?>" alt="">
								</div>
							</a>
						<?php
					endwhile;
				endif;
				 
				// не забудьте про эту функцию, её отсутствие может повлиять на другие циклы на странице
				wp_reset_postdata();
				?>

			</div>
		</div>

	</div>
			</div>
		</div>
	</div>
</section>
<?php get_footer(); // подключаем footer.php ?>