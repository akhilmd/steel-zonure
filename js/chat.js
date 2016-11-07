var prev;

function populateConversations(userID)
{
    var convoList = new Array();
    var convoData = [];
    var xmlhttp = new XMLHttpRequest();
    console.log((new Date()).getTime());

    xmlhttp.onreadystatechange = function()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            var resp = (this.responseText);
            var convs = JSON.parse(resp);
            
            var  i =0;

            for (i=0;i<convs["length"];++i)
            {
                var kk = ["img/dp2.jpg"];
                kk.push(convs[i]["name"]);
                kk.push(convs[i]["conv_id"]);
                convoData.push(kk);
            }

            for(var j = 0; j < convoData.length; ++j)
            {
                var dataObj = {
                    imgURL: convoData[j][0],
                    name: convoData[j][1],
                    convId: convoData[j][2]};

                addConversation(dataObj);
            }
        }
    };
    xmlhttp.open("POST", "./php/getConversations.php", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("user_id="+userID);
}

function populateMessages(conversationID)
{
    var messageData = getMessages(conversationID);
    for(var i = 0; i < messageData.length; ++i)
    {
        addMessage(messageData[i]);
    }
}

function getConversations(userID)
{
    
}

function getMessages(conversationID)
{
    /**
    * TODO: get list of messages from backend in the
    *       conversation with ID=conversationID
    */
    var messsageList = new Array();
	var messageData  = new Array();
    messageData[0] = [
        ["Hardik", "How's the new place?", "9:41", false],
        ["Daniel Issac", "Great! It's huge.", "9:42", true],
        ["Daniel Issac", "So I got a roommate", "9:43", true],
        ["Hardik", "What's up then?", "9:44", false],
        ["Daniel Issac", "Annoyed.", "9:45", true],
        ["Hardik", "You have the hiccups?", "9:46", false],];

	messageData[1] = [
        ["Ganesh", "How's the new place?", "9:41", false],
        ["Daniel Issac", "Great! It's huge.", "9:42", true],
        ["Daniel Issac", "So I got a roommate", "9:43", true],
        ["Ganesh", "What's up then?", "9:44", false],
        ["Daniel Issac", "Annoyed.", "9:45", true],
        ["Ganesh", "You have the hiccups?", "9:46", false],];

    for(var i = 0; i < messageData[conversationID].length; ++i)
    {
        var dataObj = {
            fromName: messageData[conversationID][i][0],
            messageText: messageData[conversationID][i][1],
            time: messageData[conversationID][i][2],
            msgLocation: messageData[conversationID][i][3]};
        messsageList.push(dataObj);
    }

    return messsageList;
}

function addConversation(coversationObj)
{
    /*Creating Elements for each convos*/
    var subLi = document.createElement("LI");
    subLi.setAttribute("id", "conv_"+coversationObj.convId);
	subLi.setAttribute("onclick", "loadCovoById(this.id)");

    var imgTag = document.createElement("IMG");
    imgTag.setAttribute("id", "dp");
    imgTag.setAttribute("class", "images");
    imgTag.setAttribute("src", coversationObj.imgURL);

    var infoDiv = document.createElement("DIV");
    infoDiv.setAttribute("class", "info");

    var userDiv = document.createElement("DIV");
    userDiv.setAttribute("class", "user");
    userDiv.appendChild(document.createTextNode(coversationObj.name));

    /*Appending Ops*/
    infoDiv.appendChild(userDiv);

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

function delMessages(){
	var parentNode = document.getElementById("mess");
	while (parentNode.firstChild)
		parentNode.removeChild(parentNode.firstChild);
	
}

function loadCovoById(i){
	delMessages();
	populateMessages(parseInt(i.replace(/\D/g, ''))-1);
	clicked(document.querySelector('#' + i) )

}

function clicked(x)
{
	if(prev)
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
function searchValue(){
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