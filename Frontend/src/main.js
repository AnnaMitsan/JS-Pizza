$(function(){
    //This code will execute when the page is ready
    var PizzaMenu = require('./pizza/PizzaMenu');
    var PizzaCart = require('./pizza/PizzaCart');
   // var Pizza_List = require('./Pizza_List');  
    var Maps = require('./maps');
     var API = require('./API');
    
    PizzaCart.initialiseCart();
     API.getPizzaList(PizzaMenu.initialiseMenu);

   
//    API.getPizzaList(function(err, data){
//        if(err){
//            alert("Getting pizzas creation failed");
//        }
//        else{
//            console.log("list created"+JSON.stringify(data));
//            PizzaMenu.getList(data);
//        }
//    })

});