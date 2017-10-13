(function(){
    document.addEventListener("DOMContentLoaded", function(event) {
        var a = localStorage.username;
        $(".name").html(a+" 您好");
    });
  
    var orderForm = document.querySelector(".order-form");
        orderForm.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        orderForm.addEventListener("touchend",function(){
            this.style.background = "white";
            location.href = "checkout.html";
        });
    var cart = document.querySelector(".cart");
        cart.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        cart.addEventListener("touchend",function(){
            this.style.background = "white";
            location.href = "cart.html";
        });
    var search = document.querySelector(".search");
        search.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        search.addEventListener("touchend",function(){
            this.style.background = "white";
            location.href = "cart.html";
        });
        var enterBtn=document.querySelector(".enter-btn");
        enterBtn.addEventListener("click",function(){
            $(".model").css("display","block");
            this.style.background = "gray";
            localStorage.token = "";
            localStorage.username = "";
            clearTimeout(timer2);
            var timer2 = setTimeout(function() {
                $(".enter-btn").css("background","red");
            }, 200);
            clearTimeout(timer1);
            var timer1 = setTimeout(function(){
                $(".model").css("display","none");
                location.href="login.html";
            },3000);
        });        
})()