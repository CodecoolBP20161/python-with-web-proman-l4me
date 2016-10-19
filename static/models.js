function Board(boardID, title){
    this.id = boardID;
    this.title = title;
};

function Card(cardID, title, boardID){
    this.id = cardID;
    this.title = title;
    this.board = boardID;
}
