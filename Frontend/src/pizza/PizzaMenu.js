var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showPizzaList(list) {
    $pizza_list.html("");
   var $filterAll=$("#filter-all");
    var $filterMeat=$("#filter-meat");
   var  $filterPineapple=$("#filter-pineapple");
  var  $filterMushroom=$("#filter-mushroom");
   var $filterOcean=$("#filter-ocean");
  var  $filterVega=$("#filter-vega");
    
    
    
    $filterAll.click(function(){
        showPizzaList(Pizza_List);
        $filterAll.addClass("active");
        $filterMeat.removeClass("active");
    $filterPineapple.removeClass("active");
    $filterMushroom.removeClass("active");
    $filterOcean.removeClass("active");
    $filterVega.removeClass("active");
    });
 $filterMeat.click(function(){
        filterPizza("meat");
       $filterMeat.addClass("active");
     $filterAll.removeClass("active");
    $filterPineapple.removeClass("active");
    $filterMushroom.removeClass("active");
    $filterOcean.removeClass("active");
    $filterVega.removeClass("active");
    });
    
    $filterPineapple.click(function(){
        filterPizza("pineapple");
       $filterPineapple.addClass("active");
        $filterAll.removeClass("active");
        $filterMeat.removeClass("active");
    $filterMushroom.removeClass("active");
    $filterOcean.removeClass("active");
    $filterVega.removeClass("active");
    });
    
     $filterMushroom.click(function(){
        filterPizza("mushroom");
        $filterAll.removeClass("active");
        $filterMeat.removeClass("active");
    $filterPineapple.removeClass("active");
    $filterMushroom.addClass("active");
    $filterOcean.removeClass("active");
    $filterVega.removeClass("active");
    });
    
     $filterOcean.click(function(){
        filterPizza("ocean");
        $filterOcean.addClass("active");
        $filterMeat.removeClass("active");
    $filterPineapple.removeClass("active");
    $filterMushroom.removeClass("active");
    $filterAll.removeClass("active");
    $filterVega.removeClass("active");
    });
    
     $filterVega.click(function(){
        filterPizza("vega");
        $filterVega.addClass("active");
        $filterMeat.removeClass("active");
    $filterPineapple.removeClass("active");
    $filterMushroom.removeClass("active");
    $filterOcean.removeClass("active");
    $filterAll.removeClass("active");
    });
    
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
      //  if(pizza.content.filter!=null){
       //     pizza_shown.push(pizza);}
        //Якщо піка відповідає фільтру
        //pizza_shown.push(pizza);

        //TODO: зробити фільтри
    });
    showPizzaList(pizza_shown);
}

function initialiseMenu() {
    $("#filter-all").addClass("active");
    showPizzaList(Pizza_List);
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;