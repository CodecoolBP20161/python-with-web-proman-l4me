from flask import Flask, render_template, request, jsonify
from models import *
from build import *

app = Flask('web_proman_l4me')


@app.route("/")
def index():
    return render_template('index.html')


@app.route('/saveBoard/', methods=['GET'])
def save_board():
    Board.create(title=request.args.get('title'))
    return 'Success'


@app.route('/getBoards/', methods=['GET'])
def get_boards():
    return jsonify([i.__dict__['_data'] for i in Board.select()])


@app.route('/deleteBoard/', methods=['GET'])
def delete_board():
    Card.delete().where(Card.board == Board.get(Board.id == request.args.get('boardId'))).execute()
    Board.delete().where(Board.id == request.args.get('boardId')).execute()
    return 'Success'


@app.route('/deleteCard/', methods=['GET'])
def delete_card():
    board = Board.get(Board.id == request.args.get('boardId'))
    Card.delete().where((Card.board == board) & (Card.id == request.args.get('cardId'))).execute()
    return 'Success'


@app.route('/saveCard/', methods=['GET'])
def save_card():
    Card.create(title=request.args.get('title'), board=Board.get(Board.id == request.args.get('boardId')))
    return 'Success'


@app.route('/getCardsByBoard/', methods=['GET'])
def get_cards_by_board():
    board = Board.get(Board.id == request.args.get('boardId'))
    return jsonify([i.__dict__['_data'] for i in Card.select().where(Card.board == board)])


if __name__ == "__main__":
    db.connect()
    app.run(debug=True, host='0.0.0.0')
