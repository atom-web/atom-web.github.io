$(function(){


    $('.fancybox').fancybox();

    // РєР»РёРє РїРѕ С‚РёРїСѓ
    $('.point').click(function(e) {
        var type = $(this).data('id');
        $('#typeField').val(type);
        $('.search_address').submit();
        $('.p_all').removeClass('p_all');
        $(this).addClass('p_active');
    });

    // РІС‹Р±РѕСЂ СЂРµРіРёРѕРЅР° РІ РєРѕРЅС‚Р°РєС‚Р°С…
    $('#region').change(function() {
        $('.search_address').submit();
    });
    // РѕС‚РїСЂР°РІРєР° С„РѕСЂРј

    // скрываем parsley на вводе
    $(document).on('keypress', function(evt) {
      if(evt.isDefaultPrevented()) {
        $(evt.target).trigger('input');
      }
    });

    $('.ajaxForm').each(function(){
        var owner = this;
        
        $(this).parsley();

        $(this).submit(function(e) {
            e.preventDefault();
            $(this).find('input[type="submit"]').attr('disabled','disabled');
            var goal = $(this).data('goal');
            var fields = $(this).serialize();
            if ($(this).parsley().isValid()) {
                // $(this).addClass('form-valid');
                $.ajax({
                    url:this.action+'?isNaked=1',
                    type: this.method,
                    data:fields,
                    always: function(data) {

                    },
                    success: function(data) {
                        if(yaCounter12241288) {
                            yaCounter12241288.reachGoal(''+goal+'');
                        }
                        var success = data;
                        $(owner).html(success);

                    }
                }); // ajax
            }

        }); // submit

    }); // each ajaxForm

	// $('.ajaxForm').each(function(){
	// 	var owner = this;
		
	// 	$(this).submit(function(e) {
	// 		e.preventDefault();
 //            $(this).find('input[type="submit"]').attr('disabled','disabled');
 //            var goal = $(this).data('goal');
	// 		var fields = $(this).serialize();
	// 		$.ajax({
	// 			url:this.action+'?isNaked=1',
	// 			type: this.method,
	// 			data:fields,
	// 			always: function(data) {

	// 			},
	// 			success: function(data) {
 //                    if(yaCounter12241288) {
 //                        yaCounter12241288.reachGoal(''+goal+'');
 //                    }
	// 				var success = "<div class='ajaxForm-result'>Р—Р°СЏРІРєР° Р±СѓРґРµС‚ РѕР±СЂР°Р±РѕС‚Р°РЅР° РІ Р±Р»РёР¶Р°Р№С€РµРµ РІСЂРµРјСЏ</div>";
	// 				$(owner).html(success);

	// 			}
	// 		}); // ajax

	// 	}); // submit

	// }); // each ajaxForm


	/*
        // РЅР°РІРµСЃРёС‚СЊ РѕР±СЂР°Р±РѕС‚С‡РёРє РґР»СЏ РІС‹Р±РѕСЂР° РіРѕСЂРѕРґР°
        var date = new Date(new Date().getTime() + 60 * 1000*60*1000);
        document.cookie = "issetCity="+city_name+"; path=/; expires=" + date.toUTCString();

        
	  if(id == 1) {
            $('#list_action').hide(0);
            $('#list_article').hide(0);
            $('#list_news').show(0);
             var linkText = 'Р’СЃРµ РЅРѕРІРѕСЃС‚Рё';
            var link = '/about/news/';
        }
        if(id == 2) {
            $('#list_article').show(0);
            $('#list_news').hide(0);
            $('#list_action').hide(0);
            var linkText = 'Р’СЃРµ СЃС‚Р°С‚СЊРё';
            var link = '/about/articles/';
        }   

        if(id == 3) {
            $('#list_action').show(0);
            $('#list_article').hide(0);
            $('#list_news').hide(0);
            var linkText = 'Р’СЃРµ Р°РєС†РёРё';
            var link = '/about/actions/';
        }

        $('.all_news > span').html(linkText);
        $('.all_news').attr('href',link);
     */

     // РїРµСЂРµРєР»СЋС‡РµРЅРёРµ Р°РєС†РёР№
     $('.lnk_action').on('click', function(){
     	 var id = $(this).data('id');
     	 $.get('/about/actions/',{id:id,isNaked:1},function(data) {
     	 	$('.actions_wrapper').html(data);
     	 });
     });

})


  function calculate()
{
 // B - С‚РёРї Р±Р»РѕРєР° 
 var nBlockType = document.getElementById('width');
 // L - РѕР±С‰СѓСЋ РґР»РёРЅСѓ РіР°Р·РѕР±РµС‚РѕРЅРЅС‹С… СЃС‚РµРЅ, Рј
 var nStenLength = document.getElementById('srStenLength');
 // H - СЃСЂРµРґРЅСЋСЋ РІС‹СЃРѕС‚Сѓ СЃС‚РµРЅ, Рј
 var nStenHeight = document.getElementById('srStenHeight');
 // Soc - РѕР±С‰СѓСЋ РїР»РѕС‰Р°РґСЊ РѕРєРѕРЅРЅС‹С… Рё РґРІРµСЂРЅС‹С… РїСЂРѕРµРјРѕРІ, РєРІ.Рј:
 var nPlosgad = document.getElementById('srPlosgad');
 
 // V1 - РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ 
 var nTotalBlock = document.getElementById('srTotalBlock');
 // S1 РІ РєРІ.Рј
 var nTotalBlockKV = document.getElementById('srTotalBlockKV');
 // K1 РѕРєСЂСѓРіР»СЏРµРј РґРѕ С†РµР»РѕРіРѕ РІ Р±РѕР»СЊС€СѓСЋ СЃС‚РѕСЂРѕРЅСѓ
 var nTotalBlockInt = document.getElementById('srTotalBlockInt');
 // V2 - РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ  РєСЂР°С‚РЅРѕРµ РїРѕРґРґРѕРЅСѓ
 var nTotalBlockPd = document.getElementById('srTotalBlockPd');
    // S2 РІ РєРІ.Рј
 var nTotalBlockPn = document.getElementById('srTotalBlockPn'); 
 // K2 - РѕРєСЂСѓРіР»СЏРµРј РґРѕ С†РµР»РѕРіРѕ РІ Р±РѕР»СЊС€СѓСЋ СЃС‚РѕСЂРѕРЅСѓ
 var nTotalBlockIntPd = document.getElementById('srTotalBlockIntPd');
    // B1 - С‚РёРї Р±Р»РѕРєР° 
 var nBlockTyp = document.getElementById('srBlockTyp');
    // P - С‚РёРї Р±Р»РѕРєР° 
 var nBlockTypP = document.getElementById('srBlockTypP');
    // pw - С‚СЂР°РЅСЃРїРѕСЂС‚РЅС‹Р№ РІРµСЃ РїРѕРґРґРѕРЅР°  
 var npw = document.getElementById('srpw');
    // K - РєР»РµР№  
 var nBlockK = document.getElementById('srBlockK');
 
//nTotalBlock.value = ((nStenLength.value * nStenHeight.value - nPlosgad.value) * nBlockType.value/1000 * 1.05).toFixed(2);
nTotalBlock.value = Math.round(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value) * nBlockType.value/1000 * 1.05);

$('[name="f_opvol1"]').val(nTotalBlock.value);
$('#srTotalBlock').html(nTotalBlock.value);

//nTotalBlockKV.value = (nStenLength.value * nStenHeight.value - nPlosgad.value).toFixed(2);
nTotalBlockKV.value = Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value);
$('[name="f_opsq1"]').val(nTotalBlockKV.value);
$('#srTotalBlockKV').html(nTotalBlockKV.value);


nTotalBlockInt.value = Math.ceil(nTotalBlock.value / (0.625 * 0.25 * nBlockType.value/1000));
$('[name="f_oblam1"]').val(nTotalBlockInt.value); 
$('#srTotalBlockInt').html(nTotalBlockInt.value);

console.log(nTotalBlock.value);
//nTotalBlockPd.value = (parseInt (nTotalBlock.value / 1.875 ) * 1.875).toFixed(3);
nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.875 )) * 1.875;

console.log(nTotalBlockPd.value);
$('[name="f_opvol"]').val(nTotalBlockPd.value); 
$("#srTotalBlockPd").html(nTotalBlockPd.value);

if (nBlockType.value == 200) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.75 )) * 1.75;
if (nBlockType.value == 240) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.8 )) * 1.8;
if (nBlockType.value == 400) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.5 )) * 1.5;
nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.875);
if (nBlockType.value == 200) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.75);
if (nBlockType.value == 240) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.8);
if (nBlockType.value == 400) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.5);
nTotalBlockPn.value = (nTotalBlockPd.value / (nBlockType.value/1000)).toFixed(2); 
//console.log(nTotalBlockPd.value);      
nTotalBlockIntPd.value = Math.ceil(nTotalBlockPn.value / (0.625 * 0.25));
nBlockTyp.value = nBlockType.value; 
npw.value = 1150;  
if (nBlockType.value == 200) npw.value = 1050;
if (nBlockType.value == 400) npw.value = 950;     
nBlockK.value = Math.round(nTotalBlockPd.value);  


// РєРѕР»-РІРѕ РїРѕРґРґРѕРЅРѕРІ
$('[name="f_opam"]').val(nBlockTypP.value); 
$("#srBlockTypP").html(nBlockTypP.value);

console.log(nTotalBlockPd.value);
$('[name="f_opvol"]').val(nTotalBlockPd.value); 
$("#srTotalBlockPd").html(nTotalBlockPd.value);

 // РѕР±С‰РµРµ РєРѕР»-РІРѕ Р±Р»РѕРєРѕРІ РєСЂР°С‚РЅРѕРµ РїРѕРґРґРѕРЅСѓ РІ С€С‚.
$('[name="f_oblam"]').val(nTotalBlockIntPd.value);
$("#srTotalBlockIntPd").html(nTotalBlockIntPd.value);

 // РѕР±С‰РµРµ РєРѕР»-РІРѕ Р±Р»РѕРєРѕРІ, РєСЂР°С‚РЅРѕРµ РїРѕРґРґРЅРѕРЅСѓ РІ РєРІ.Рј.
$('[name="f_opsq"]').val(nTotalBlockPn.value); 
$("#srTotalBlockPn").html(nTotalBlockPn.value);

 // С‚РёРї Р±Р»РѕРєР°
$("#srBlockTyp").html(nBlockTyp.value); 
$('[name="f_omark"]').val(nBlockTyp.value);

 // С‚СЂР°РЅСЃРїРѕСЂС‚РЅС‹Р№ РІРµСЃ РѕРґРЅРѕРіРѕ РїРѕРґРґРѕРЅР°
$('[name="f_opw"]').val(npw.value); 
$("#srpw").html(npw.value);

// РєРѕР»РІРѕ РјРµС€РєРѕРІ РєР»РµСЏ
$('[name="f_opgl"]').val(nBlockK.value); 
$("#srBlockK").html(nBlockK.value);

    var printButton = $('.result_calc_print');
    
    var urlPrint = "/raschet/print/?width="+nBlockType.value+"&lenght="+nStenLength.value+"&height="+nStenHeight.value+"&squareP="+nPlosgad.value+"&raschM3="+nTotalBlock.value+"&raschM2="+nTotalBlockKV.value+"&raschU="+nTotalBlockInt.value+"&realM3="+nTotalBlockPd.value+"&realM2="+nTotalBlockPn.value+"&realU="+nTotalBlockIntPd.value+"&pallet="+nBlockTypP.value+"&tons="+npw.value+"&glue="+nBlockK.value;

    printButton.attr({href:urlPrint});
    printButton.show(500);


    var scrollTop = $('#result').offset().top;
    // СЃРєСЂРѕР»Р»РёРј СЃС‚СЂР°РЅРёС†Сѓ РЅР° Р·РЅР°С‡РµРЅРёРµ СЂР°РІРЅРѕРµ РїРѕР·РёС†РёРё СЌР»РµРјРµРЅС‚Р°
    //$(document).scrollTop(scrollTop);
    $("html,body").animate({scrollTop:scrollTop},1000);
}

function calculate_restore()
{
 // B - С‚РёРї Р±Р»РѕРєР° 
 var nBlockType = document.getElementById('width');
 // L - РѕР±С‰СѓСЋ РґР»РёРЅСѓ РіР°Р·РѕР±РµС‚РѕРЅРЅС‹С… СЃС‚РµРЅ, Рј
 var nStenLength = document.getElementById('srStenLength');
 // H - СЃСЂРµРґРЅСЋСЋ РІС‹СЃРѕС‚Сѓ СЃС‚РµРЅ, Рј
 var nStenHeight = document.getElementById('srStenHeight');
 // Soc - РѕР±С‰СѓСЋ РїР»РѕС‰Р°РґСЊ РѕРєРѕРЅРЅС‹С… Рё РґРІРµСЂРЅС‹С… РїСЂРѕРµРјРѕРІ, РєРІ.Рј:
 var nPlosgad = document.getElementById('srPlosgad');
 
 // V1 - РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ 
 var nTotalBlock = document.getElementById('srTotalBlock');
 // S1 РІ РєРІ.Рј
 var nTotalBlockKV = document.getElementById('srTotalBlockKV');
 // K1 РѕРєСЂСѓРіР»СЏРµРј РґРѕ С†РµР»РѕРіРѕ РІ Р±РѕР»СЊС€СѓСЋ СЃС‚РѕСЂРѕРЅСѓ
 var nTotalBlockInt = document.getElementById('srTotalBlockInt');
 // V2 - РљРѕР»-РІРѕ Р±Р»РѕРєРѕРІ  РєСЂР°С‚РЅРѕРµ РїРѕРґРґРѕРЅСѓ
 var nTotalBlockPd = document.getElementById('srTotalBlockPd');
    // S2 РІ РєРІ.Рј
 var nTotalBlockPn = document.getElementById('srTotalBlockPn'); 
 // K2 - РѕРєСЂСѓРіР»СЏРµРј РґРѕ С†РµР»РѕРіРѕ РІ Р±РѕР»СЊС€СѓСЋ СЃС‚РѕСЂРѕРЅСѓ
 var nTotalBlockIntPd = document.getElementById('srTotalBlockIntPd');
    // B1 - С‚РёРї Р±Р»РѕРєР° 
 var nBlockTyp = document.getElementById('srBlockTyp');
    // P - С‚РёРї Р±Р»РѕРєР° 
 var nBlockTypP = document.getElementById('srBlockTypP');
    // pw - С‚СЂР°РЅСЃРїРѕСЂС‚РЅС‹Р№ РІРµСЃ РїРѕРґРґРѕРЅР°  
 var npw = document.getElementById('srpw');
    // K - РєР»РµР№  
 var nBlockK = document.getElementById('srBlockK');
 
nTotalBlock.value = Math.round(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value) * nBlockType.value/1000 * 1.05);
$('[name="f_opvol1"]').val(Math.round(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value) * nBlockType.value/1000 * 1.05));
$('#srTotalBlock').html(Math.round(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value) * nBlockType.value/1000 * 1.05));

nTotalBlockKV.value = Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value);
$('[name="f_opsq1"]').val(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value));
$('#srTotalBlockKV').html(Math.ceil(nStenLength.value * nStenHeight.value - nPlosgad.value));


nTotalBlockInt.value = Math.ceil(nTotalBlock.value / (0.625 * 0.25 * nBlockType.value/1000));
$('[name="f_oblam1"]').val(nTotalBlockInt.value); 
$('#srTotalBlockInt').html(Math.ceil(nTotalBlock.value / (0.625 * 0.25 * nBlockType.value/1000)));

nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.875 )) * 1.875;
$('[name="f_opvol"]').val(nTotalBlockPd.value); 
$("#srTotalBlockPd").html(nTotalBlockPd.value);

if (nBlockType.value == 200) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.75 )) * 1.75;
if (nBlockType.value == 240) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.8 )) * 1.8;
if (nBlockType.value == 400) nTotalBlockPd.value = parseInt (Math.ceil(nTotalBlock.value / 1.5 )) * 1.5;
nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.875);
if (nBlockType.value == 200) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.75);
if (nBlockType.value == 240) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.8);
if (nBlockType.value == 400) nBlockTypP.value = Math.ceil(nTotalBlockPd.value / 1.5);
nTotalBlockPn.value = (nTotalBlockPd.value / (nBlockType.value/1000)); 
console.log(nTotalBlockPd.value);      
nTotalBlockIntPd.value = Math.ceil(nTotalBlockPn.value / (0.625 * 0.25));
nBlockTyp.value = nBlockType.value; 
npw.value = 1150;  
if (nBlockType.value == 200) npw.value = 1050;
if (nBlockType.value == 400) npw.value = 950;     
nBlockK.value = Math.round(nTotalBlockPd.value);  


// РєРѕР»-РІРѕ РїРѕРґРґРѕРЅРѕРІ
$('[name="f_opam"]').val(nBlockTypP.value); 
$("#srBlockTypP").html(nBlockTypP.value);

$('[name="f_opvol"]').val(nTotalBlockPd.value); 
$("#srTotalBlockPd").html(nTotalBlockPd.value);

 // РѕР±С‰РµРµ РєРѕР»-РІРѕ Р±Р»РѕРєРѕРІ РєСЂР°С‚РЅРѕРµ РїРѕРґРґРѕРЅСѓ РІ С€С‚.
$('[name="f_oblam"]').val(nTotalBlockIntPd.value);
$("#srTotalBlockIntPd").html(nTotalBlockIntPd.value);

 // РѕР±С‰РµРµ РєРѕР»-РІРѕ Р±Р»РѕРєРѕРІ, РєСЂР°С‚РЅРѕРµ РїРѕРґРґРЅРѕРЅСѓ РІ РєРІ.Рј.
$('[name="f_opsq"]').val(nTotalBlockPn.value); 
$("#srTotalBlockPn").html(nTotalBlockPn.value.toFixed(2));

 // С‚РёРї Р±Р»РѕРєР°
$("#srBlockTyp").html(nBlockTyp.value); 
$('[name="f_omark"]').val(nBlockTyp.value);

 // С‚СЂР°РЅСЃРїРѕСЂС‚РЅС‹Р№ РІРµСЃ РѕРґРЅРѕРіРѕ РїРѕРґРґРѕРЅР°
$('[name="f_opw"]').val(npw.value); 
$("#srpw").html(npw.value);

// РєРѕР»РІРѕ РјРµС€РєРѕРІ РєР»РµСЏ
$('[name="f_opgl"]').val(nBlockK.value); 
$("#srBlockK").html(nBlockK.value);

    var printButton = $('.result_calc_print');
    
    var urlPrint = "/raschet/print/?width="+nBlockType.value+"&lenght="+nStenLength.value+"&height="+nStenHeight.value+"&squareP="+nPlosgad.value+"&raschM3="+nTotalBlock.value+"&raschM2="+nTotalBlockKV.value+"&raschU="+nTotalBlockInt.value+"&realM3="+nTotalBlockPd.value+"&realM2="+nTotalBlockPn.value+"&realU="+nTotalBlockIntPd.value+"&pallet="+nBlockTypP.value+"&tons="+npw.value+"&glue="+nBlockK.value;

    printButton.attr({href:urlPrint});
    printButton.show(500);


    var scrollTop = $('#result').offset().top;
    // СЃРєСЂРѕР»Р»РёРј СЃС‚СЂР°РЅРёС†Сѓ РЅР° Р·РЅР°С‡РµРЅРёРµ СЂР°РІРЅРѕРµ РїРѕР·РёС†РёРё СЌР»РµРјРµРЅС‚Р°
    //$(document).scrollTop(scrollTop);
    $("html,body").animate({scrollTop:scrollTop},1000);
}

function err1()
{
var c = document.getElementById("srStenLength").value;
document.getElementById("srStenLength").value = (c.replace(/,/g, "."));
}
function err2()
{
var c = document.getElementById("srStenHeight").value;
document.getElementById("srStenHeight").value = (c.replace(/,/g, "."));
}
function err3()
{
var c = document.getElementById("srPlosgad").value;
document.getElementById("srPlosgad").value = (c.replace(/,/g, "."));


}

function  changeSeason(id,elem) {
$('.season ').removeClass('activeSeason');
    $(elem).addClass('activeSeason');
    if(id==0) {
    $('#stitle').html('');
    $('#inwinter').html('');
    $('#temp1').html('+10В°РЎ РґРѕ +25В°РЎ.');
    $('#temp2').html('15-18В°РЎ');
    $('#time1').html('3');
    $('#time2').html('10');
    $('#time3').html('2');
    $('#name1').html(' РўРµРїР»РѕРёР·РѕР»-2');    
    }

    if(id==1) {
    $('#stitle').html('Р—РёРјР° -15');
    $('#inwinter').html(' РІ Р·РёРјРЅРµРµ РІСЂРµРјСЏ');
    $('#temp1').html('+5В°РЎ РґРѕ -15В°РЎ.');
    $('#temp2').html('45-60В°РЎ');
    $('#time1').html('2');
    $('#time2').html('5');
    $('#time3').html('2');
    $('#name1').html('');
    }
}
    