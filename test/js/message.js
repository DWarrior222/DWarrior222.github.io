(function(){
    document.addEventListener("DOMContentLoaded", function(event) {
        var a = localStorage.username;
        $(".name").html(a+" 您好");
    });
    // document.addEventListener("touchmove",function(){
    //     this.preventDefault();
    // })
    var orderForm = document.querySelector(".order-form");
        orderForm.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        orderForm.addEventListener("touchend",function(){
            this.style.background = "white";
        });
        orderForm.addEventListener("click",function(){
            location.href = "checkout.html";
        });
    var cart = document.querySelector(".cart");
        cart.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        cart.addEventListener("touchend",function(){
            this.style.background = "white";
        });
        cart.addEventListener("click",function(){
            location.href = "cart.html";
        });
    var search = document.querySelector(".search");
        search.addEventListener("touchstart",function(){
            this.style.background = "#858585";
        });
        search.addEventListener("touchend",function(){
            this.style.background = "white";
        });
        search.addEventListener("click",function(){
            location.href = "search.html";
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