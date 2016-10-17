function Board(boardId, title){
    this.id = boardId;
    this.title = title;
};

function Card(cardId, title, boardId){
    this.id = cardId;
    this.title = title;
    this.board = boardId;
}
