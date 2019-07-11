<?php
/**
 * Шаблон шапки (header.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); // вывод атрибутов языка ?>>
<head>
	<meta charset="<?php bloginfo( 'charset' ); // кодировка ?>">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
	<?php /* RSS и всякое */ ?>
	<link rel="alternate" type="application/rdf+xml" title="RDF mapping" href="<?php bloginfo('rdf_url'); ?>">
	<link rel="alternate" type="application/rss+xml" title="RSS" href="<?php bloginfo('rss_url'); ?>">
	<link rel="alternate" type="application/rss+xml" title="Comments RSS" href="<?php bloginfo('comments_rss2_url'); ?>">
	<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<style type="text/css">
.slider {width: 100%;margin: 40px auto;}
.slick-slide {margin: 0px 20px;}
.slick-slide img {width: 100%;}
.slick-prev:before,
.slick-next:before {color: black;}
.slick-slide {transition: all ease-in-out .3s;opacity: .2;}
.slick-active {opacity: .5;}
.slick-current {opacity: 1;}
</style>
<link rel="stylesheet" type="text/css" href="/wp-content/themes/QuestLab/slick/slick.css">
<link rel="stylesheet" type="text/css" href="/wp-content/themes/QuestLab/slick/slick-theme.css">


	<?php /* Все скрипты и стили теперь подключаются в functions.php */ ?>

	<!--[if lt IE 9]>
	<script src="//html5shiv.googlecode.com/svn/trunk/html5.js"></script>
	<![endif]-->

	<?php wp_head(); 
		$ppp = get_page_by_title('Contacts','OBJECT','post');
		$id = $ppp->ID;
	?>
</head>
<body <?php body_class(); // все классы для body ?>>
	<header class="header">
		<div class="container">
			<div class="header__logo">
                <div class="site-logo">
                    <a href="/">
					<?php the_custom_logo(  ); ?>
                    </a>
                </div>
            </div>
			<div class="header__right">
                <div class="header__top">
                    <a href="tel:<?php echo get_post_meta( $id, 'phone', true ); ?>">
                        <i class="icon icon-phone"></i>
                        <span><?php echo get_post_meta( $id, 'phone', true ); ?></span>
                    </a>
                    <span class="hsep"></span>
                    <a href="mailto:quest@quest-lab.ru">
                        <i class="icon icon-envelop"></i>
                        <span><?php echo get_post_meta( $id, 'mail', true ); ?></span>
                    </a>
                    <span class="hsep"></span>
                    <a href="https://api.whatsapp.com/send?phone=<?php echo get_post_meta( $id, 'whatsapp', true ); ?>">
                        <i class="icon icon-whatsapp"></i>
                        <span>WhatsApp</span>
                    </a>
                </div>
                <div class="header__bottom cfix">
                    <div class="header__search pull-right">
                        <a href="#" class="js-search-trigger">
                            <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                <path fill="currentColor" id="SearchIcon_desktop.svg" d="M1239.8,318.393a6.144,6.144,0,0,1-3.78-1.319L1231.09,322l-1.09-1.095,4.93-4.928a6.107,6.107,0,0,1-1.32-3.781A6.2,6.2,0,1,1,1239.8,318.393Zm0-10.844a4.648,4.648,0,1,0,4.65,4.648A4.646,4.646,0,0,0,1239.8,307.549Z" transform="translate(-1230 -306)"></path>
                            </svg>
                            <span class="header__search-label">Поиск</span>
                        </a>
                    </div>
                    <div class="header__menu">
                        <div class="menu-toggle" data-toggle="top-menu">
                            <span></span>
                        </div>
                        <div class="top-menu" data-toggle="top-menu">
                            <?php $args = array( // опции для вывода верхнего меню, чтобы они работали, меню должно быть создано в админке
								'theme_location' => 'top', // идентификатор меню, определен в register_nav_menus() в functions.php
								'container'=> false, // обертка списка, тут не нужна
						  		'menu_id' => 'top-nav-ul', // id для ul
						  		'items_wrap' => '<ul id="%1$s" class="nav navbar-nav %2$s">%3$s</ul>',
								'menu_class' => 'top-menu-ul', // класс для ul, первые 2 обязательны
						  		'walker' => new bootstrap_menu(true) // верхнее меню выводится по разметке бутсрапа, см класс в functions.php, если по наведению субменю не раскрывать то передайте false		  		
					  			);
								wp_nav_menu($args); // выводим верхнее меню
							?>
                        </div>
                    </div>
                </div>
                <div class="js-search search-block">
                    <form action="#" method="get">
                        <div class="search-block__inner">
                            <div class="form-group">
                                <input autocomplete="off" class="form-control" placeholder="Поиск" type="text" />
                            </div>
                            <button type="submit" class="button">
                                <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16">
                                    <path fill="currentColor" d="M1239.8,318.393a6.144,6.144,0,0,1-3.78-1.319L1231.09,322l-1.09-1.095,4.93-4.928a6.107,6.107,0,0,1-1.32-3.781A6.2,6.2,0,1,1,1239.8,318.393Zm0-10.844a4.648,4.648,0,1,0,4.65,4.648A4.646,4.646,0,0,0,1239.8,307.549Z" transform="translate(-1230 -306)"></path>
                                </svg>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </header>