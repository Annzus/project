window.onload = function() {
    var imgs = document.getElementsByClassName("img");
    var dots = document.querySelector(".dots").querySelectorAll("span");

    for( var i = 0; i < imgs.length; i++ ){
        imgs[i].setAttribute("data-index",i);
    }
    //獲取當前index
    var current = document.querySelector(".current");
    var currentIndex = current.getAttribute("data-index");
    //定時器3s
    var timer = setInterval(changeImage,3000);
    //輪播
    function changeImage() {
        //每次執行函數，currentIndex++
        if(currentIndex < imgs.length-1 ){
            //移除上一張圖片以及圓點高亮
            imgs[currentIndex].classList.remove("current");
            dots[currentIndex].classList.remove("square");
            imgs[++currentIndex].classList.add("current");
            dots[currentIndex].classList.add("square");
        }else{
            imgs[currentIndex].classList.remove("current");
            dots[currentIndex].classList.remove("square");
            currentIndex = 0;
            imgs[currentIndex].classList.add("current");
            dots[currentIndex].classList.add("square");
        }
    }
    for(var k = 0; k < dots.length; k++) {
        dots[k].setAttribute("data-index",k);
        dots[k].addEventListener("click",function(){
            var index = this.getAttribute("data-index");
            var img = imgs[index];
            if(currentIndex != index) {
                // 刪除現在的current
                imgs[currentIndex].classList.remove("current");
                imgs[index].classList.add("current");
                dots[currentIndex].classList.remove("square");
                dots[index].classList.add("square");
                currentIndex = index;
            }
        })
    }

    // tab切換
    var aList = document.querySelector(".list").querySelectorAll(".list_nav"),
        aTab = document.getElementsByClassName("productBox"),
        cityIndex = 0;//上一次的高亮元素索引
    for( var a = 0; a < aList.length; a++ ){
        //閉包自執行
        (function(a){
        //給每個城市綁定一個事件
        aList[a].onclick = function() {
            // 移除上一張
            aList[cityIndex].classList.remove("current_option");
            aTab[cityIndex].classList.remove("on");
            cityIndex = a;
            // 添加當前div的屬性
            aList[a].classList.add("current_option");
            aTab[a].classList.add("on");
        }
        })(a)
    }
}