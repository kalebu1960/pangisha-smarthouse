from extensions import db
from datetime import datetime

class Property(db.Model):

    __tablename__ = "properties"

    id = db.Column(db.Integer, primary_key=True)

    title = db.Column(db.String(200))

    description = db.Column(db.Text)

    price = db.Column(db.Float)

    bedrooms = db.Column(db.Integer)

    bathrooms = db.Column(db.Integer)

    property_type = db.Column(db.String(100))

    images = db.relationship(
    "PropertyImage",
    backref="property",
    cascade="all, delete-orphan"
    )

    location_name = db.Column(db.String(255))

    latitude = db.Column(db.Float)

    longitude = db.Column(db.Float)

    contact_phone = db.Column(db.String(20))

    is_available = db.Column(
        db.Boolean,
        default=True
    )

    is_verified = db.Column(
        db.Boolean,
        default=False
    )

    views = db.Column(
        db.Integer,
        default=0
    )

    created_at = db.Column(
        db.DateTime,
        default=datetime.utcnow
    )

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("users.id")
    )

    favorites = db.relationship(
        "Favorite",
        backref="property",
        cascade="all, delete"
    )

    inquiries = db.relationship(
        "Inquiry",
        backref="property",
        cascade="all, delete"
    )