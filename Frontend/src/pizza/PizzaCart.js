var Templates = require('../Templates');
var storage = require("./storage");
var API=require("../API");
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

var Cart = [];
var saveCart = storage.get("cart");
var $cart = $("#cart");
var $count=$("#count");
var $sum=$("#sum");
var $buy=$(".buy");
var summa=0;
var res=0;


if(saveCart){
    Cart = saveCart;
    $(".pre-order").addClass("hidden");
    $(".item").removeClass("hidden");
     $(".pizza-word").addClass("hidden");
    $(".bottom-order-buy").removeClass("hidden");
}


function initialiseCart() {
    if(Cart.length==0){
    $(".pre-order").removeClass("hidden");
    $(".item").addClass("hidden");
    $(".pizza-word").addClass("hidden");
    $(".bottom-order-buy").addClass("hidden");
    $(".bottom-order-start").removeClass("hidden");
    }
    else{
         $(".pizza-word").addClass("hidden");
      $buy.click(function(){
          $(".pizza-word").removeClass("hidden");
          API.createOrder("info", "callback");
      });  
    }
    updateCart();
}

function addToCart(pizza, size) {   
     Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    }); 
  
    
    $(".pre-order").addClass("hidden");
    $(".item").removeClass("hidden");
    $(".bottom-order-buy").removeClass("hidden");
    $(".bottom-order-start").addClass("hidden");
    updateCart();
}

function removeFromCart(cart_item) { 
    var index=Cart.indexOf(cart_item);
    if(index>-1){
        Cart.splice(index,1)
    }
    if(Cart.length==0){
    clearCart();}
    updateCart();
}


function getPizzaInCart() {
    return Cart;
}

function clearCart(){
    Cart=[];
    updateCart();
    $(".pre-order").removeClass("hidden");
    $(".item").addClass("hidden");
    $(".bottom-order-buy").addClass("hidden");
    $(".bottom-order-start").removeClass("hidden");
    storage.clear;
}

function updateCart() {
    $cart.html("");
     $count.text(Cart.length);
    res=0;
    //Оновлення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);  
        var $clear=$("#clear");      
        var $node = $(html_code);
        
        var $itemPrice= parseInt($node.find("#item-price").text());   
        summa =$itemPrice * cart_item.quantity;
        $node.find("#item-price").text(summa);
     
        
        $clear.click(function(){
            clearCart();
        });
        
        $node.find(".plus").click(function(){                     
          cart_item.quantity += 1;
           updateCart();
        });
        
        $node.find(".minus").click(function(){
            cart_item.quantity -= 1; 
            updateCart();
            if(cart_item.quantity<1){
                removeFromCart(cart_item);
            };
        });
        
        $node.find(".delete").click(function(){
            removeFromCart(cart_item);
        });
        res =res+summa;
        $sum.text(res);
        $cart.append($node);
    }
    Cart.forEach(showOnePizzaInCart); 
    storage.set("cart", Cart); 
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;