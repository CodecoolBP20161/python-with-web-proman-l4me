function saveCard(boardID) {
    if (document.getElementById('title').value !== "") {
        //define new card
        var newCard = {title: document.getElementById('title').value, id: nextId()};

        //update cards list
        var cards = JSON.parse(localStorage.getItem('cards'));
        cards[boardID].push(newCard);

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
    var cards=JSON.parse(localStorage.getItem('cards'));
    var boardCards = cards[parseInt(boardID)];
    for( var i=0; i < boardCards.length; i++){
        if(boardCards[i].id === parseInt(cardID)){
            return i;
        };
    };
};

function getCardsByBoard(boardID) {
    //load cards list
    var allCards = localStorage.getItem('cards');
    allCards = JSON.parse(allCards);
    var cards = allCards[boardID];
    return cards;
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
    var board = getBoard(boardID);
    panelHead.className = colourPicker(board.colour) + ' panel-heading';

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
        for(var i=allCards.length-1; i >= 0; i--) {

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
            listFrame.appendChild(listItem);
        };
    };

    //update html
    panelHead.appendChild(backBtn);
    panelHead.innerHTML += board.title;
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
