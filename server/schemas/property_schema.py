from extensions import ma
from models.property import Property
from schemas.property_image_schema import PropertyImageSchema


class PropertySchema(ma.SQLAlchemyAutoSchema):

    images = ma.Nested(
        PropertyImageSchema,
        many=True
    )

    class Meta:
        model = Property
        include_fk = True
        load_instance = True
        include_relationships = True


property_schema = PropertySchema()

properties_schema = PropertySchema(many=True)