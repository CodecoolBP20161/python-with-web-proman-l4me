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

function newButton(){
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
                colDiv.id = getBoards()[i].id;
                colDiv.className = 'col-xs-3';
                //div.innerHTML = getBoards()[i].title;
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
    newButton();
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
