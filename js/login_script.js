window.onload = function ()
{
    setInitPos(1);
    var lk = false;
    var scrollLevel = 0;
    var maxScrollLevel = 150;
    var maxSection = 5;
    var currentSection = 1;
    var visibleSection = 1;

    var changeContentStack = [1];

    var isChanging = true;

    var MouseWheelHandler =  function(e)
    {
        // Check to do nothing if wheel is moved while code is still executing
        if (lk) return;
        if (visibleSection == 6) return;
        lk=true;

        // get change in the mouse wheel motion
        var e = window.event || e; // old IE support
        // var delta = -Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
        var delta = (e.detail<0 || e.wheelDelta>0) ? -1 : 1;

        scrollLevel += delta;

        scrollLevel = scrollLevel < 0 ? 0 : scrollLevel;
        scrollLevel = scrollLevel > maxScrollLevel ? maxScrollLevel : scrollLevel;

        // console.log(scrollLevel+" <- scrollLevel");

        currentSection = Math.floor(scrollLevel / maxScrollLevel * (maxSection+1))+1;

        currentSection = currentSection>maxSection?maxSection:currentSection;

        var op = "";
        for (var i=0;i<changeContentStack.length;++i)
        {
            op+= i+" : "+changeContentStack[i]+"  xx  ";
        }
        console.log(op);

        if (changeContentStack.indexOf(currentSection) <= -1)
        {
            changeContentStack.push(currentSection);
            if (isChanging == false)
            {
                changeSection();
            }
        }

        // false imples code has finished executing and next time wheel is moved, it can execute above code
        lk=false;
    };

    function changeSection()
    {
        isChanging = true;
        var toSec = changeContentStack[0];
        if (toSec == visibleSection)
        {
            changeContentStack.shift();
            if (changeContentStack.length != 0)
                changeSection();
            else
                {isChanging = false;console.log(isChanging + " <- isChanging");}
            return;
        }
        console.log(toSec+' <- toSec');
        document.getElementById("section"+visibleSection).className = document.getElementById("section"+visibleSection).className.replace(/\b active\b/,'');
        document.getElementById("section"+toSec).className += " active";
        visibleSection = toSec;
        setInitPos(toSec);
        animateToPos(toSec);
    }

    function animateToPos(ind)
    {
        if (isNaN(ind) || ind<=0)
        {
            changeContentStack.shift();
            return;
        }
        var rk = document.getElementById("rk"+ind);
        var animationDuration = 0.5;
        var fps = 60;
        var totalFrames = Math.round(fps * animationDuration);
        var startY = window.innerHeight;
        var endY = ((window.innerHeight/2)-(rk.offsetHeight/2));
        var currY = startY-100;

        var k2 = "height: auto; width: 85%; overflow-y: hidden;";
        var img = document.getElementById("img"+ind);
        var currIY = startY;
        var endIY = ((window.innerHeight/2)-(img.offsetHeight/4));

        var diff = (startY-endY);
        var diff2 = (startY-endIY);

        var currentFrame = 0;
        var id = setInterval(frame, 1000/fps);
        function frame()
        {
            if (currentFrame <= totalFrames)
            {
                currY = startY - Math.pow((currentFrame/totalFrames),(1/3))*diff;
                currIY = startY - Math.pow((currentFrame/totalFrames),(1/4))*diff2;
                rk.style.transform = "translate(0px,"+currY+"px)";
                img.setAttribute("style", k2 + " transform : translate("+((img.parentNode.offsetWidth/2)-(img.offsetWidth/2))+"px,"+currIY+"px);");
                ++currentFrame;
            }
            else
            {
                clearInterval(id);
                changeContentStack.shift();
                if (changeContentStack.length != 0)
                    changeSection();
                else
                    {isChanging = false;console.log(isChanging + " <- isChanging");}
            }
        }
    }

    document.getElementById("register_button").onclick = function onRegisterClickedHandler()
    {
        // remove active class from the current feature div
        document.getElementById("section"+visibleSection).className = document.getElementById("section"+visibleSection).className.replace(/\b active\b/,'');
        // goto next section
        visibleSection = 6;
        // add active class to the new current feature div based on the section
        document.getElementById("section6").className += " active";

        var ind = 6;
        var k2 = "width: 250px;";
        var img = document.getElementById("img"+ind);
        img.setAttribute("style", k2 + " transform : translate(0px,"+window.innerHeight+"px);");
        document.getElementById("section"+ind).style.opacity = "1";

        var animationDuration = 0.5;
        var fps = 60;
        var totalFrames = Math.round(fps * animationDuration);
        var startY = window.innerHeight;
        var img = document.getElementById("img"+ind);
        var currIY = startY;
        var endIY = ((window.innerHeight/2)-(img.offsetHeight/2));

        var diff2 = (startY-endIY);

        var currentFrame = 0;
        var id = setInterval(frame, 1000/fps);
        function frame()
        {
            if (currentFrame <= totalFrames)
            {
                currIY = startY - Math.pow((currentFrame/totalFrames),0.25)*diff2;
                img.setAttribute("style", k2 + " transform : translate("+((window.innerWidth/2)-(img.offsetWidth/2))+"px,"+currIY+"px);");
                ++currentFrame;
            }
            else
            {
                clearInterval(id);
            }
        }

    }
    
    document.getElementById("cancel_r").onclick = function ()
    {
        console.log("cancelled");
        changeContentStack = [1];
        changeSection();
    }

    // add coppresponding event listeners for detecting mouse wheel movement

    // check if window can have event listener
    if (window.addEventListener)
    {
        // IE9, Chrome, Safari, Opera
        window.addEventListener("mousewheel", MouseWheelHandler, false);
        // Firefox
        window.addEventListener("DOMMouseScroll", MouseWheelHandler, false);
    }
    // IE 6/7/8
    else window.attachEvent("onmousewheel", MouseWheelHandler);

    animateToPos(1);
}

function setInitPos(ind)
{
    if (isNaN(ind))
        return;
    var rk = document.getElementById("rk"+ind);
    rk.style.transform = "translate(0px,"+window.innerHeight+"px)";
    // rk.setAttribute("style","transform: translate(0px,"+((window.innerHeight/2)-(rk.offsetHeight/2))+"px);");
    var k2 = "height: auto; width: 85%; overflow-y: hidden;";
    var img = document.getElementById("img"+ind);
    img.setAttribute("style", k2 + " transform : translate("+((img.parentNode.offsetWidth/2)-(img.offsetWidth/2))+"px,"+window.innerHeight+"px);");
    document.getElementById("section"+ind).style.opacity = "1";
}

window.addEventListener("resize", setInitPos);