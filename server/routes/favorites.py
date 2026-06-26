from flask import Blueprint, jsonify

from flask_jwt_extended import (
    jwt_required,
    get_jwt_identity
)

from extensions import db

from models.favorite import Favorite
from models.property import Property
from models.user import User

from schemas.favorite_schema import (
    favorite_schema,
    favorites_schema
)

favorites_bp = Blueprint(
    "favorites",
    __name__
)

## Add favorite
@favorites_bp.route(
    "/favorites/<int:property_id>",
    methods=["POST"]
)
@jwt_required()
def add_favorite(property_id):

    user_id = get_jwt_identity()

    property = Property.query.get(property_id)

    if not property:

        return jsonify({
            "error":"Property not found"
        }),404

    existing = Favorite.query.filter_by(
        user_id=user_id,
        property_id=property_id
    ).first()

    if existing:

        return jsonify({
            "message":"Already saved"
        }),200

    favorite = Favorite(
        user_id=user_id,
        property_id=property_id
    )

    db.session.add(favorite)
    db.session.commit()

    return favorite_schema.jsonify(
        favorite
    ),201

## Get user favorites
@favorites_bp.route(
    "/favorites",
    methods=["GET"]
)
@jwt_required()
def get_favorites():

    user_id = get_jwt_identity()

    favorites = Favorite.query.filter_by(
        user_id=user_id
    ).all()

    return favorites_schema.jsonify(
        favorites
    )

## Remove Favorite
@favorites_bp.route(
    "/favorites/<int:id>",
    methods=["DELETE"]
)
@jwt_required()
def delete_favorite(id):

    user_id = get_jwt_identity()

    favorite = Favorite.query.get(id)

    if not favorite:

        return jsonify({
            "error":"Favorite not found"
        }),404

    if favorite.user_id != int(user_id):

        return jsonify({
            "error":"Unauthorized"
        }),403

    db.session.delete(favorite)

    db.session.commit()

    return jsonify({
        "message":"Removed successfully"
    })
