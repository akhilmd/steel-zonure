var prev=-1;
var xhr = null;
var toIdObj = null;

function populateConversations(userID)
{
    var convoList = new Array();
    var convoData = [];
    var xmlhttp = new XMLHttpRequest();
    console.log((new Date()).getTime());

    toIdObj = new Object();

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var resp = (this.responseText);
            var convs = JSON.parse(resp);
            
            var  i =0;

            for (i=0;i<convs["length"];++i)
            {
                var kk = ["img/dp3.jpg"];
                kk.push(convs[i]["name"]);
                kk.push(convs[i]["conv_id"]);
                convoData.push(kk);
                toIdObj[convs[i]["conv_id"]] = convs[i]["part1_id"]==userID?convs[i]["part2_id"]:convs[i]["part1_id"];
            }

            for(var j = 0; j < convoData.length; ++j)
            {
                var dataObj = {
                    imgURL: convoData[j][0],
                    name: convoData[j][1],
                    convId: convoData[j][2] };

                addConversation(dataObj,userID);
            }
            loadCovoById(document.getElementById("convo_list").childNodes[1].id,userID);
        }
    };
    xmlhttp.open("POST", "./php/getConversations.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user_id="+userID);
}

function populateMessages(conversationID,userID)
{
    // var convoList = new Array();
    // var convoData = [];
    var xmlhttp = new XMLHttpRequest();
    console.log("user_id="+userID+"&conv_id="+conversationID);
    // console.log((new Date()).getTime());

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var resp = (this.responseText);
            // alert(resp);
            var msgs = JSON.parse(resp);

            for (var i=0;i<msgs["length"];++i)
            {
                // alert(msgs[i]["to_id"]);

                var senderName = document.getElementById("user_full_name").innerHTML;
                var loc = true;

                if (msgs[i]["to_id"] == userID)
                {
                    senderName = document.getElementById("conv_"+conversationID).lastChild.lastChild.lastChild.innerHTML;
                    loc = false;
                }

                var dataObj = {
                    fromName: senderName,
                    messageText: msgs[i]["msg"],
                    time: "9:45",
                    msgLocation: loc};

                addMessage(dataObj);
            }
            xhr = listenForMessage(conversationID,userID);
        }
    };
    xmlhttp.open("POST", "./php/getMessages.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user_id="+userID+"&conv_id="+conversationID);
}

function addConversation(coversationObj, userID)
{
    /*Creating Elements for each convos*/
    var subLi = document.createElement("LI");
    subLi.setAttribute("id", "conv_"+coversationObj.convId);
    subLi.setAttribute("onclick", "loadCovoById(this.id," + userID +")");

    var imgTag = document.createElement("IMG");
    imgTag.setAttribute("id", "dp");
    imgTag.setAttribute("class", "images");
    imgTag.setAttribute("src", coversationObj.imgURL);

    var infoDiv = document.createElement("DIV");
    infoDiv.setAttribute("class", "info");

    var userDiv = document.createElement("DIV");
    userDiv.setAttribute("class", "user");
    var b = document.createElement("b");
    userDiv.appendChild(document.createTextNode(coversationObj.name));
    b.appendChild(userDiv);

    /*Appending Ops*/
    infoDiv.appendChild(b);

    subLi.appendChild(imgTag);
    subLi.appendChild(infoDiv);

    document.getElementById("convo_list").appendChild(subLi);
    /*
    <li id="conv_1">
        <img id="dp" class="images" src="img/dp1.jpg">
        <div class="info">
            <div class="user">Hardik</div>
        </div>
    </li>
    */
    
}

function listenForMessage(convId,userId)
{
    // isListening = true;
    var xmlhttp = new XMLHttpRequest();
    console.log((new Date()).getTime());
    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            // insertMessage(this.responseText,userId);

            // alert(this.responseText);

            var dataObj = {
                fromName: document.getElementById("conv_"+convId).lastChild.lastChild.lastChild.innerHTML,
                messageText:this.responseText,
                time: "9:45",
                msgLocation: false};

            addMessage(dataObj);

            xhr = listenForMessage(convId, userId);
        }
    };
    xmlhttp.open("POST", "./php/deq.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("conv_id="+convId+"&to_id="+userId);
    return xmlhttp;
}

function delMessages(){
    var parentNode = document.getElementById("mess");
    while (parentNode.firstChild)
        parentNode.removeChild(parentNode.firstChild);
    
}

function loadCovoById(i, userID){
    if (xhr != null)
    {
        xhr.abort();
    }
    delMessages();
    console.log("loading: " + i);
    populateMessages(parseInt(i.replace(/\D/g, '')),userID);
    console.log("");
    clicked(document.getElementById(i));
    document.getElementById("currentName").innerHTML = document.getElementById(i).lastChild.lastChild.lastChild.innerHTML;
    document.getElementById("send_button").onclick = function ()
    {
        if (document.getElementById("texxt").value.length > 0)
        {
            var xmlhttp = new XMLHttpRequest();
            xmlhttp.onreadystatechange = function()
            {
                if (this.readyState == 4 && this.status == 200)
                {
                    // if (this.responseText == true)
                    // {
                        var dataObj = {
                            fromName: document.getElementById("user_full_name").innerHTML,
                            messageText:document.getElementById("texxt").value,
                            time: "9:45",
                            msgLocation: true};

                        addMessage(dataObj);
                    // }
                }
            };
            xmlhttp.open("POST", "./php/enq.php", true);
            xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            // alert("conv_id="+parseInt(i.replace(/\D/g, ''))+"&to_id="+toIdObj[parseInt(i.replace(/\D/g, ''))]+"&msg="+document.getElementById("texxt").value);
            xmlhttp.send("conv_id="+parseInt(i.replace(/\D/g, ''))+"&to_id="+toIdObj[parseInt(i.replace(/\D/g, ''))]+"&msg="+document.getElementById("texxt").value);
        }
    };
}

function clicked(x)
{
    if(prev!=-1)
        if(prev.style.backgroundColor == 'orange')
            prev.style.backgroundColor = '';
    x.style.backgroundColor = 'orange';
    prev = x;
}
function addMessage(messageObj)
{
    /*Get required data from backend*/
    var timeStamp = messageObj.time;
    var name = messageObj.fromName;
    var msg = messageObj.messageText;
    var msgLocation = messageObj.msgLocation;

    /*Creating child nodes of each message*/
    var subLI = document.createElement("LI");
    if(msgLocation)
        subLI.className = "right-side";
    else
        subLI.className = "left-side";

    var headDiv = document.createElement("DIV");
    headDiv.className = "head";

    var timeSpan = document.createElement("SPAN");
    timeSpan.className = "time";
    timeSpan.appendChild(document.createTextNode(timeStamp+" "));

    var nameSpan = document.createElement("SPAN");
    nameSpan.className = "name";
    nameSpan.appendChild(document.createTextNode(name));

    var msgDiv = document.createElement("DIV");
    msgDiv.className = "message";
    msgDiv.appendChild(document.createTextNode(msg));
    document.getElementById('texxt').value = '';
    /*Appending Operations*/

    headDiv.appendChild(timeSpan);
    headDiv.appendChild(nameSpan);

    subLI.appendChild(headDiv);
    subLI.appendChild(msgDiv);

    /*Appending to main UL*/
    document.getElementsByClassName("messages")[0].appendChild(subLI);

    // to scroll to the bottom of the chat list
    var scroll = document.getElementById('mess');
    scroll.scrollTop = scroll.scrollHeight;
    
    /*
    <li class="i">
        <div class="head">
            <span class="time">9:46 </span>
            <span class="name">Ganesh</span>
        </div>
        <div class="message">You have the hiccups?
        </div>
    </li>
    */
}

function toBlur(){
    
    var itrator = document.getElementById("conv_1");
    do{
        itrator.setAttribute("style", "-webkit-filter: blur(5px);");
        itrator.setAttribute("style", "filter: blur(5px);");
    }while(itrator = itrator.nextSibling);
    
    //-webkit-filter: blur(5px); 
    //filter: blur(5px);
    
}

function toNormal(){
    
    var itrator = document.getElementById("conv_1");
    do{
        itrator.removeAttribute("style", "-webkit-filter: blur(5px);");
        itrator.removeAttribute("style", "filter: blur(5px);");
    }while(itrator = itrator.nextSibling);
    
}

function search(){
    //document.getElementById("texxt").value = document.getElementById("search_box").value;
    /**
    * TODO: Maintain a more global userID
    */
    //var userID = 2;
    var searchString = document.getElementById("search_box").value;
    if(searchString == ''){ 
        toBlur();
        return;
    }
    
    var convoList = new Array();
    
    //alert(document.getElementById("conv_1").getElementsByClassName("user")[0].innerHTML);
    
    parentNode = document.getElementById("convo_list");
    
    for(var i = 0; i < parentNode.childNodes.length; i++){
        if(parentNode.childNodes[i].id){
            var obj = {
                convId: parentNode.childNodes[i].id,
                name: parentNode.childNodes[i].getElementsByClassName("user")[0].innerHTML.toLowerCase()
            };
            convoList.push(obj);
        }
    }
    
    for(var i = 0; i < convoList.length; ++i){
        if(convoList[i].name.indexOf(searchString.toLowerCase())!== -1){
            document.getElementById(convoList[i].convId).removeAttribute("style", "-webkit-filter: blur(5px);");
            document.getElementById(convoList[i].convId).removeAttribute("style", "filter: blur(5px);");
        }
        else{
            document.getElementById(convoList[i].convId).setAttribute("style", "-webkit-filter: blur(5px);");
            document.getElementById(convoList[i].convId).setAttribute("style", "filter: blur(5px);");
        }
            
    }

    
    
}
