from models import *

db.connect()
db.create_tables([Board, Card], safe=True)
