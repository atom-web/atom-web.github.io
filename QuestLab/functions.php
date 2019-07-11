<?php
/**
 * Функции шаблона (function.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */

add_theme_support('title-tag'); // теперь тайтл управляется самим вп

register_nav_menus(array( // Регистрируем 2 меню
	'top' => 'Верхнее', // Верхнее
	'bottom' => 'Внизу' // Внизу
));

add_theme_support('post-thumbnails'); // включаем поддержку миниатюр
//set_post_thumbnail_size(300, 300); // задаем размер миниатюрам 
//add_image_size('sel', 336, 224, true);
add_image_size('sel', 280, 345, true); // добавляем еще один размер картинкам 280x345 с обрезкой
add_image_size('glavnaya', 1349, 500, true);
add_image_size('min', 50, 50, true);
add_image_size('front_min', 504, 336, true);
add_image_size('front', 1440, 960, true);
add_image_size('singlehead', 1920, 550, true);
add_image_size('slider', 350, 350, true);
add_image_size('plan', 390, 390, true); // добавляем еще один размер картинкам 768 с обрезкой

register_sidebar(array( // регистрируем левую колонку, этот кусок можно повторять для добавления новых областей для виджитов
	'name' => 'Сайдбар', // Название в админке
	'id' => "sidebar", // идентификатор для вызова в шаблонах
	'description' => 'Обычная колонка в сайдбаре', // Описалово в админке
	'before_widget' => '<div id="%1$s" class="widget %2$s">', // разметка до вывода каждого виджета
	'after_widget' => "</div>\n", // разметка после вывода каждого виджета
	'before_title' => '<span class="widgettitle">', //  разметка до вывода заголовка виджета
	'after_title' => "</span>\n", //  разметка после вывода заголовка виджета
));

if (!class_exists('clean_comments_constructor')) { // если класс уже есть в дочерней теме - нам не надо его определять
	class clean_comments_constructor extends Walker_Comment { // класс, который собирает всю структуру комментов
		public function start_lvl( &$output, $depth = 0, $args = array()) { // что выводим перед дочерними комментариями
			$output .= '<ul class="children">' . "\n";
		}
		public function end_lvl( &$output, $depth = 0, $args = array()) { // что выводим после дочерних комментариев
			$output .= "</ul><!-- .children -->\n";
		}
	    protected function comment( $comment, $depth, $args ) { // разметка каждого комментария, без закрывающего </li>!
	    	$classes = implode(' ', get_comment_class()).($comment->comment_author_email == get_the_author_meta('email') ? ' author-comment' : ''); // берем стандартные классы комментария и если коммент пренадлежит автору поста добавляем класс author-comment
	        echo '<li id="comment-'.get_comment_ID().'" class="'.$classes.' media">'."\n"; // родительский тэг комментария с классами выше и уникальным якорным id
	    	echo '<div class="media-left">'.get_avatar($comment, 64, '', get_comment_author(), array('class' => 'media-object'))."</div>\n"; // покажем аватар с размером 64х64
	    	echo '<div class="media-body">';
	    	echo '<span class="meta media-heading">Автор: '.get_comment_author()."\n"; // имя автора коммента
	    	//echo ' '.get_comment_author_email(); // email автора коммента, плохой тон выводить почту
	    	echo ' '.get_comment_author_url(); // url автора коммента
	    	echo ' Добавлено '.get_comment_date('F j, Y в H:i')."\n"; // дата и время комментирования
	    	if ( '0' == $comment->comment_approved ) echo '<br><em class="comment-awaiting-moderation">Ваш комментарий будет опубликован после проверки модератором.</em>'."\n"; // если комментарий должен пройти проверку
	    	echo "</span>";
	        comment_text()."\n"; // текст коммента
	        $reply_link_args = array( // опции ссылки "ответить"
	        	'depth' => $depth, // текущая вложенность
	        	'reply_text' => 'Ответить', // текст
				'login_text' => 'Вы должны быть залогинены' // текст если юзер должен залогинеться
	        );
	        echo get_comment_reply_link(array_merge($args, $reply_link_args)); // выводим ссылку ответить
	        echo '</div>'."\n"; // закрываем див
	    }
	    public function end_el( &$output, $comment, $depth = 0, $args = array() ) { // конец каждого коммента
			$output .= "</li><!-- #comment-## -->\n";
		}
	}
}

if (!function_exists('pagination')) { // если ф-я уже есть в дочерней теме - нам не надо её определять
	function pagination() { // функция вывода пагинации
		global $wp_query; // текущая выборка должна быть глобальной
		$big = 999999999; // число для замены
		$links = paginate_links(array( // вывод пагинации с опциями ниже
			'base' => str_replace($big,'%#%',esc_url(get_pagenum_link($big))), // что заменяем в формате ниже
			'format' => '?paged=%#%', // формат, %#% будет заменено
			'current' => max(1, get_query_var('paged')), // текущая страница, 1, если $_GET['page'] не определено
			'type' => 'array', // нам надо получить массив
			'prev_text'    => 'Назад', // текст назад
	    	'next_text'    => 'Вперед', // текст вперед
			'total' => $wp_query->max_num_pages, // общие кол-во страниц в пагинации
			'show_all'     => false, // не показывать ссылки на все страницы, иначе end_size и mid_size будут проигнорированны
			'end_size'     => 15, //  сколько страниц показать в начале и конце списка (12 ... 4 ... 89)
			'mid_size'     => 15, // сколько страниц показать вокруг текущей страницы (... 123 5 678 ...).
			'add_args'     => false, // массив GET параметров для добавления в ссылку страницы
			'add_fragment' => '',	// строка для добавления в конец ссылки на страницу
			'before_page_number' => '', // строка перед цифрой
			'after_page_number' => '' // строка после цифры
		));
	 	if( is_array( $links ) ) { // если пагинация есть
		    echo '<ul class="pagination">';
		    foreach ( $links as $link ) {
		    	if ( strpos( $link, 'current' ) !== false ) echo "<li class='active'>$link</li>"; // если это активная страница
		        else echo "<li>$link</li>"; 
		    }
		   	echo '</ul>';
		 }
	}
}

add_action('wp_footer', 'add_scripts'); // приклеем ф-ю на добавление скриптов в футер
if (!function_exists('add_scripts')) { // если ф-я уже есть в дочерней теме - нам не надо её определять
	function add_scripts() { // добавление скриптов
	    if(is_admin()) return false; // если мы в админке - ничего не делаем
	    wp_deregister_script('jquery'); // выключаем стандартный jquery
	    wp_enqueue_script('libs', get_template_directory_uri().'/js/libs.js','','',true); 
	    //wp_enqueue_script('app', 'http://maps.googleapis.com/maps/api/js?sensor=false','','',true);  
	    //wp_enqueue_script('app', get_template_directory_uri().'/js/gsite-map.js','','',true);  
	    wp_enqueue_script('app', get_template_directory_uri().'/js/app.js','','',true);  
		wp_localize_script( 'app', 'myajax', 
		array(
			'url' => admin_url('admin-ajax.php')
		));
	    wp_enqueue_script('main', get_template_directory_uri().'/js/main.js','','',true); 
		
	}
}

add_action('wp_print_styles', 'add_styles'); // приклеем ф-ю на добавление стилей в хедер
if (!function_exists('add_styles')) { // если ф-я уже есть в дочерней теме - нам не надо её определять
	function add_styles() { // добавление стилей
	    if(is_admin()) return false; // если мы в админке - ничего не делаем
	    wp_enqueue_style( 'libs', get_template_directory_uri().'/css/libs.css' ); 
	    wp_enqueue_style( 'style', get_template_directory_uri().'/css/style.css' ); 
		wp_enqueue_style( 'main', get_template_directory_uri().'/style.css' ); // основные стили шаблона
	}
}

if (!class_exists('bootstrap_menu')) {
	class bootstrap_menu extends Walker_Nav_Menu { // внутри вывод 
		private $open_submenu_on_hover; // параметр который будет определять раскрывать субменю при наведении или оставить по клику как в стандартном бутстрапе

		function __construct($open_submenu_on_hover = true) { // в конструкторе
	        $this->open_submenu_on_hover = $open_submenu_on_hover; // запишем параметр раскрывания субменю
	    }

		function start_lvl(&$output, $depth = 0, $args = array()) { // старт вывода подменюшек
			$output .= "\n<ul class=\"dropdown-menu\">\n"; // ул с классом
		}
		function start_el(&$output, $item, $depth = 0, $args = array(), $id = 0) { // старт вывода элементов
			$item_html = ''; // то что будет добавлять
			parent::start_el($item_html, $item, $depth, $args); // вызываем стандартный метод родителя
			if ( $item->is_dropdown && $depth === 0 ) { // если элемент содержит подменю и это элемент первого уровня
			   if (!$this->open_submenu_on_hover) $item_html = str_replace('<a', '<a class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"', $item_html); // если подменю не будет раскрывать при наведении надо добавить стандартные атрибуты бутстрапа для раскрытия по клику
			   $item_html = str_replace('</a>', ' <b class="caret"></b></a>', $item_html); // ну это стрелочка вниз
			}
			$output .= $item_html; // приклеиваем теперь
		}
		function display_element($element, &$children_elements, $max_depth, $depth = 0, $args, &$output) { // вывод элемента
			if ( $element->current ) $element->classes[] = 'active'; // если элемент активный надо добавить бутстрап класс для подсветки
			$element->is_dropdown = !empty( $children_elements[$element->ID] ); // если у элемента подменю
			if ( $element->is_dropdown ) { // если да
			    if ( $depth === 0 ) { // если li содержит субменю 1 уровня
			        $element->classes[] = 'dropdown'; // то добавим этот класс
			        if ($this->open_submenu_on_hover) $element->classes[] = 'show-on-hover'; // если нужно показывать субменю по хуверу
			    } elseif ( $depth === 1 ) { // если li содержит субменю 2 уровня
			        $element->classes[] = 'dropdown-submenu'; // то добавим этот класс, стандартный бутстрап не поддерживает подменю больше 2 уровня по этому эту ситуацию надо будет разрешать отдельно
			    }
			}
			parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output); // вызываем стандартный метод родителя
		}
	}
}

if (!function_exists('content_class_by_sidebar')) { // если ф-я уже есть в дочерней теме - нам не надо её определять
	function content_class_by_sidebar() { // функция для вывода класса в зависимости от существования виджетов в сайдбаре
		if (is_active_sidebar( 'sidebar' )) { // если есть
			echo 'col-sm-9'; // пишем класс на 80% ширины
		} else { // если нет
			echo 'col-sm-12'; // контент на всю ширину
		}
	}
}



//редактор в категории и метки 
remove_filter( 'pre_term_description', 'wp_filter_kses' );
remove_filter( 'term_description', 'wp_kses_data' );
 
function mayak_category_description($container = ''){
    $content = is_object($container) && isset($container->description) ? html_entity_decode($container->description) : '';
    $editor_id = 'tag_description';
    $settings = 'description';     
    ?>
    <tr class="form-field">
    <th scope="row" valign="top"><label for="description">Описание</label></th>
    <td><?php wp_editor($content, $editor_id, array(
                'textarea_name' => $settings,
                'editor_css' => '<style> .html-active .wp-editor-area{border:0;}</style>',
    )); ?><br />
    <span class="description">Описание по умолчанию не отображается, однако некоторые темы могут его показывать.</span></td>
    </tr>
    <?php   
}
add_filter('edit_category_form_fields', 'mayak_category_description');
add_filter('edit_tag_form_fields', 'mayak_category_description');

function mayak_remove_category_description(){
	if(isset($mk_description->id)){
		if ( $mk_description->id == 'edit-category' or 'edit-tag' ){
		?>
			<script type="text/javascript">
			jQuery(function($) {
			$('textarea#description').closest('tr.form-field').remove();
			});
			</script>
		<?php
		}
	}
}
add_action('admin_head', 'mayak_remove_category_description');



//для вывода картинок на странице редактирования категорий
add_action( 'category_edit_form_fields', 'mayak_update_category_image' , 10, 2 );
function mayak_update_category_image ( $term, $taxonomy ) {
?>
   <style>
   img{border:3px solid #ccc;}
   .term-group-wrap p{float:left;}
   .term-group-wrap input{font-size:18px;font-weight:bold;width:40px;}
   #bitton_images{font-size:18px;}
   #bitton_images_remove{font-size:18px;margin:5px 5px 0 0;}
   </style>
   <tr class="form-field term-group-wrap">
     <th scope="row">
       <label for="id-cat-images">Изображение</label>
     </th>
     <td>
       <p><input type="button" class="button bitton_images" id="bitton_images" name="bitton_images" value="+" /></br>
       <input type="button" class="button bitton_images_remove" id="bitton_images_remove" name="bitton_images_remove" value="&ndash;" /></p>
       <?php $id_images = get_term_meta ( $term -> term_id, 'id-cat-images', true ); ?>
       <input type="hidden" id="id-cat-images" name="id-cat-images" value="<?php echo $id_images; ?>">
       <div id="cat-image-miniature">
         <?php if (empty($id_images )) { ?>
         <img src="<?php echo get_template_directory_uri();?>/img/wp.png" alt="Zaglushka" width="84" height="89"/>
         <?php } else {?>
           <?php echo wp_get_attachment_image ( $id_images, 'thumbnail' ); ?>
         <?php } ?>
       </div>
     </td>
   </tr>
<?php
}

//Выводим загрузчик изображений WordPress
if(preg_match("#tag_ID=([0-9.]+)#", $_SERVER['SERVER_NAME'] . $_SERVER['REQUEST_URI']))
add_action( 'admin_footer', 'mayak_loader'  );
function mayak_loader() { ?>
   <script>
     jQuery(document).ready( function($) {
       function mayak_image_upload(button_class) {
         var mm = true,
         _orig_send_attachment = wp.media.editor.send.attachment;
         $('body').on('click', button_class, function(e) {
           var mb = '#'+$(this).attr('id');
           var mt = $(mb);
           mm = true;

           wp.media.editor.send.attachment = function(props, attachment){
             if (mm) {
               $('#id-cat-images').val(attachment.id);
               $('#cat-image-miniature').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
               $('#cat-image-miniature .custom_media_image') . attr('src',attachment.sizes.thumbnail.url) . css('display','block');
             } else {
               return _orig_send_attachment.apply( mb, [props, attachment] );
             }
            }
         wp.media.editor.open(mt);
         return false;
       });
     }
     mayak_image_upload('.bitton_images.button');
     $('body') .on('click',' .bitton_images_remove',function(){
       $('#id-cat-images').val('');
       $('#cat-image-miniature').html('<img class="custom_media_image" src="" style="margin:0;padding:0;max-height:100px;float:none;" />');
     });
     $(document).ajaxComplete(function(event, xhr, settings) {
       var mk = settings.data.split('&');
       if( $.inArray('action=add-tag', mk) !== -1 ){
         var mh = xhr.responseXML;
         $mr = $(mh).find('term_id').text();
         if($mr!=""){
           $('#cat-image-miniature').html('');
         }
       }
     });
   });
</script>
<?php }

//Сохранение данных в таблице wp_termmeta
add_action( 'edited_category','mayak_updated_category_image' , 10, 2 );
function mayak_updated_category_image ( $term_id, $tt_id ) {
   if( isset( $_POST['id-cat-images'] ) && '' !== $_POST['id-cat-images'] ){
     $image = $_POST['id-cat-images'];
     update_term_meta ( $term_id, 'id-cat-images', $image );
   } else {
     update_term_meta ( $term_id, 'id-cat-images', '' );
   }
}

//Вывод подрубрик с миниатюрами в карусель
function mayak_cats_images($parent, $class = ''){
$ags = array(
'taxonomy'=>'category',
'parent' => $parent,
'meta_query' => array(array('key' => 'id-cat-images',)),
);
$terms = get_terms($ags);
 $count = count($terms);
 if($count > 0){
     foreach ($terms as $term) {
     $term_taxonomy_id = $term->term_taxonomy_id;
     $image_id = get_term_meta ( $term_taxonomy_id, 'id-cat-images', true );
       echo '<a href="' .get_category_link($term_taxonomy_id).'" class="carousel-item '.$class.'">
                <div class="carousel-item__img">
                    ' .wp_get_attachment_image ( $image_id, 'sel' ). '
                    <span class="btn">Подробнее</span>
                </div>
                <div class="carousel-item__text">
                    <div class="h3">'. $term->name.'</div>
                    <p>'. $term->description.'</p>
                </div>
            </a>';
     }
 }
}

//вывод постов из категории
function records_cats($cat, $args=array()){
	 $args=array(
	 'category_name'=> $cat,
	 'posts_per_page'=> -1,  //количество выводимых ячеек
	 'orderby'=>'rand', // в случайном порядке
	 'ignore_sticky_posts'=>1); //исключаем одинаковые записи
	 $my_query = new wp_query($args);
	 if( $my_query->have_posts() ) {
		 while ($my_query->have_posts()) {
			 $my_query->the_post();
			?>
			<div class="col-xs-12 col-sm-6 col-md-4">
				<a href="<?php the_permalink() ?>" class="quest-item">
					<div class="quest-item__img">
						<?php the_post_thumbnail('plan'); ?>
					</div>
				</a>
			</div>
			<?php
		}
	}
	wp_reset_query();
}

//элементы выпадающего списка для фильтра
function dropdown_list($description){
	if( $terms = wp_get_post_terms( get_the_ID(), 'post_tag', array(
			'description__like'  => $description,  
			'orderby'     => 'name',
			'order'       => 'ASC'
		) ) ) : 
		foreach ($terms as $term) :
			echo '<option value="' . $term->term_id . '">' . $term->name . '</option>'; // в качестве value я взял ID рубрики
		endforeach;
	endif;
}

/**
 * Хлебные крошки для WordPress (breadcrumbs)
 *
 * @param  string [$sep  = '']      Разделитель. По умолчанию ' » '
 * @param  array  [$l10n = array()] Для локализации. См. переменную $default_l10n.
 * @param  array  [$args = array()] Опции. См. переменную $def_args
 * @return string Выводит на экран HTML код
 *
 * version 3.3.2
 */
function kama_breadcrumbs( $sep = ' » ', $l10n = array(), $args = array() ){
	$kb = new Kama_Breadcrumbs;
	echo $kb->get_crumbs( $sep, $l10n, $args );
}

class Kama_Breadcrumbs {

	public $arg;

	// Локализация
	static $l10n = array(
		'home'       => 'Главная',
		'paged'      => 'Страница %d',
		'_404'       => 'Ошибка 404',
		'search'     => 'Результаты поиска по запросу - <b>%s</b>',
		'author'     => 'Архив автора: <b>%s</b>',
		'year'       => 'Архив за <b>%d</b> год',
		'month'      => 'Архив за: <b>%s</b>',
		'day'        => '',
		'attachment' => 'Медиа: %s',
		'tag'        => 'Записи по метке: <b>%s</b>',
		'tax_tag'    => '%1$s из "%2$s" по тегу: <b>%3$s</b>',
		// tax_tag выведет: 'тип_записи из "название_таксы" по тегу: имя_термина'.
		// Если нужны отдельные холдеры, например только имя термина, пишем так: 'записи по тегу: %3$s'
	);

	// Параметры по умолчанию
	static $args = array(
		'on_front_page'   => true,  // выводить крошки на главной странице
		'show_post_title' => true,  // показывать ли название записи в конце (последний элемент). Для записей, страниц, вложений
		'show_term_title' => true,  // показывать ли название элемента таксономии в конце (последний элемент). Для меток, рубрик и других такс
		'title_patt'      => '<span class="kb_title">%s</span>', // шаблон для последнего заголовка. Если включено: show_post_title или show_term_title
		'last_sep'        => true,  // показывать последний разделитель, когда заголовок в конце не отображается
		'markup'          => 'schema.org', // 'markup' - микроразметка. Может быть: 'rdf.data-vocabulary.org', 'schema.org', '' - без микроразметки
										   // или можно указать свой массив разметки:
										   // array( 'wrappatt'=>'<div class="kama_breadcrumbs">%s</div>', 'linkpatt'=>'<a href="%s">%s</a>', 'sep_after'=>'', )
		'priority_tax'    => array('category'), // приоритетные таксономии, нужно когда запись в нескольких таксах
		'priority_terms'  => array(), // 'priority_terms' - приоритетные элементы таксономий, когда запись находится в нескольких элементах одной таксы одновременно.
									  // Например: array( 'category'=>array(45,'term_name'), 'tax_name'=>array(1,2,'name') )
									  // 'category' - такса для которой указываются приор. элементы: 45 - ID термина и 'term_name' - ярлык.
									  // порядок 45 и 'term_name' имеет значение: чем раньше тем важнее. Все указанные термины важнее неуказанных...
		'nofollow' => false, // добавлять rel=nofollow к ссылкам?

		// служебные
		'sep'             => '',
		'linkpatt'        => '',
		'pg_end'          => '',
	);

	function get_crumbs( $sep, $l10n, $args ){
		global $post, $wp_query, $wp_post_types;

		self::$args['sep'] = $sep;

		// Фильтрует дефолты и сливает
		$loc = (object) array_merge( apply_filters('kama_breadcrumbs_default_loc', self::$l10n ), $l10n );
		$arg = (object) array_merge( apply_filters('kama_breadcrumbs_default_args', self::$args ), $args );

		$arg->sep = '<span class="kb_sep">'. $arg->sep .'</span>'; // дополним

		// упростим
		$sep = & $arg->sep;
		$this->arg = & $arg;

		// микроразметка ---
		if(1){
			$mark = & $arg->markup;

			// Разметка по умолчанию
			if( ! $mark ) $mark = array(
				'wrappatt'  => '<div class="kama_breadcrumbs">%s</div>',
				'linkpatt'  => '<a href="%s">%s</a>',
				'sep_after' => '',
			);
			// rdf
			elseif( $mark === 'rdf.data-vocabulary.org' ) $mark = array(
				'wrappatt'   => '<div class="kama_breadcrumbs" prefix="v: http://rdf.data-vocabulary.org/#">%s</div>',
				'linkpatt'   => '<span typeof="v:Breadcrumb"><a href="%s" rel="v:url" property="v:title">%s</a>',
				'sep_after'  => '</span>', // закрываем span после разделителя!
			);
			// schema.org
			elseif( $mark === 'schema.org' ) $mark = array(
				'wrappatt'   => '<div class="kama_breadcrumbs" itemscope itemtype="http://schema.org/BreadcrumbList">%s</div>',
				'linkpatt'   => '<span itemprop="itemListElement" itemscope itemtype="http://schema.org/ListItem"><a href="%s" itemprop="item"><span itemprop="name">%s</span></a></span>',
				'sep_after'  => '',
			);

			elseif( ! is_array($mark) )
				die( __CLASS__ .': "markup" parameter must be array...');

			$wrappatt  = $mark['wrappatt'];
			$arg->linkpatt  = $arg->nofollow ? str_replace('<a ','<a rel="nofollow"', $mark['linkpatt']) : $mark['linkpatt'];
			$arg->sep      .= $mark['sep_after']."\n";
		}

		$linkpatt = $arg->linkpatt; // упростим

		$q_obj = get_queried_object();

		// может это архив пустой таксы?
		$ptype = null;
		if( empty($post) ){
			if( isset($q_obj->taxonomy) )
				$ptype = & $wp_post_types[ get_taxonomy($q_obj->taxonomy)->object_type[0] ];
		}
		else $ptype = & $wp_post_types[ $post->post_type ];

		// paged
		$arg->pg_end = '';
		if( ($paged_num = get_query_var('paged')) || ($paged_num = get_query_var('page')) )
			$arg->pg_end = $sep . sprintf( $loc->paged, (int) $paged_num );

		$pg_end = $arg->pg_end; // упростим

		$out = '';

		if( is_front_page() ){
			return $arg->on_front_page ? sprintf( $wrappatt, ( $paged_num ? sprintf($linkpatt, get_home_url(), $loc->home) . $pg_end : $loc->home ) ) : '';
		}
		// страница записей, когда для главной установлена отдельная страница.
		elseif( is_home() ) {
			$out = $paged_num ? ( sprintf( $linkpatt, get_permalink($q_obj), esc_html($q_obj->post_title) ) . $pg_end ) : esc_html($q_obj->post_title);
		}
		elseif( is_404() ){
			$out = $loc->_404;
		}
		elseif( is_search() ){
			$out = sprintf( $loc->search, esc_html( $GLOBALS['s'] ) );
		}
		elseif( is_author() ){
			$tit = sprintf( $loc->author, esc_html($q_obj->display_name) );
			$out = ( $paged_num ? sprintf( $linkpatt, get_author_posts_url( $q_obj->ID, $q_obj->user_nicename ) . $pg_end, $tit ) : $tit );
		}
		elseif( is_year() || is_month() || is_day() ){
			$y_url  = get_year_link( $year = get_the_time('Y') );

			if( is_year() ){
				$tit = sprintf( $loc->year, $year );
				$out = ( $paged_num ? sprintf($linkpatt, $y_url, $tit) . $pg_end : $tit );
			}
			// month day
			else {
				$y_link = sprintf( $linkpatt, $y_url, $year);
				$m_url  = get_month_link( $year, get_the_time('m') );

				if( is_month() ){
					$tit = sprintf( $loc->month, get_the_time('F') );
					$out = $y_link . $sep . ( $paged_num ? sprintf( $linkpatt, $m_url, $tit ) . $pg_end : $tit );
				}
				elseif( is_day() ){
					$m_link = sprintf( $linkpatt, $m_url, get_the_time('F'));
					$out = $y_link . $sep . $m_link . $sep . get_the_time('l');
				}
			}
		}
		// Древовидные записи
		elseif( is_singular() && $ptype->hierarchical ){
			$out = $this->_add_title( $this->_page_crumbs($post), $post );
		}
		// Таксы, плоские записи и вложения
		else {
			$term = $q_obj; // таксономии

			// определяем термин для записей (включая вложения attachments)
			if( is_singular() ){
				// изменим $post, чтобы определить термин родителя вложения
				if( is_attachment() && $post->post_parent ){
					$save_post = $post; // сохраним
					$post = get_post($post->post_parent);
				}

				// учитывает если вложения прикрепляются к таксам древовидным - все бывает :)
				$taxonomies = get_object_taxonomies( $post->post_type );
				// оставим только древовидные и публичные, мало ли...
				$taxonomies = array_intersect( $taxonomies, get_taxonomies( array('hierarchical' => true, 'public' => true) ) );

				if( $taxonomies ){
					// сортируем по приоритету
					if( ! empty($arg->priority_tax) ){
						usort( $taxonomies, function($a,$b)use($arg){
							$a_index = array_search($a, $arg->priority_tax);
							if( $a_index === false ) $a_index = 9999999;

							$b_index = array_search($b, $arg->priority_tax);
							if( $b_index === false ) $b_index = 9999999;

							return ( $b_index === $a_index ) ? 0 : ( $b_index < $a_index ? 1 : -1 ); // меньше индекс - выше
						} );
					}

					// пробуем получить термины, в порядке приоритета такс
					foreach( $taxonomies as $taxname ){
						if( $terms = get_the_terms( $post->ID, $taxname ) ){
							// проверим приоритетные термины для таксы
							$prior_terms = & $arg->priority_terms[ $taxname ];
							if( $prior_terms && count($terms) > 2 ){
								foreach( (array) $prior_terms as $term_id ){
									$filter_field = is_numeric($term_id) ? 'term_id' : 'slug';
									$_terms = wp_list_filter( $terms, array($filter_field=>$term_id) );

									if( $_terms ){
										$term = array_shift( $_terms );
										break;
									}
								}
							}
							else
								$term = array_shift( $terms );

							break;
						}
					}
				}

				if( isset($save_post) ) $post = $save_post; // вернем обратно (для вложений)
			}

			// вывод

			// все виды записей с терминами или термины
			if( $term && isset($term->term_id) ){
				$term = apply_filters('kama_breadcrumbs_term', $term );

				// attachment
				if( is_attachment() ){
					if( ! $post->post_parent )
						$out = sprintf( $loc->attachment, esc_html($post->post_title) );
					else {
						if( ! $out = apply_filters('attachment_tax_crumbs', '', $term, $this ) ){
							$_crumbs    = $this->_tax_crumbs( $term, 'self' );
							$parent_tit = sprintf( $linkpatt, get_permalink($post->post_parent), get_the_title($post->post_parent) );
							$_out = implode( $sep, array($_crumbs, $parent_tit) );
							$out = $this->_add_title( $_out, $post );
						}
					}
				}
				// single
				elseif( is_single() ){
					if( ! $out = apply_filters('post_tax_crumbs', '', $term, $this ) ){
						$_crumbs = $this->_tax_crumbs( $term, 'self' );
						$out = $this->_add_title( $_crumbs, $post );
					}
				}
				// не древовидная такса (метки)
				elseif( ! is_taxonomy_hierarchical($term->taxonomy) ){
					// метка
					if( is_tag() )
						$out = $this->_add_title('', $term, sprintf( $loc->tag, esc_html($term->name) ) );
					// такса
					elseif( is_tax() ){
						$post_label = $ptype->labels->name;
						$tax_label = $GLOBALS['wp_taxonomies'][ $term->taxonomy ]->labels->name;
						$out = $this->_add_title('', $term, sprintf( $loc->tax_tag, $post_label, $tax_label, esc_html($term->name) ) );
					}
				}
				// древовидная такса (рибрики)
				else {
					if( ! $out = apply_filters('term_tax_crumbs', '', $term, $this ) ){
						$_crumbs = $this->_tax_crumbs( $term, 'parent' );
						$out = $this->_add_title( $_crumbs, $term, esc_html($term->name) );                     
					}
				}
			}
			// влоежния от записи без терминов
			elseif( is_attachment() ){
				$parent = get_post($post->post_parent);
				$parent_link = sprintf( $linkpatt, get_permalink($parent), esc_html($parent->post_title) );
				$_out = $parent_link;

				// вложение от записи древовидного типа записи
				if( is_post_type_hierarchical($parent->post_type) ){
					$parent_crumbs = $this->_page_crumbs($parent);
					$_out = implode( $sep, array( $parent_crumbs, $parent_link ) );
				}

				$out = $this->_add_title( $_out, $post );
			}
			// записи без терминов
			elseif( is_singular() ){
				$out = $this->_add_title( '', $post );
			}
		}

		// замена ссылки на архивную страницу для типа записи
		$home_after = apply_filters('kama_breadcrumbs_home_after', '', $linkpatt, $sep, $ptype );

		if( '' === $home_after ){
			// Ссылка на архивную страницу типа записи для: отдельных страниц этого типа; архивов этого типа; таксономий связанных с этим типом.
			if( $ptype && $ptype->has_archive && ! in_array( $ptype->name, array('post','page','attachment') )
				&& ( is_post_type_archive() || is_singular() || (is_tax() && in_array($term->taxonomy, $ptype->taxonomies)) )
			){
				$pt_title = $ptype->labels->name;

				// первая страница архива типа записи
				if( is_post_type_archive() && ! $paged_num )
					$home_after = sprintf( $this->arg->title_patt, $pt_title );
				// singular, paged post_type_archive, tax
				else{
					$home_after = sprintf( $linkpatt, get_post_type_archive_link($ptype->name), $pt_title );

					$home_after .= ( ($paged_num && ! is_tax()) ? $pg_end : $sep ); // пагинация
				}
			}
		}

		$before_out = sprintf( $linkpatt, home_url(), $loc->home ) . ( $home_after ? $sep.$home_after : ($out ? $sep : '') );

		$out = apply_filters('kama_breadcrumbs_pre_out', $out, $sep, $loc, $arg );

		$out = sprintf( $wrappatt, $before_out . $out );

		return apply_filters('kama_breadcrumbs', $out, $sep, $loc, $arg );
	}

	function _page_crumbs( $post ){
		$parent = $post->post_parent;

		$crumbs = array();
		while( $parent ){
			$page = get_post( $parent );
			$crumbs[] = sprintf( $this->arg->linkpatt, get_permalink($page), esc_html($page->post_title) );
			$parent = $page->post_parent;
		}

		return implode( $this->arg->sep, array_reverse($crumbs) );
	}

	function _tax_crumbs( $term, $start_from = 'self' ){
		$termlinks = array();
		$term_id = ($start_from === 'parent') ? $term->parent : $term->term_id;
		while( $term_id ){
			$term       = get_term( $term_id, $term->taxonomy );
			$termlinks[] = sprintf( $this->arg->linkpatt, get_term_link($term), esc_html($term->name) );
			$term_id    = $term->parent;
		}

		if( $termlinks )
			return implode( $this->arg->sep, array_reverse($termlinks) ) /*. $this->arg->sep*/;
		return '';
	}

	// добалвяет заголовок к переданному тексту, с учетом всех опций. Добавляет разделитель в начало, если надо.
	function _add_title( $add_to, $obj, $term_title = '' ){
		$arg = & $this->arg; // упростим...
		$title = $term_title ? $term_title : esc_html($obj->post_title); // $term_title чиститься отдельно, теги моугт быть...
		$show_title = $term_title ? $arg->show_term_title : $arg->show_post_title;

		// пагинация
		if( $arg->pg_end ){
			$link = $term_title ? get_term_link($obj) : get_permalink($obj);
			$add_to .= ($add_to ? $arg->sep : '') . sprintf( $arg->linkpatt, $link, $title ) . $arg->pg_end;
		}
		// дополняем - ставим sep
		elseif( $add_to ){
			if( $show_title )
				$add_to .= $arg->sep . sprintf( $arg->title_patt, $title );
			elseif( $arg->last_sep )
				$add_to .= $arg->sep;
		}
		// sep будет потом...
		elseif( $show_title )
			$add_to = sprintf( $arg->title_patt, $title );

		return $add_to;
	}

}

/**
 * Изменения:
 * 3.3 - новые хуки: attachment_tax_crumbs, post_tax_crumbs, term_tax_crumbs. Позволяют дополнить крошки таксономий.
 * 3.2 - баг с разделителем, с отключенным 'show_term_title'. Стабилизировал логику.
 * 3.1 - баг с esc_html() для заголовка терминов - с тегами получалось криво...
 * 3.0 - Обернул в класс. Добавил опции: 'title_patt', 'last_sep'. Доработал код. Добавил пагинацию для постов.
 * 2.5 - ADD: Опция 'show_term_title'
 * 2.4 - Мелкие правки кода
 * 2.3 - ADD: Страница записей, когда для главной установлена отделенная страница.
 * 2.2 - ADD: Link to post type archive on taxonomies page
 * 2.1 - ADD: $sep, $loc, $args params to hooks
 * 2.0 - ADD: в фильтр 'kama_breadcrumbs_home_after' добавлен четвертый аргумент $ptype
 * 1.9 - ADD: фильтр 'kama_breadcrumbs_default_loc' для изменения локализации по умолчанию
 * 1.8 - FIX: заметки, когда в рубрике нет записей
 * 1.7 - Улучшена работа с приоритетными таксономиями.
 */
 
 function true_filter_function(){
	$cat = 'quests';
	$args = array(
		'orderby' => 'date', // сортировка по дате у нас будет в любом случае (но вы можете 
	);
 
	// для таксономий
	//if( isset( $_POST['categoryfilter'] )
		$args['tax_query'] = array(
			array(
				'taxonomy' => 'post_tag',
				'field' => 'id',
				'terms' => array($_POST['dif'],$_POST['type'],$_POST['age'],$_POST['col'])
			)
		);
 
	records_cats($cat, $args=array());
 
	die();
}
add_action('wp_ajax_myfilter', 'true_filter_function'); 
add_action('wp_ajax_nopriv_myfilter', 'true_filter_function');

add_theme_support( 'custom-logo', [
	'height'      => 87,
	'width'       => 172,
	'flex-width'  => false,
	'flex-height' => false,
	'header-text' => '',
] );

// Добавляем поля для всех пользователей
add_action( 'comment_form_logged_in_after', 'extend_comment_custom_fields' );
add_action( 'comment_form_after_fields', 'extend_comment_custom_fields' );
function extend_comment_custom_fields() {

	echo '<p class="comment-form-title">'.
			  '<label for="title">' . __( 'Comment Title' ) . '</label>'.
			  '<input id="title" name="title_comment" type="text" size="30"/></p>';
}


add_action( 'comment_post', 'save_extend_comment_meta_data' );
function save_extend_comment_meta_data( $comment_id ){

	if( !empty( $_POST['title_comment'] ) ){
		$title = sanitize_text_field($_POST['title_comment']);
		add_comment_meta( $comment_id, 'title', $title );
	}

}

function my_comments_callback( $comment, $args, $depth ) {
    $GLOBALS['comment'] = $comment;
    ?>
    
<div class="col-md-6">
    <div class="review-item">
    <div class='h5'><?php echo get_comment_meta( get_comment_ID(), 'title', true );?></div>
    <?php comment_text(); ?>
    
    </div>
</div>
    <?php
}

//calc
add_action( 'edit_form_after_title', 'post_edit_form_after_editor');
function post_edit_form_after_editor( $post = 0 ) {

$id = $post->ID;

$calc_options = Calc::getCalcOption($id);

$calc_block = Calc::getCalcBlock();

	// Для записей
	if ( $post->post_type === 'post'){?>
		<div id="calc_<?php echo $post->ID; ?>" class='calc'>
						<h4>Калькулятор</h4>
						<?php 
							$checked = (get_post_meta($post->ID, 'calc_check', 1)==1) ? 'checked' : '';
							$title_calc = (get_post_meta($post->ID, 'calc_check', 1)==1) ? 'Выключить калькулятор для этой страницы' : 'Включить калькулятор для этой страницы';
						?>
							
						<input type="checkbox" id="calc_check" name="extra[calc_check]" data-toggle="toggle" data-style="ios" value="1" <?php checked( get_post_meta($post->ID, 'calc_check', 1), 1 )?> /> 
		
						<span id="calc_check_title" class="title"><?php echo $title_calc;?></span>
						<div id="<?php echo $post->ID;?>" class="calc_option" <?php if($checked == '') echo 'style="display:none;"';?> >
						<!-- <div class="calc_block">
								<span class="title">Блоки калькулятора</span>
							</div> -->
							<div class="calc_param">

								<br/>
								
									<!-- Кнопка пуска модальное окно -->  
									<button type="button" class="btn btn-primary btn-lg" data-toggle="modal" data-target="#myModal_option">
									  Добавить опцию
									</button>
								<?php if($calc_options){ ?>
									<table   id='tbl' class="table-bordered table-striped table" <?php if(!$calc_options) echo 'style="display:none;"';?> >
										<tr>
											<th>Опция</th>
											<th>Блок</th>
											<th>Цена</th>
											<th>Редактировать опцию</th>
											<th>Редактировать параметры</th>
											<th></th>
										</tr>
										<tbody class="sortable-table">
										<?php 
										
										foreach ($calc_options as $op): 
		$optionsString = json_encode($op);									?>
										
											<tr class="tr-opt" data-id-option="<?php echo $op['id']; ?>" data-options='<?php echo $optionsString;?>' >
												<input type="hidden" name="sort[]" value="<?php echo $op['id']; ?>">

												<td class="name"><?php echo $op['name']; ?></td>
												<td class="block"><?php echo $op['block']; ?></td>
												<td class="price"><?php echo $op['price']; ?></td>
						
												<td><a class="up-option" href="#" title="Редактировать опцию" data-toggle="modal" data-target="#myModal_option" ><i class="fa fa-pencil-square-o"></i></a></td>
												<td>
												<?php if($op['block_id']==1){?>
												<a class="up-param"  href="#" title="Редактировать параметры"  data-toggle="modal" data-target="#myModal_param"><i class="fa fa-pencil-square-o"></i></a>
												<?php }?>
												</td>
												<td><a href="#" title="Удалить" onclick="calc_op_del('<?php echo $op['id']; ?>')"><i class="fa fa-times"></i></a></td>
											</tr>
										<?php endforeach; ?>
										</tbody>
									</table>
								<?php }else{?>
								<div>
									<span>Копировать опции из: </span>
									<select data-id="<?php echo $id;?>" id = 'calc_copy' name="calc_copy" >
										<option>Выберите опцию</option>
										<?php foreach ($products as $product): ?>
										<option value="<?php echo $product['id']; ?>"><?php echo $product['url'].' *** '.$product['title']; ?></option>
										<?php endforeach; ?>
									</select>
								</div>
								<?php } ?>
							</div>

						</div>
					</div>
	<?php 
	}

// включаем обновление полей при сохранении
add_action('save_post', 'my_extra_fields_update', 0);

/* Сохраняем данные, при сохранении поста */
function my_extra_fields_update( $post_id ){
	// базовая проверка
	if (
		   empty( $_POST['calc_check'] )
		|| ! wp_verify_nonce( $_POST['extra_fields_nonce'], __FILE__ )
		|| wp_is_post_autosave( $post_id )
		|| wp_is_post_revision( $post_id )
	)
		return false;

	// Все ОК! Теперь, нужно сохранить/удалить данные
	$_POST['extra'] = array_map( 'sanitize_text_field', $_POST['extra'] );
	foreach( $_POST['extra'] as $key => $value ){
		if( empty($value) ){
			delete_post_meta( $post_id, $key ); // удаляем поле если значение пустое
			continue;
		}

		update_post_meta( $post_id, $key, $value ); // add_post_meta() работает автоматически
	}

	return $post_id;
}
}

function ic_enqueue() {
	
wp_enqueue_script( 'bootstrap_js',  'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js' );
	
wp_enqueue_script( 'calc_function',  get_template_directory_uri().'/js/calc_functions.js' );
wp_localize_script( 'calc_function', 'myajax', 
		array(
			'url' => admin_url('admin-ajax.php')
		)
	);  
wp_enqueue_style('bootstrap', get_template_directory_uri().'/css/bootstrap.min.css');
wp_enqueue_style('bootstrap-toggle', get_template_directory_uri().'/css/bootstrap-toggle.min.css');
wp_enqueue_style('awesome', get_template_directory_uri().'/css/font-awesome.min.css');

}
add_action( 'admin_enqueue_scripts', 'ic_enqueue' );

require get_template_directory() . '/calc/admin/Calc.php';
require get_template_directory() . '/calc/admin/calc_ajax.php';

add_action( 'admin_footer', 'action_function_name_1393' );
function action_function_name_1393( $data ){
	if(isset($_GET['post'])){
	    require get_template_directory() . '/calc/admin/modal.php';
	}
}
?>
