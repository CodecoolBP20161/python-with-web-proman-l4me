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

function createBoard(){
    var createButton = document.getElementById('create-button');
    createButton.style.display = 'none';
    var boardInput = document.getElementById('new-board');
    boardInput.style.display = 'block';
    document.getElementById("title").focus();
};

function newButton(buttonType){
    var createButton = document.getElementById('create-button');
    createButton.style.display = 'block';
    var boardInput = document.getElementById('new-board');
    boardInput.style.display = 'none';
    var inputField = document.getElementById('title');
    inputField.value = '';
};

function displayBoards(){
    if (getBoards()){
        for(var i=0; i < getBoards().length; i++){
            if(document.getElementById(getBoards()[i].id) === null){
                var colDiv = document.createElement('div');
                var currentBoard = getBoards()[i].id;
                colDiv.id = currentBoard;
                colDiv.className = 'col-xs-3';
                colDiv.setAttribute('onclick', 'displayCards(' + currentBoard + ')');
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
    document.getElementById("boards_div").appendChild(newButton("boards"));
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
