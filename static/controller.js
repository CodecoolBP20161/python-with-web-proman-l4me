function saveBoard() {
    if (document.getElementById('title').value !== "") {
        // define new board
        var newBoard = new Board(nextId(), document.getElementById('title').value);

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
    for (var i in allBoards) {
        if(allBoards[i].id === parseInt(boardID)) {
            allBoards.splice(i, 1);
        };
    };
    console.log(allBoards);

    //save changes
    localStorage.setItem('cards', JSON.stringify(allCards))
    localStorage.setItem('boards', JSON.stringify(allBoards));
    displayBoards();
};

function getBoard(boardID) {
    //load selected board
    for(var i in getBoards()){
        if(getBoards()[i].id === parseInt(boardID)){
            board = getBoards()[i];
            board['colour'] = i % 6;
            return board;
        };
    };
};

function getBoards() {
    //load boards list
    var boards = localStorage.getItem('boards');
    if (boards === null || JSON.parse(boards.length) === 0){
        return false;
    } else {
        boards = JSON.parse(boards)
        var boardObjects = [];
        for (var i in boards){
            boardObjects.push(new Board(boards[i].id, boards[i].title));
        };
        boards = boardObjects;
        return boards;
    };
};

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
    var cards = getCardsByBoard(boardID);
    for (var i in cards){
        if(cards[i].id === parseInt(cardID)){
            return i;
        };
    };
};

function getCardsByBoard(boardID) {
    //load cards list
    cards = JSON.parse(localStorage.getItem('cards'))[boardID];
    cardObjects = [];
    for (var i in cards){
        cardObjects.push(new Card(cards[i].id, cards[i].title, boardID));
    };
    return cardObjects;
};
