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
    return jsonify(Board.get(Board.title == request.args.get('title')).__dict__['_data'])


if __name__ == "__main__":
    db.connect()
    app.run(debug=True, host='0.0.0.0')
