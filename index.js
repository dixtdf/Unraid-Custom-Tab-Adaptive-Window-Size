// ==UserScript==
// @name         Unraid Custom Tab自适应窗体大小
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  窗体宽高随意设置即可
// @author       dixtdf
// @match        http*://*/*
// @icon         data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==
// @grant        none
// ==/UserScript==

(function() {
    function onWindowResize() {
        let elementsByClassName = window.document.getElementsByClassName("content shift");
        if (elementsByClassName.length>0){
            let computedStyle = window.getComputedStyle(elementsByClassName[0].querySelector(".title"));
            if (computedStyle){
                let height = window.innerHeight-(
                    window.document.getElementById("header").offsetHeight
                    +window.document.getElementById("menu").offsetHeight
                    +window.document.getElementById("footer").offsetHeight
                    +parseInt(computedStyle.getPropertyValue("height").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("padding-top").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("padding-bottom").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("margin-top").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("margin-bottom").replace("px",""), 10)
                    +30
                )

                let width=parseInt(computedStyle.getPropertyValue("width").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("padding-left").replace("px",""), 10)
                    +parseInt(computedStyle.getPropertyValue("padding-right").replace("px",""), 10)

                let iframeElement = window.document.querySelector(".content.shift iframe");
                iframeElement.style.width = width+"px";
                iframeElement.style.height = height+"px";
                iframeElement.style.border = "0px";
            }
        }
    }

    window.addEventListener("resize", function() {
        clearTimeout(window.resizedFinished);
        window.resizedFinished = setTimeout(onWindowResize, 200);
    });

    onWindowResize();
})();