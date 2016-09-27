var lk = false;
// Change this based on the number of feature divs
var mxSec = 5;
var curSec = 1;

var pt=(new Date()).getTime();
var ct=(new Date()).getTime();

var MouseWheelHandler =  function(e)
{
    // Check to do nothing if wheel is moved while code is still executing
    if (lk) return;
    lk=true;

    ct = (new Date()).getTime();

    // get change in the mouse wheel motion
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    // if 400 miliseconds since last section change happened, then change the section
    if ((ct-pt)>700)
    {
        // remove active class from the current feature div
        document.getElementById("section"+curSec).className = document.getElementById("section"+curSec).className.replace(/\b active\b/,'');

        // if scrolled down
        if (delta < 0)
        {
            // if not the last feature div
            if (curSec<mxSec)
            {
                // goto next section
                curSec++;
            }
        }
        // if scrolled up
        else
        {
            // if not first div
            if (curSec>1)
            {
                // goto previous section
                curSec--;
            }
        }

        // add active class to the new current feature div based on the section
        document.getElementById("section"+curSec).className += " active";

        // keep track of time of previous change in section
        pt=ct;
    }

    // false imples code has finished executing and next time wheel is moved, it can execute above code
    lk=false;
};

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