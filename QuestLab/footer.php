<?php
/**
 * Шаблон подвала (footer.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */
?>
	<div class="footer_placeholder"></div>
	<footer>
		<div class="container">
			<div class="row">
				<div class="col-md-12">
					<?php $args = array( // опции для вывода нижнего меню, чтобы они работали, меню должно быть создано в админке
						'theme_location' => 'bottom', // идентификатор меню, определен в register_nav_menus() в function.php
						'container'=> false, // обертка списка, false - это ничего
						'menu_class' => 'nav nav-pills bottom-menu', // класс для ul
				  		'menu_id' => 'bottom-nav', // id для ul
				  		'fallback_cb' => false
				  	);
					wp_nav_menu($args); // выводим нижние меню
					?>
				</div>
			</div>
		</div>
	</footer>
	<footer class="footer">
        <div class="container">
            <div class="footer__top">
                <div class="row">
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="f-nav">
							<?php $args = array( // опции для вывода нижнего меню, чтобы они работали, меню должно быть создано в админке
								'theme_location' => 'bottom', // идентификатор меню, определен в register_nav_menus() в function.php
								'container'=> false, // обертка списка, false - это ничего
								'menu_class' => 'nav nav-pills bottom-menu', // класс для ul
								'menu_id' => 'bottom-nav', // id для ul
								'fallback_cb' => false
							);
							wp_nav_menu($args); // выводим нижние меню
							?>
                            
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="f-address">
                            <span>
                                Приезжайте к нам:
                            </span>
                            <p>
                                г. Москва, ул. Проспект Мира, 26 стр.1 метро Проспект Мира
                            </p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="f-address">
                            <span>
                                Общайтесь с нами:
                            </span>
                            <p>
                                <a href="tel:89250089933">
                                    <i class="icon icon-phone"></i>
                                    <span>8(925)0089933</span>
                                </a>
                            </p>
                            <p>
                                <a href="mailto:quest@quest-lab.ru">
                                    <i class="icon icon-envelop"></i>
                                    <span>quest@quest-lab.ru</span>
                                </a>
                            </p>
                            <p>
                                <a href="https://api.whatsapp.com/send?phone=89250089933">
                                    <i class="icon icon-whatsapp"></i>
                                    <span>WhatsApp</span>
                                </a>
                            </p>
                        </div>
                    </div>
                    <div class="col-xs-12 col-sm-6 col-md-3">
                        <div class="f-address">
                            <a href="#">
                                Ежедневно:
                            </a>
                           <p>
                               с 9 до 20 ч.
                           </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="footer__center">
                <div class="row">
                    <div class="col-md-12 col-lg-8">
                        <form name="footerNewsletter" class="footer__subscribe">
                            <label class="footer__newsletter-label" for="newsletter-email">Подписаться на новости :</label>
                            <div class="form-group">
                                <input class="footer__newsletter-input is-invalid" type="email" autocomplete="email" id="newsletter-email" placeholder="Email" required="required" />
                                <div class="error"></div>
                                <button class="footer__newsletter-submit btn" type="submit">Подписаться</button>
                            </div>
    
                        </form>
                    </div>
                    <div class="col-md-12 col-lg-4">
                        <ul class="footer__social-items">
                            <li class="footer__social-item">
                                <a href="#" target="_blank">
                                    <svg class="icon--fbook">
                                        <use xlink:href="img/icons.svg#ico-facebook"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="footer__social-item">
                                <a href="#" target="_blank">
                                    <svg class="icon--instagram">
                                        <use xlink:href="img/icons.svg#ico-instagram"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="footer__social-item">
                                <a href="#" target="_blank">
                                    <i class="icon-vk"></i>
                                </a>
                            </li>
                            <li class="footer__social-item">
                                <a href="#" target="_blank">
                                    <svg class="icon--youtube">
                                        <use xlink:href="img/icons.svg#ico-youtube"></use>
                                    </svg>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="footer__bottom">
                <div class="row">
                    <div class="col-md-12 col-lg-7">
                        <div class="fb-nav">
                            <ul>
                                <li>
                                    <a href="#">Site Index</a>
                                </li>
                                <li>
                                    <a href="#"> Terms and Conditions</a>
                                </li>
                                <li>
                                    <a href="#"> Privacy Policy</a>
                                </li>
                                <li>
                                    <a href="#">Contact Information</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-12 col-lg-5">
                        <div class="copyright text-right">
                            © 2000–2019 КВЕСТ Lab. Все права защищены.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </footer>
<?php wp_footer(); // необходимо для работы плагинов и функционала  ?>

<script src="/wp-content/themes/QuestLab/slick/slick.min.js" type="text/javascript" charset="utf-8"></script>
 <script type="text/javascript">  
      $(".center").slick({
        dots: false,
        infinite: true,
        centerMode: true,
        slidesToShow: 6,
        slidesToScroll: 3,
		  responsive: [{
            breakpoint: 1100,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            }
        }

    ]
      });
</script>
</body>
</html>