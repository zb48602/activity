 ! function (a) {
     function b() {
         var b = a.document,
             c = b.documentElement,
             d = c.getBoundingClientRect().width;
         document.documentElement.style.fontSize = 100 * (d / 353) + "px";
         console.log(d);
     }
     window.addEventListener("DOMContentLoaded", function () {
             b()
         }, !1),
         window.addEventListener("resize", function () {
             b()
         }), b()
 }(window);