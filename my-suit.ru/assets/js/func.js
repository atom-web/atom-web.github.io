
function setCity(city) {
                    var date = new Date(new Date().getTime() + 1000*60*60*90);
                    document.cookie='issetCity='+city+'; path=/; expires='+date.toUTCString();
                    document.location.href = document.location.href;
}

var s_params = { isNaked:1 };
         var s_params_1 = [];
         var s_params2 = [];
         var s_params_model = [];
         var s_params_size = [];
         var s_params_consruct = [];
         var s_params_collection = [];
         var s_params_mat = [];
         
	function objectSearch() {
		
       
		console.log(s_params);
		$.get('/shop/catalog/',s_params, function(data){
				//console.log(data);
                $('.catalogListBlock').html(data);
		});
        
	}
    
    function addItemBrand(checked, item, type) {
      
        switch(type) {
            case 'model': {
                if(checked) s_params_model.push(item);
                else s_params_model.splice(s_params_model.indexOf(""+item+""),1);
       
                s_params[""+type+""] = null;
                s_params[""+type+""] = s_params_model;
                
                break;
            }
            //s_param_1 = s_params_model; break;
            case 'size': {
                if(checked) s_params_size.push(item);
                else s_params_size.splice(s_params_size.indexOf(""+item+""),1);
       
                s_params[""+type+""] = null;
                s_params[""+type+""] = s_params_size;
                
                break;
            }
            //s_param_1 = s_params_size; break;
            case 'contsruct': {
                if(checked) s_params_consruct.push(item);
                else s_params_consruct.splice(s_params_consruct.indexOf(""+item+""),1);
       
                s_params[""+type+""] = null;
                s_params[""+type+""] = s_params_consruct;
                
                break;
            }
            //s_param_1 = s_params_contsruct; break;
            case 'collection': {
                if(checked) s_params_collection.push(item);
                else s_params_collection.splice(s_params_collection.indexOf(""+item+""),1);
       
                s_params[""+type+""] = null;
                s_params[""+type+""] = s_params_collection;
                
                break;
            }
            //s_param_1 = s_params_collection; break;
            
            case 'mat': {
                if(checked) s_params_mat.push(item);
                else s_params_mat.splice(s_params_mat.indexOf(""+item+""),1);
       
                s_params[""+type+""] = null;
                s_params[""+type+""] = s_params_mat;
                break;
            }
        }
        
        
        
        
    }
    
    function addItemColor(checked, item, type) {
        
        if(checked) s_params2.push(item);
        else s_params2.splice(s_params2.indexOf(""+item+""),1);
       
        s_params['color'] = null;
        s_params['color'] = s_params2;
    }