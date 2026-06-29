from flask import Blueprint, request, jsonify

from extensions import db

from models.property import Property
from models.property_image import PropertyImage
from models.user import User

from schemas.property_schema import (
    property_schema,
    properties_schema
)

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from utils.decorators import landlord_required

properties_bp = Blueprint(
    "properties",
    __name__
)

# ===========================
# Get all properties
# ===========================
@properties_bp.route("/properties", methods=["GET"])
def get_properties():

    query = Property.query

    # Search title/description
    search = request.args.get("search")
    if search:
        query = query.filter(
            (Property.title.ilike(f"%{search}%")) |
            (Property.description.ilike(f"%{search}%"))
        )

    # Filter by location
    location = request.args.get("location")
    if location:
        query = query.filter(
            Property.location_name.ilike(f"%{location}%")
        )

    # Filter by bedrooms
    bedrooms = request.args.get("bedrooms", type=int)
    if bedrooms:
        query = query.filter(
            Property.bedrooms >= bedrooms
        )

    # Filter by max price
    max_price = request.args.get("max_price", type=float)
    if max_price:
        query = query.filter(
            Property.price <= max_price
        )

    # Filter by property type
    property_type = request.args.get("property_type")
    if property_type:
        query = query.filter(
            Property.property_type == property_type
        )

    # Pagination
    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 12, type=int)

    paginated = query.order_by(
        Property.created_at.desc()
    ).paginate(
        page=page,
        per_page=per_page,
        error_out=False
    )

    return jsonify({
        "total": paginated.total,
        "page": paginated.page,
        "pages": paginated.pages,
        "results": properties_schema.dump(
            paginated.items
        )
    })


# ===========================
# Get one property
# ===========================
@properties_bp.route("/properties/<int:id>", methods=["GET"])
def get_property(id):

    property = Property.query.get(id)

    if not property:
        return jsonify({
            "error": "Property not found"
        }), 404

    return property_schema.jsonify(property), 200


# ===========================
# Create property
# ===========================
@properties_bp.route("/properties", methods=["POST"])
@jwt_required()
@landlord_required
def create_property():

    user_id = int(get_jwt_identity())

    data = request.get_json()

    property = Property(
        title=data["title"],
        description=data["description"],
        price=data["price"],
        bedrooms=data["bedrooms"],
        bathrooms=data["bathrooms"],
        property_type=data["property_type"],
        location_name=data["location_name"],
        latitude=data.get("latitude"),
        longitude=data.get("longitude"),
        contact_phone=data["contact_phone"],
        user_id=user_id
    )

    db.session.add(property)
    db.session.flush()

    images = data.get("images", [])

    for index, img in enumerate(images):

        property_image = PropertyImage(
            image_url=img["image_url"],
            is_cover=img.get(
                "is_cover",
                index == 0
            ),
            property_id=property.id
        )

        db.session.add(property_image)

    db.session.commit()

    return property_schema.jsonify(property), 201


# ===========================
# Update property
# ===========================
@properties_bp.route("/properties/<int:id>", methods=["PATCH"])
@jwt_required()
def update_property(id):

    user_id = int(get_jwt_identity())

    property = Property.query.get(id)

    if not property:
        return jsonify({
            "error": "Property not found"
        }), 404

    if property.user_id != user_id:
        return jsonify({
            "error": "Unauthorized"
        }), 403

    data = request.get_json()

    for key, value in data.items():
        if key != "images":
            setattr(property, key, value)

    if "images" in data:

        PropertyImage.query.filter_by(
            property_id=id
        ).delete()

        for index, img in enumerate(data["images"]):

            new_image = PropertyImage(
                image_url=img["image_url"],
                is_cover=img.get(
                    "is_cover",
                    index == 0
                ),
                property_id=id
            )

            db.session.add(new_image)

    db.session.commit()

    return property_schema.jsonify(property), 200


# ===========================
# Delete property
# ===========================
@properties_bp.route("/properties/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_property(id):

    user_id = int(get_jwt_identity())

    property = Property.query.get(id)

    if not property:
        return jsonify({
            "error": "Property not found"
        }), 404

    if property.user_id != user_id:
        return jsonify({
            "error": "Unauthorized"
        }), 403

    db.session.delete(property)
    db.session.commit()

    return jsonify({
        "message": "Property deleted"
    }), 200


# ===========================
# Landlord dashboard
# ===========================
@properties_bp.route("/my-properties", methods=["GET"])
@jwt_required()
def my_properties():

    user_id = int(get_jwt_identity())

    properties = Property.query.filter_by(
        user_id=user_id
    ).order_by(
        Property.created_at.desc()
    ).all()

    return properties_schema.jsonify(properties), 200