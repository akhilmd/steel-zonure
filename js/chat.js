window.onload = init;

function init()
{
    var userID = 2;

    populateConversations(userID);

    var currentConversationId = 1;

    populateMessages(currentConversationId);
}

function populateConversations(userID)
{
    var convoData = getConversations(userID);
    for(var i = 0; i<convoData.length; ++i)
    {
        addConversation(convoData[i]);
    }
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
    /**
    * TODO: get list of conversations from backend in which 
    *       user with ID=userID is a participant.
    */
    var convoList = new Array();
    var convoData = [
        ["img/dp1.jpg", "Hardik", "1"],
        ["img/dp2.jpg", "Ganesh", "2"],
        ["img/dp3.jpg", "Daniel Issac", "3"],
        ["img/dp4.jpg", "Gurunandan", "4"],
        ["img/dp5.jpg", "Hiranmaya Gundu", "5"],
        ["img/dp6.jpg", "Gavrish", "6"]];

    for(var i = 0; i < convoData.length; ++i)
    {
        var dataObj = {
            imgURL: convoData[i][0],
            name: convoData[i][1],
            convId: convoData[i][2]};

        convoList.push(dataObj);
    }

    return convoList;
}

function getMessages(conversationID)
{
    /**
    * TODO: get list of messages from backend in the
    *       conversation with ID=conversationID
    */
    var messsageList = new Array();
    var messageData = [
        ["Ganesh", "How's the new place?", "9:41", false],
        ["Daniel Issac", "Great! It's huge.", "9:42", false],
        ["Daniel Issac", "So I got a roommate", "9:43", false],
        ["Ganesh", "What's up then?", "9:44", false],
        ["Daniel Issac", "Annoyed.", "9:45", false],
        ["Ganesh", "You have the hiccups?", "9:46", false],];

    for(var i = 0; i < messageData.length; ++i)
    {
        var dataObj = {
            fromName: messageData[i][0],
            messageText: messageData[i][1],
            time: messageData[i][2],
            hasRead: messageData[i][3]};

        messsageList.push(dataObj);
    }

    return messsageList;
}

function addConversation(coversationObj)
{
    /*Creating Elements for each convos*/
    var subLi = document.createElement("LI");
    subLi.setAttribute("id", "conv_"+coversationObj.convId);

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
}

function addMessage(messageObj)
{
    /*Get required data from backend*/
    var timeStamp = messageObj.time;
    var name = messageObj.fromName;
    var msg = messageObj.messageText;
    var hasRead = messageObj.hasRead;

    /*Creating child nodes of each message*/
    var subLI = document.createElement("LI");
    subLI.className = "i";

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
}