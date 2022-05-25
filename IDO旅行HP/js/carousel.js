// iife
(function() {
    var carousel_list = document.getElementById("carousel_list");
    var left_btn = document.getElementById("left_btn");
    var right_btn = document.getElementById("right_btn");
    var circle_ol = document.getElementById("circle_ol");
    var circle_lis = circle_ol.getElementsByTagName("li");
    var banner = document.getElementById("banner");
    console.log(circle_lis);

    var clone_li = carousel_list.firstElementChild.cloneNode(true);
    carousel_list.appendChild(clone_li);

    var idx = 0;
    // lock
    var lock = true;

    console.log(idx);
    left_btn.onclick = function() {
        if(!lock) return;
        if(idx == 0){
            carousel_list.style.transition = "none";
            carousel_list.style.transform = "translateX(" + -16.66 * 5 + "%)";
            idx = 4;
            setTimeout(function(){
                carousel_list.style.transition = "transform .3s linear 0s";
                carousel_list.style.transform = "translateX(" + -16.66 * 4 + "%)";
            },0);
        }else{
            idx --;
            carousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";
        }
        console.log(idx);
        setCircles();
        lock = false;
        setTimeout(function(){
            lock = true;
        },300)
    }

    right_btn.onclick = right_btn_handler;
    function right_btn_handler() {
        if(!lock) return;
        carousel_list.style.transition = "transform .3s linear 0s";
        idx++;
        carousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";

        if(idx > 4){
            setTimeout(function(){
                carousel_list.style.transition = "none";
                carousel_list.style.transform = "none";
                idx = 0;
            },300);
        };
        console.log(idx);
        setCircles();

        lock = false;
        setTimeout(function(){
            lock = true;
        },300)
    };

    function setCircles(){
        for(i = 0; i <= circle_lis.length - 1; i++) {
            if(i == idx % 5) {
                circle_lis[i].className = "current";
            }else{
                circle_lis[i].className = "";
            }
        }
    };

    circle_ol.onclick = function(e) {
        if(e.target.tagName.toLowerCase() == "li"){
            var n = Number(e.target.getAttribute("data-n"));

            idx = n;
            carousel_list.style.transform = "translateX(" + -16.66 * idx + "%)";
            setCircles();
        }
    }

    var timer = setInterval(function() {
        right_btn_handler();
    },1500);

    banner.onmouseenter = function() {
        clearInterval(timer);
    };
    banner.onmouseleave = function() {
        clearInterval(timer);
        timer = setInterval(function(){
            right_btn_handler();
        },1500)
    }
})();