from peewee import *

db = PostgresqlDatabase('lamepro_man')


class BaseModel(Model):
    class Meta:
        database = db


class Board(BaseModel):
    title = CharField()


class Card(BaseModel):
    title = CharField()
    board = ForeignKeyField(Board, related_name="cards")
