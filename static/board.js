function saveBoard() {
    if (document.getElementById('title').value !== "") {
        // define new board
        var newBoard = {title: document.getElementById('title').value, id: nextId()};

        //update boards list
        var boards = getBoards();
        if (boards){
            boards.push(newBoard);
        } else {
            boards = [newBoard];
        };

        //create card list for board
        var cards = JSON.parse(localStorage.getItem('cards'));
        if(cards === null){
            cards = {}
        };
        cards[newBoard['id']] = [];

        //save changes
        localStorage.setItem('boards', JSON.stringify(boards));
        localStorage.setItem('cards', JSON.stringify(cards));
        displayBoards();
    };
};

function deleteBoard(boardID) {
    //delete cards of selected board
    var allCards = JSON.parse(localStorage.getItem('cards'));
    delete allCards[boardID];

    //delete selected board
    var allBoards = getBoards();
    for (var item in allBoards) {
        if(allBoards[item]['id'] === parseInt(boardID)) {
            allBoards.splice(item, 1);
        };
    };

    //save changes
    localStorage.setItem('cards', JSON.stringify(allCards))
    localStorage.setItem('boards', JSON.stringify(allBoards));
    displayBoards();
};

function getBoard(boardID) {
    //load selected board
    colour = 0;
    for(var item in getBoards()){
        if(getBoards()[item]['id'] === parseInt(boardID)){
            board = getBoards()[item];
            board['colour'] = colour % 6;
            return board;
        };
        colour++;
    };
};

function getBoards() {
    //load boards list
    var boards = localStorage.getItem('boards');
    if (boards === null){
        return false;
    } else {
        boards = JSON.parse(boards);
        return boards;
    };
};

function displayBoards(){
    //reset content
    document.getElementById("boards_div").innerHTML = "";

    if (getBoards()){
        colour = 0;
        for(var i=0; i < getBoards().length; i++){
            if(document.getElementById(getBoards()[i].id) === null){
                //load board
                var currentBoard = getBoards()[i].id;

                //board tile
                var colDiv = document.createElement('div');
                colDiv.id = currentBoard;
                colDiv.className = 'col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2';

                //board panel
                var panelDiv = document.createElement('div');
                panelDiv.className =  'panel panel-default ';

                //delete button
                var remove = document.createElement('span');
                remove.className = 'right-icon glyphicon glyphicon-remove';
                remove.setAttribute('onclick', 'deleteBoard("' + currentBoard + '")');

                //edit button
                var edit = document.createElement('span');
                edit.className = 'right-icon glyphicon glyphicon-pencil';
                edit.setAttribute('onclick', 'displayCards("' + currentBoard + '")');

                //board content
                var panelHead = document.createElement('div');
                panelHead.className = colourPicker(colour % 6) + ' panel-heading';
                panelHead.innerHTML = getBoards()[i].title;

                //update html
                panelHead.appendChild(remove);
                panelHead.appendChild(edit);
                panelDiv.appendChild(panelHead);
                colDiv.appendChild(panelDiv);
                document.getElementById("boards_div").insertBefore(colDiv, document.getElementById("boards_div").firstChild);
                colour++;
            };
        };
    };
    newButton("boards");
};
