from extensions import ma

from models.favorite import Favorite

from schemas.property_schema import PropertySchema


class FavoriteSchema(ma.SQLAlchemyAutoSchema):

    property = ma.Nested(
        PropertySchema
    )

    class Meta:
        model = Favorite
        load_instance = True
        include_fk = True


favorite_schema = FavoriteSchema()

favorites_schema = FavoriteSchema(
    many=True
)