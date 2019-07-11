<?php
/**
 * Запись в цикле (loop.php)
 * @package WordPress
 * @subpackage your-clean-template-3
 */ 
?>
  <div class="queasts__col mix category-street category-7-9 category-10-12" data-order="1">
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
                                    <div class="quest-item__subtitle h2">
                                        <?php echo get_post_meta( get_the_ID(), 'второе_имя', true ); ?>
                                    </div>

                                    <div class="quest-item__description">
                                        <?php echo get_post_meta( get_the_ID(), 'описание_для_карточки', true ); ?>
                                    </div>
                                    <div class="quest-item__address">
                                        <p>
                                            <b> <?php echo get_post_meta( get_the_ID(), 'адрес', true ); ?></b>
                                        </p>
                                    </div>
                                </div>
                                <div class="quest-item__labels">
<?php 
$all_the_tags = get_the_tags();
if( $all_the_tags ){
	foreach($all_the_tags as $this_tag) {
		if ($this_tag->description == "где" ) {?>
		<div class="label label--type">
			<span>
				<img src="<?php echo get_template_directory_uri();?>/img/<?php echo $this_tag->name?>_white.png" class="img-white" alt="" />
				<img src="<?php echo get_template_directory_uri();?>/img/<?php echo $this_tag->name?>_black.png.png" class="img-black" alt="" />
				<?php echo $this_tag->name?>
			</span>
		</div>
		<?php
		} 
		else if ($this_tag->name == "someothertag" ) {
			echo '<p>ДРУГОЙ HTML КОД <img src="someotherimage.jpg"></p>';
		} 
	}
}
?>

                                    <div class="bottom-labels">

                                        <div class="label">
                                            <span>
                                                <img src="<?php echo get_template_directory_uri();?>/img/ic_2.png" class="img-white" alt="" />
                                                <img src="<?php echo get_template_directory_uri();?>/img/ic_2.png" class="img-black" alt="" />
                                                
<?php 
$all_the_tags = get_the_tags();
$age = '';
if( $all_the_tags ){
	foreach($all_the_tags as $this_tag) {
		if ($this_tag->description  == "возраст"  ) {
			$age .= $this_tag->name.', ';
		} 
	}
}
$age = trim($age);
echo $age;
?>
                                            </span>
                                        </div>
                                        <div class="label">
                                            <span>
                                                <img src="<?php echo get_template_directory_uri();?>/img/ic_3.png" class="img-white" alt="" />
                                                <img src="<?php echo get_template_directory_uri();?>/img/ic_3.png" class="img-black" alt="" />
                                                <?php echo get_post_meta( get_the_ID(), 'продолжительность', true ); ?>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    </div>