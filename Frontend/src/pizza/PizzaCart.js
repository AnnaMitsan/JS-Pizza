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
var totalSum=0;
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
        }); 
        
        $(".next-button").click(function(){
            createOrderOnServer();
            console.log("total sum", getOrderSum());
        });
        
        
    }
    updateCart();  
}

function getOrderSum(){
    return $("#totalSum").text();  
}
function addToCart(pizza, size) {   
 var newPizza = {
          pizza: pizza,
          size: size,
          quantity: 1
         };

         var index = -1;
         Cart.forEach(function(item) {
             if (newPizza.pizza.id==item.pizza.id && newPizza.size==item.size)
                 index = Cart.indexOf(item);
         });
     if (index==-1) {
         Cart.push(newPizza);
     } else {
         Cart[index].quantity++;
     }

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
      //  totalSum=res;
        $sum.text(res);
        
        $cart.append($node);
    }
    Cart.forEach(showOnePizzaInCart); 
    storage.set("cart", Cart); 
    $("#totalSum").text(res);
}


function createOrderOnServer(){
    API.createOrder(Cart, function(err, data){
        if(err){
            alert("Order creation failed");
        }
        else{
            //console.log("order created"+JSON.stringify(data));        
            LiqPayCheckout.init({
            data: data.data,
            signature: data.signature,
            embedTo: "#liqpay",
            mode: "popup" // embed || popup
            }).on("liqpay.callback", function(data){ console.log(data.status); console.log(data);
            }).on("liqpay.ready", function(data){ // ready
            }).on("liqpay.close", function(data){
            // close
            });
        }
    })
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.getOrderSum=getOrderSum;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;