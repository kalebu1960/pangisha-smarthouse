from extensions import ma
from models.favorite import Favorite


class FavoriteSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Favorite
        load_instance = True
        include_fk = True


favorite_schema = FavoriteSchema()
favorites_schema = FavoriteSchema(many=True)