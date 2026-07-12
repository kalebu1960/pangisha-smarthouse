from flask import Blueprint, request, jsonify

from extensions import db
from models.user import User

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

auth_bp = Blueprint("auth", __name__)

## Register route
@auth_bp.route("/register", methods=["POST"])
def register():

    data = request.get_json()

    username = data.get("username")
    email = data.get("email")
    password = data.get("password")
    role = data.get("role", "tenant")
    phone_number = data.get("phone_number")

    if not username or not email or not password:

        return jsonify({
            "error": "All required fields must be provided"
        }), 400

    existing_user = User.query.filter(
        (User.email == email) |
        (User.username == username)
    ).first()

    if existing_user:

        return jsonify({
            "error": "User already exists"
        }), 409

    user = User(
        username=username,
        email=email,
        role=role,
        phone_number=phone_number
    )

    user.set_password(password)

    db.session.add(user)
    db.session.commit()

    return jsonify({
        "message": "Account created successfully"
    }), 201

## Login route
@auth_bp.route("/login", methods=["POST"])
def login():

    data = request.get_json()

    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(
        email=email
    ).first()

    if not user:

        return jsonify({
            "error": "Invalid email or password"
        }), 401

    if not user.check_password(password):

        return jsonify({
            "error": "Invalid email or password"
        }), 401

    token = create_access_token(
        identity=str(user.id)
    )

    return jsonify({
        "token": token,
        "user": {
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "email": user.email
        }
    }), 200

## Current Logged user
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def me():

    user_id = get_jwt_identity()

    user = User.query.get(user_id)

    if not user:

        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify({
        "id": user.id,
        "username": user.username,
        "email": user.email,
        "role": user.role,
        "phone_number": user.phone_number
    }), 200


@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():
    data = request.get_json(silent=True) or {}
    email = (data.get("email") or "").strip().lower()

    if not email:
        return jsonify({
            "error": "Please provide your email address"
        }), 400

    user = User.query.filter_by(email=email).first()

    if user:
        # In a production app, this is where an email reset link would be sent.
        # For now we keep the response generic to avoid leaking account existence.
        pass

    return jsonify({
        "message": "If an account exists for that email, we will send reset instructions shortly."
    }), 200