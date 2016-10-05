function saveBoard() {
    var newBoard = {title: document.getElementById('title').value, id: nextId()};
    var boards = getBoards();
    if (boards){
        boards.push(newBoard);
    } else {
        boards = [newBoard];
    }
    localStorage.setItem('boards', JSON.stringify(boards));
    displayBoards();
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
        inputPanel.id = buttonType;
        var appendTo = document.getElementById('card-list');
    } else {
        var inputCol = document.createElement('div');
        inputCol.id = buttonType;
        inputCol.className = 'col-xs-3';
        inputCol.appendChild(inputPanel);
        inputPanel = inputCol;
        var appendTo = document.getElementById('boards_div');
    };
    appendTo.appendChild(inputPanel);
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
        plusPanel.id = buttonType;
        var appendTo = document.getElementById('card-list');

    } else {
        var plusCol = document.createElement('div');
        plusCol.id = buttonType;
        plusCol.className = 'col-xs-3';
        plusCol.appendChild(plusPanel);
        plusPanel = plusCol;
        var appendTo = document.getElementById('boards_div');
    };
    appendTo.appendChild(plusPanel);
};

function displayBoards(){
    if (getBoards()){
        for(var i=0; i < getBoards().length; i++){
            if(document.getElementById(getBoards()[i].id) === null){
                var colDiv = document.createElement('div');
                var currentBoard = getBoards()[i].id;
                colDiv.id = currentBoard;
                colDiv.className = 'col-xs-3';
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
    colDiv.className = 'col-xs-3';
    var panelDiv = document.createElement('div');
    panelDiv.className = 'panel panel-default';
    var panelHead = document.createElement('div');
    panelHead.className = 'panel-heading';
    panelHead.innerHTML = getBoards()[boardID].title;
    var panelBody = document.createElement('div');
    panelBody.className ='panel-body';
    var list = document.createElement('ul');
    list.className = 'list-group';
    list.id = 'card-list';
    var allCards = getCardsByBoard(boardID);
    if (allCards) {
        for(var i=allCards.length-1; i >= 0; i--) {
            var listItem = document.createElement('li');
            listItem.className = 'list-group-item';
            listItem.innerHTML = allCards[i].title;
            list.appendChild(listItem);
        };
    };
    list.appendChild(newButton(boardID));
    panelBody.appendChild(list);
    panelDiv.appendChild(panelHead);
    panelDiv.appendChild(panelBody);
    colDiv.appendChild(panelDiv);
    document.getElementById("boards_div").appendChild(colDiv);
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
