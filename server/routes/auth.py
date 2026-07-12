from flask import Blueprint, request, jsonify

from extensions import db
from models.user import User

from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity
)

from flask_mail import Message
from extensions import mail
from utils.token_utils import generate_reset_token, verify_reset_token

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

@auth_bp.route("/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json()

    email = data.get("email")

    if not email:
        return jsonify({
            "error": "Email is required"
        }), 400

    user = User.query.filter_by(email=email).first()

    # Always return the same response for security
    if not user:
        return jsonify({
            "message": "If that email exists, a password reset link has been sent."
        }), 200

    token = generate_reset_token(user.email)

    reset_link = f"http://localhost:5173/reset-password/{token}"

    msg = Message(
        subject="Reset Your Pangisha SmartHouse Password",
        recipients=[user.email]
    )

    msg.body = f"""
Hello {user.username},

We received a request to reset your password.

Click the link below to reset it:

{reset_link}

This link will expire in 30 minutes.

If you didn't request this, you can safely ignore this email.

Regards,
Pangisha SmartHouse Team
"""

    mail.send(msg)

    return jsonify({
        "message": "If that email exists, a password reset link has been sent."
    }), 200

@auth_bp.route("/reset-password/<token>", methods=["POST"])
def reset_password(token):

    email = verify_reset_token(token)

    if not email:
        return jsonify({
            "error": "Invalid or expired token"
        }), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    data = request.get_json()

    password = data.get("password")

    if not password:
        return jsonify({
            "error": "Password is required"
        }), 400

    user.set_password(password)

    db.session.commit()

    return jsonify({
        "message": "Password reset successfully"
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