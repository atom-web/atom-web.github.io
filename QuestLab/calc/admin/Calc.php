<?php

class Calc
{

	public static function getCalcBlock()
    {
		global $wpdb;
		
		$results_arr = $wpdb->get_results( 'SELECT *  FROM `wp_calc_block` WHERE 1',  OBJECT_K  );
		
		$i = 0;
        $calc_blocks = array();
		foreach ($results_arr as $result) {
			$calc_blocks[$i]['id'] = $result->id;
			$calc_blocks[$i]['name'] = $result->name;
            $i++;
		}
		
        return $calc_blocks;
	}
	
	public static function getCalcOption($post_id)
    {
		global $wpdb;
		
		$results_arr = $wpdb->get_results( "SELECT c.*, b.name as block  FROM `wp_calc` c INNER JOIN wp_calc_block b  WHERE c.block_id = b.id AND c.post_id = $post_id order by sort"  );
		
		$i = 0;
        $calc = array();
		foreach ($results_arr as $result) {
			$calc[$i]['id'] = $result->id;
			$calc[$i]['post_id'] = $result->post_id;
            $calc[$i]['block_id'] = $result->block_id;
            $calc[$i]['name'] = $result->name;
            $calc[$i]['sort'] = $result->sort;
            $calc[$i]['price'] = $result->price;
            $calc[$i]['block'] = $result->block;
            $i++;
		}
		
        return $calc;
	}
	
	public static function addCalcOption($serialize)
    {
		global $wpdb;
		
		$result = $wpdb->query('INSERT INTO wp_calc '
                . '(`post_id`,`block_id`,`name`,`price`)'
                . 'VALUES '
                . '('.$serialize['post_id'].', '.$serialize['block_id'].', '.$serialize['name'].', '.$serialize['price'].')');

		return $result;
	}
	
	public static function updCalcSort($i,$row)
    {
		global $wpdb;
		
		$sort = $i++;
		$result = $wpdb->query("UPDATE `wp_calc` SET `sort` = $sort WHERE `id` = $row");
		
		return $result;
	}
		
	public static function updCalcParamSort($i,$row)
    {
		global $wpdb;
		
		$sort = $i++;
		$result = $wpdb->query("UPDATE `wp_calc_number_price` SET `sort` = $sort WHERE `id` = $row");
		
		return $sth;
	}
	
	public static function updCalcOption($serialize, $option_id)
    {
		global $wpdb;
        // Текст запроса к БД
        $result = $wpdb->query("UPDATE wp_calc
            SET 
                post_id = ".$serialize['post_id'].", 
                block_id = ".$serialize['block_id'].", 
                name = ".$serialize['name'].", 
                price = ".$serialize['price'].", 
                sort = ".$serialize['sort']."
            WHERE id = $option_id");

        return $result;
	}
		
	
	public static function addCalcParam($serialize)
    {
		global $wpdb;

		$number = $serialize['number'];
		$ident = $serialize['ident'];
		$price = $serialize['price'];
		$option_id = $serialize['option_id'];
		$post_id = $serialize['post_id'];
		// Текст запроса к БД
        $result = $wpdb->query('INSERT INTO wp_calc_number_price '
                . '(`number`,`ident`,`price`,`option_id`,`post_id`)'
                . 'VALUES '
                . '('.$number.', '.$ident.', '.$price.', '.$option_id.', '.$post_id.')');

		return $result;
	}
	
	public static function updCalcParam($serialize, $option_id)
    {
		global $wpdb;
        // Текст запроса к БД
        $result = $wpdb->query('UPDATE wp_calc_number_price
            SET 
                number = '.$serialize['number'].', 
                ident = '.$serialize['ident'].', 
                price = '.$serialize['price'].', 
                sort = '.$serialize['sort'].'
            WHERE id = '.$option_id);

        return $result;
	}
		
	public static function getCalcParam($option_id)
    {
		global $wpdb;
        // Текст запроса к БД
        $results_arr = $wpdb->get_results("SELECT *  FROM `wp_calc_number_price` WHERE option_id = $option_id ORDER BY ident");
		
        $i = 0;
        $calc_blocks = array();
		foreach ($results_arr as $result) {
	
			$calc_blocks[$i]['id'] = $result->id;
			$calc_blocks[$i]['option_id'] = $result->option_id;
			$calc_blocks[$i]['number'] = $result->number;
			$calc_blocks[$i]['price'] = $result->price;
			$calc_blocks[$i]['ident'] = $result->ident;
			$calc_blocks[$i]['sort'] = $result->sort;
            $i++;
		}

        return $calc_blocks;
	}
	
	public static function updPostCalcCheck($id, $calc_check)
    {
		$result = update_post_meta( $id, 'calc_check', $calc_check );

        return $result;
	}
	
	public static function addCalcCopy($id,$post_id)
    {
		global $wpdb;
        // Текст запроса к БД
			
		 $result = $wpdb->query("INSERT INTO `wp_calc` (`post_id`, `block_id`,`name`,`sort`,`price`) SELECT $post_id,`block_id`,`name`,`sort`,`price` FROM `calc` WHERE post_id= $id"); 
		
		 $result = $wpdb->query("INSERT INTO `wp_calc_number_price` (`post_id`, `number`,`ident`,`sort`,`price`,`option_id`) SELECT $post_id,`number`,`ident`,`sort`,`price`,`option_id` FROM `calc_number_price` WHERE post_id= $id"); 

        return $result;
	}
	
	public static function delCalcOption($id)
    {
		global $wpdb;
		
        // Текст запроса к БД
        $result = $wpdb->query("DELETE FROM wp_calc WHERE id = $id");

		return $result;
	}
		
	public static function delCalcParam($id)
    {
		global $wpdb;
		
        // Текст запроса к БД
        $result = $wpdb->query('DELETE FROM wp_calc_number_price WHERE id = $id');

		return $result;
	}
	
	public static function getCalcOptionFront($post_id,$block_id)
    {
		global $wpdb;
		
        // Текст запроса к БД
        $results_arr = $wpdb->get_results("SELECT *  FROM `wp_calc`  WHERE block_id = $block_id AND post_id = $post_id order by sort");

        // Получение и возврат результатов
        $i = 0;
        $calc = array();
        foreach ($results_arr as $result) {
            $calc[$i]['id'] = $result->id;
			$calc[$i]['post_id'] = $result->post_id;
            $calc[$i]['block_id'] = $result->block_id;
            $calc[$i]['name'] = $result->name;
            $calc[$i]['sort'] = $result->sort;
            $calc[$i]['price'] = $result->price;
            $i++;
        }
        return $calc;
	}
	
	
	
	public static function getTicketFront()
    {
		global $wpdb;
	}
}