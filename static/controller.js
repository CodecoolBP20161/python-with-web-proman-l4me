function LocalStorageState(){
    this.saveBoard = function() {
        if (document.getElementById('title').value !== "") {
            // define new board
            var newBoard = new Board(nextId(), document.getElementById('title').value);

            //update boards list
            var boards = this.getBoards();
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
            displayBoards(this.getBoards(), new StorageState(new LocalStorageState()));
        };
    };

    this.deleteBoard = function(boardID) {
        //delete cards of selected board
        var allCards = JSON.parse(localStorage.getItem('cards'));
        delete allCards[boardID];

        //delete selected board
        var allBoards = this.getBoards();
        for (var i in allBoards) {
            if(allBoards[i].id === parseInt(boardID)) {
                allBoards.splice(i, 1);
            };
        };

        //save changes
        localStorage.setItem('cards', JSON.stringify(allCards))
        localStorage.setItem('boards', JSON.stringify(allBoards));
        displayBoards(this.getBoards(), new StorageState(new LocalStorageState()));
    };

    this.getBoards = function() {
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

    this.saveCard = function(boardID) {
        if (document.getElementById('title').value !== "") {
            //update cards list
            var cards = JSON.parse(localStorage.getItem('cards'));
            cards[boardID].push({title: document.getElementById('title').value, id: nextId()});

            //save changes
            localStorage.setItem('cards', JSON.stringify(cards));
            displayCards(this.getCardsByBoard(boardID), new StorageState(new LocalStorageState()), boardID);
        };
    };

    this.deleteCard = function(boardID, cardID) {
        //update cards list
        var cards=JSON.parse(localStorage.getItem('cards'));
        cards[parseInt(boardID)].splice(this.getCard(boardID, cardID), 1);

        //save changes
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards(this.getCardsByBoard(boardID), new StorageState(new LocalStorageState()), boardID);
    };

    this.getCardsByBoard = function(boardID) {
        //load cards list
        cards = JSON.parse(localStorage.getItem('cards'))[boardID];
        cardObjects = [];
        for (var i in cards){
            cardObjects.push(new Card(cards[i].id, cards[i].title, boardID));
        };
        return cardObjects;
    };
};

function DatabaseState() {
    this.saveBoard = function() {
        ajaxRequest('/saveBoard/?title=' + document.getElementById('title').value);
        displayBoards(this.getBoards(), new StorageState(new DatabaseState()));
    };

    this.deleteBoard = function(boardId) {
        ajaxRequest('/deleteBoard/?boardId=' + boardId);
        displayBoards(this.getBoards(), new StorageState(new DatabaseState()));
    };

    this.getBoards = function () {
        return ajaxRequest('/getBoards/').responseJSON;
    };

    this.saveCard = function (boardId) {
        ajaxRequest('/saveCard/?title=' + document.getElementById('title').value + '&boardId=' + parseInt(boardId));
        displayCards(this.getCardsByBoard(boardId), new StorageState(new LocalStorageState()), boardId);
    };

    this.deleteCard = function (boardId, cardId) {
        ajaxRequest('/deleteCard/?boardId=' + boardId + "&cardId=" + cardId);
        displayCards(this.getCardsByBoard(boardId), new StorageState(new LocalStorageState()), boardId);
    };

    this.getCardsByBoard = function (boardId) {
        return ajaxRequest('/getCardsByBoard/?boardId=' + boardId).responseJSON;
    };
};

function StorageState() {
    this.implementation = function() {
        return new DatabaseState();
    };

    this.saveBoard = function() {
        return this.implementation().saveBoard();
    };

    this.deleteBoard = function(boardId) {
        return this.implementation().deleteBoard(boardId);
    };

    this.getBoard = function(boardID) {
        //load selected board
        for(var i in this.getBoards()){
            if(this.getBoards()[i].id === parseInt(boardID)){
                board = this.getBoards()[i];
                board['colour'] = i % 6;
                return board;
            };
        };
    };

    this.getBoards = function () {
        return this.implementation().getBoards();
    };

    this.saveCard = function (boardId) {
        return this.implementation().saveCard(boardId);
    };

    this.deleteCard = function (boardId, cardId) {
        return this.implementation().deleteCard(boardId, cardId);
    };

    this.getCard = function(boardID, cardID) {
        //load selected card
        var cards = this.getCardsByBoard(boardID);
        for (var i in cards){
            if(cards[i].id === parseInt(cardID)){
                return i;
            };
        };
    };

    this.getCardsByBoard = function (boardId) {
        return this.implementation().getCardsByBoard(boardId);
    };
};
