from extensions import db
from datetime import datetime


class PropertyImage(db.Model):

    __tablename__ = "property_images"

    id = db.Column(
        db.Integer,
        primary_key=True
    )

    image_url = db.Column(
        db.String(500),
        nullable=False
    )

    is_cover = db.Column(
        db.Boolean,
        default=False
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    property_id = db.Column(
        db.Integer,
        db.ForeignKey("properties.id"),
        nullable=False
    )