from extensions import ma
from models.property_image import PropertyImage


class PropertyImageSchema(ma.SQLAlchemyAutoSchema):

    class Meta:
        model = PropertyImage
        load_instance = True


property_image_schema = PropertyImageSchema()

property_images_schema = PropertyImageSchema(
    many=True
)