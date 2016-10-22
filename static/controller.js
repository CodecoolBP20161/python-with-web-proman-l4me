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
            displayBoards(this.getBoards(), new StorageState());
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
        displayBoards(this.getBoards(), new StorageState());
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
            displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
        };
    };

    this.deleteCard = function(boardID, cardID) {
        //update cards list
        var cards=JSON.parse(localStorage.getItem('cards'));
        cards[parseInt(boardID)].splice(storage.getCard(boardID, cardID), 1).index;

        //save changes
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
    };

    this.editCard = function(boardID, cardID) {
        if (document.getElementById('edit-title').value !== ""){
            //update cards list
            var cards=JSON.parse(localStorage.getItem('cards'));
            for (var i in cards[boardID]){
                if (cards[boardID][i].id === parseInt(cardID)){
                    cards[boardID][i].title = document.getElementById('edit-title').value;
                };
            };
        };

        //save changes
        localStorage.setItem('cards', JSON.stringify(cards));
        displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
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
        displayBoards(this.getBoards(), new StorageState());
    };

    this.deleteBoard = function(boardID) {
        ajaxRequest('/deleteBoard/?boardID=' + boardID);
        displayBoards(this.getBoards(), new StorageState());
    };

    this.getBoards = function () {
        return ajaxRequest('/getBoards/').responseJSON;
    };

    this.saveCard = function (boardID) {
        ajaxRequest('/saveCard/?title=' + document.getElementById('title').value + '&boardID=' + parseInt(boardID));
        displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
    };

    this.deleteCard = function (boardID, cardID) {
        ajaxRequest('/deleteCard/?cardID=' + cardID);
        displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
    };

    this.editCard = function (boardID, cardID) {
        ajaxRequest('/editCard/?cardID=' + cardID + '&title=' + document.getElementById('edit-title').value);
        displayCards(this.getCardsByBoard(boardID), new StorageState(), boardID, 'no-edit');
    };

    this.getCardsByBoard = function (boardID) {
        return ajaxRequest('/getCardsByBoard/?boardID=' + boardID).responseJSON;
    };
};

function StorageState() {
    this.implementation = function() {
        return new DatabaseState();
    };

    this.saveBoard = function() {
        return this.implementation().saveBoard();
    };

    this.deleteBoard = function(boardID) {
        return this.implementation().deleteBoard(boardID);
    };

    this.getBoard = function(boardID) {
        //load selected board
        boards = this.getBoards()
        for(var i in boards){
            if(boards[i].id === parseInt(boardID)){
                board = boards[i];
                board['colour'] = i % 6;
                return board;
            };
        };
    };

    this.getBoards = function () {
        return this.implementation().getBoards();
    };

    this.saveCard = function (boardID) {
        return this.implementation().saveCard(boardID);
    };

    this.deleteCard = function (boardID, cardID) {
        return this.implementation().deleteCard(boardID, cardID);
    };

    this.editCard = function (boardID, cardID) {
        return this.implementation().editCard(boardID, cardID);
    };

    this.getCard = function(boardID, cardID) {
        //load selected card
        var cards = this.getCardsByBoard(boardID);
        for (var i in cards){
            if(cards[i].id === parseInt(cardID)){
                cards[i].index = i;
                return cards[i];
            };
        };
    };

    this.getCardsByBoard = function (boardID) {
        return this.implementation().getCardsByBoard(boardID);
    };
};
