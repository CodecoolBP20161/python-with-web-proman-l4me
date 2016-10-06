function saveBoard() {
    if (document.getElementById('title').value !== "") {
        var newBoard = {title: document.getElementById('title').value, id: nextId()};
        var boards = getBoards();
        if (boards){
            boards.push(newBoard);
        } else {
            boards = [newBoard];
        }
        var cards = JSON.parse(localStorage.getItem('cards'));
        if(cards === null){
            cards = {}
        }
        cards[newBoard['id']] = [];
        localStorage.setItem('boards', JSON.stringify(boards));
        localStorage.setItem('cards', JSON.stringify(cards));
        displayBoards();
    }
};

function getBoards() {
    var boards = localStorage.getItem('boards');
    if (boards === null){
        return false;
    } else {
        boards = JSON.parse(boards);
        return boards;
    };
};

function getBoard(boardID) {
    for(var item in getBoards()){
        if(getBoards()[item]['id'] === parseInt(boardID)){
            return getBoards()[item];
        };
    };
};

function saveCard(boardID) {
    if (document.getElementById('title').value !== "") {
        var newCard = {title: document.getElementById('title').value, id: nextId()};
        var cards = JSON.parse(localStorage.getItem('cards'));
        cards[boardID].push(newCard);
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards(boardID);
    };
};

function getCardsByBoard(boardID) {
    var allCards = localStorage.getItem('cards');
    allCards = JSON.parse(allCards);
    cards = allCards[boardID];
    return cards;
};

function createTitle(buttonType){
    removeable = document.getElementById(buttonType);
    if (removeable !== null){
        removeable.outerHTML = '';
    }
    var remove = document.createElement('span');
    remove.className = 'glyphicon glyphicon-remove';

    var removeButton = document.createElement('button');
    removeButton.type = 'button';
    removeButton.className = 'btn btn-secondary';
    removeButton.setAttribute('onclick', 'newButton("' + buttonType + '")');

    var saveButton = document.createElement('button');
    saveButton.type = 'button';
    saveButton.className = 'btn btn-primary';
    saveButton.id = 'save-button';
    if (buttonType === 'boards'){
        saveButton.setAttribute('onclick', 'saveBoard()');
    } else {
        saveButton.setAttribute('onclick', 'saveCard("' + buttonType + '")');
    }
    saveButton.innerHTML = 'Save';

    var buttonSpan = document.createElement('span');
    buttonSpan.className = 'input-group-btn';

    var inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.className = 'form-control';
    inputField.id = 'title';
    inputField.setAttribute('onkeydown', "if (event.keyCode == 13) document.getElementById('save-button').click()");

    var inputDiv = document.createElement('div');
    inputDiv.className = 'input-group';

    var inputPanel = document.createElement('div');
    inputPanel.className = 'panel panel-default';

    removeButton.appendChild(remove);
    buttonSpan.appendChild(saveButton);
    buttonSpan.appendChild(removeButton);
    inputDiv.appendChild(inputField);
    inputDiv.appendChild(buttonSpan);
    inputPanel.appendChild(inputDiv);
    if (buttonType !== 'boards'){
        var inputFrame = inputPanel;
        inputFrame.id = buttonType;
        var appendTo = document.getElementById('card-list');
    } else {
        var inputFrame = document.createElement('div');
        inputFrame.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
        inputFrame.id = buttonType;
        inputFrame.appendChild(inputPanel);
        var appendTo = document.getElementById('boards_div');
    };
    appendTo.appendChild(inputFrame);
    document.getElementById("title").focus();
};

function newButton(buttonType){
    removeable = document.getElementById(buttonType);
    if (removeable !== null){
        removeable.outerHTML = '';
    }
    var plus = document.createElement('span');
    plus.className = 'glyphicon glyphicon-plus';

    var plusButton = document.createElement('button');
    plusButton.type = 'button';
    plusButton.className = 'btn btn-info btn-primary btn-block';

    var plusPanel = document.createElement('div');
    plusPanel.className = 'panel panel-default';
    plusPanel.setAttribute('onclick', 'createTitle("' + buttonType + '")');
    plusButton.appendChild(plus);
    plusPanel.appendChild(plusButton);
    if (buttonType !== 'boards'){
        var plusFrame = plusPanel;
        plusFrame.id = buttonType;
        var appendTo = document.getElementById('card-list');

    } else {
        var plusFrame = document.createElement('div');
        plusFrame.id = buttonType;
        plusFrame.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
        plusFrame.appendChild(plusPanel);
        var appendTo = document.getElementById('boards_div');
    };
    appendTo.appendChild(plusFrame);
};

function displayBoards(){
    document.getElementById("boards_div").innerHTML = "";
    if (getBoards()){
        for(var i=0; i < getBoards().length; i++){
            if(document.getElementById(getBoards()[i].id) === null){
                var currentBoard = getBoards()[i].id;

                var colDiv = document.createElement('div');
                colDiv.id = currentBoard;
                colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';
                colDiv.setAttribute('onclick', 'displayCards("' + currentBoard + '")');

                var panelDiv = document.createElement('div');
                panelDiv.className = 'panel panel-default';

                var panelHead = document.createElement('div');
                panelHead.className = 'panel-heading';
                panelHead.innerHTML = getBoards()[i].title;

                panelDiv.appendChild(panelHead);
                colDiv.appendChild(panelDiv);
                document.getElementById("boards_div").insertBefore(colDiv, document.getElementById("boards_div").firstChild);
            };
        };
    };
    newButton("boards");
};

function displayCards(boardID){
    document.getElementById("boards_div").innerHTML = "";
    var colDiv = document.createElement('div');
    colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';

    var panelDiv = document.createElement('div');
    panelDiv.className = 'panel panel-default';

    var panelHead = document.createElement('div');
    panelHead.className = 'panel-heading';

    var backBtn = document.createElement('span');
    backBtn.className = 'glyphicon glyphicon-chevron-left';
    backBtn.setAttribute('onclick', 'displayBoards()');
    panelHead.appendChild(backBtn);
    panelHead.innerHTML += getBoard(boardID).title;

    var panelBody = document.createElement('div');
    panelBody.className ='panel-body';
    panelBody.id = 'card-list'

    var listFrame = document.createElement('ul');
    listFrame.className = 'list-group';

    var allCards = getCardsByBoard(boardID);
    if (allCards) {
        for(var i=allCards.length-1; i >= 0; i--) {
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = allCards[i].title;
            listFrame.appendChild(listItem);
        };
    };

    panelBody.appendChild(listFrame);
    panelDiv.appendChild(panelHead);
    panelDiv.appendChild(panelBody);
    colDiv.appendChild(panelDiv);
    document.getElementById("boards_div").appendChild(colDiv);
    newButton(boardID);
};

function nextId(){
    barmi = localStorage.getItem('nextId');
    if (barmi === null){
        barmi = 0;
    } else {
        barmi = parseInt(barmi) + 1;
    };
    localStorage.setItem('nextId', JSON.stringify(barmi));
    return barmi;
}

displayBoards();
