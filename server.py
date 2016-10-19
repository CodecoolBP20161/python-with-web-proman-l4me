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
    boards = [i.__dict__['_data'] for i in Board.select()]
    return jsonify(boards)


@app.route('/deleteBoard/', methods=['GET'])
def delete_board():
    Board.delete().where(Board.id == request.args.get('boardId')).execute()
    return 'Success'


@app.route('/getBoard/', methods=['GET'])
def get_board():
    board = Board.get(Board.id == request.args.get('boardID')).__dict__['_data']
    return jsonify(board)


@app.route('/saveCard/', methods=['GET'])
def save_card():
    board = Board.get(Board.id == request.args.get('boardId'))
    print(board.id)
    Card.create(title=request.args.get('title'), board=board)
    return 'Success'


if __name__ == "__main__":
    db.connect()
    app.run(debug=True, host='0.0.0.0')
