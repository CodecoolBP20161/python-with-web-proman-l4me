function saveCard(boardID) {
    if (document.getElementById('title').value !== "") {
        //update cards list
        var cards = JSON.parse(localStorage.getItem('cards'));
        cards[boardID].push({title: document.getElementById('title').value, id: nextId()});

        //save changes
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards(boardID);
    };
};

function deleteCard(boardID, cardID) {
    //update cards list
    var cards=JSON.parse(localStorage.getItem('cards'));
    cards[parseInt(boardID)].splice(getCard(boardID, cardID), 1);

    //save changes
    localStorage.setItem('cards', JSON.stringify(cards));
    displayCards(boardID);
};

function getCard(boardID, cardID) {
    //load selected card
    var boardCards = JSON.parse(localStorage.getItem('cards'))[parseInt(boardID)];
    for(var i in boardCards){
        if(boardCards[i].id === parseInt(cardID)){
            return i;
        };
    };
};

function getCardsByBoard(boardID) {
    //load cards list
    return JSON.parse(localStorage.getItem('cards'))[boardID];
};

function displayCards(boardID){
    //reset content
    document.getElementById("boards_div").innerHTML = "";

    //board tile
    var colDiv = document.createElement('div');
    colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';

    //board panel
    var panelDiv = document.createElement('div');
    panelDiv.className = 'panel panel-default';

    //board content
    var panelHead = document.createElement('div');
    panelHead.className = colourPicker(getBoard(boardID).colour) + ' panel-heading';

    //back button
    var backBtn = document.createElement('span');
    backBtn.className = 'glyphicon glyphicon-chevron-left';
    backBtn.id = 'back-button';
    backBtn.setAttribute('onclick', 'displayBoards()');

    //cards container
    var panelBody = document.createElement('div');
    panelBody.className ='panel-body';
    panelBody.id = 'card-list'

    //cards list
    var listFrame = document.createElement('ul');
    listFrame.className = 'list-group';
    var allCards = getCardsByBoard(boardID);
    if (allCards) {
        for(var i in allCards) {
            //cards content
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = allCards[i].title;

            //delete button
            var remove = document.createElement('span');
            remove.className = 'right-icon glyphicon glyphicon-remove';
            remove.setAttribute('onclick', 'deleteCard("' + boardID + '", "' + allCards[i].id + '")');

            //insert card to list
            listItem.appendChild(remove);
            listFrame.insertBefore(listItem, listFrame.firstChild);
        };
    };

    //update html
    panelHead.appendChild(backBtn);
    panelHead.innerHTML += getBoard(boardID).title;
    panelBody.appendChild(listFrame);
    panelDiv.appendChild(panelHead);
    panelDiv.appendChild(panelBody);
    colDiv.appendChild(panelDiv);
    document.getElementById("boards_div").appendChild(colDiv);
    document.body.setAttribute('onkeydown', "if (event.keyCode == 8 &&\
                               document.getElementById('title') !== document.activeElement)\
                               document.getElementById('back-button').click()");
    newButton(boardID);
};
