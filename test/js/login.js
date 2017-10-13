(function(){
        var userName;
        var password;
        var enterBtn = document.querySelector(".enter-btn");

        $(".return-btn").click(function(){
            location.href="index.html";
        });

        // -------------------------------------------------------------------------------
        document.querySelector(".username").addEventListener("touchstart",function(){
                userName = $(".username").val();
                if(userName!=""){
                    $(".fork-one").show();
                }
        });
        $(".username").keydown(function(){
            userName = $(".username").val();
            if(userName!=""){
                $(".fork-one").show();
            }
        })
        $(".fork-one").click(function(){
            return $(".username").val(""),
                    $(".fork-one").hide();
        });
        document.querySelector(".username").addEventListener("focusout",function(){
            if( $(".username").val().length>=1){
                clearTimeout(timer1);
                var timer1 = setTimeout(function(){
                    $(".fork-one").hide();
                },500);   
            }
            if($(".username").val().length==0){
                $(".fork-one").hide();
            }
        });
        

        
        document.querySelector(".password").addEventListener("touchstart",function(){
            passWord = $(".password").val();
            if(passWord!=""){
                $(".fork-two").show();
            }
        });
        $(".password").keydown(function(){
            passWord = $(".password").val();
            if(passWord!=""){
                $(".fork-two").show();}
        })
        $(".fork-two").click(function(){
            return $(".password").val(""),
                    $(".fork-two").hide();
        });
        document.querySelector(".password").addEventListener("focusout",function(){
            if( $(".password").val().length>=1){
                clearTimeout(timer2);
                var timer2 = setTimeout(function(){
                    $(".fork-two").hide();
                },500);    
            }
            if($(".password").val().length==0){
                $(".fork-two").hide();
            }
        });
    // ---------------------------------------------------------------------------
        $(".eyes").click(function(){
            var eyesTure = $(".eyes-true").css("display");
            var eyesFalse = $(".eyes-false").css("display");
            if(eyesFalse=="block"){
                $(".eyes-false").hide();
                $(".eyes-true").show();
                $(".password").attr("type","text");
            }
            if(eyesTure=="block"){
                $(".eyes-false").show();
                $(".eyes-true").hide();
                $(".password").attr("type","password");
            }
        })
        var goods_id = oMshop.getQueryString('goods_id');
        console.log(goods_id);
        enterBtn.addEventListener("touchstart",function(){
            $(".enter-btn").css("background","#bcbcbc");
        },false);
        enterBtn.addEventListener("touchend",function(){
            $.post("http://h6.duchengjiu.top/shop/api_user.php",
               {
                   username:$(".username").val(),
                   password:$(".password").val(),
                   status : "login"
            },
            function(json){
                if(json.code===0){
                    localStorage.setItem('token', json.data.token);
                    localStorage.setItem('username', json.data.username);
                    if(goods_id) {
                        location.href = 'goods.html?goods_id=' + goods_id;
                    } else {
                        location.href="index.html";
                    }
                }else if(json.code===1000){
                    $(".error").show();
                    $(".error").html("请输入账号");
                }else{
                    $(".error").show();
                    $(".error").html(function(){
                        return "" +json.message;
                    });
                }
                console.log(json);
             
            } 
        );

        $(".enter-btn").css("background","#f11919");
        clearInterval(timer);
        var timer = setInterval(function(){
             $(".error").hide();
        },4000);
        },false);
     
        $(".register-btn").click(function(){
            location.href="register.html";

        });
})()