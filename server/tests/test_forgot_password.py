import os
import sys

sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import app
from extensions import db
from models.user import User


def test_forgot_password_returns_success_for_existing_user():
    with app.test_client() as client:
        with app.app_context():
            user = User.query.filter_by(email="forgot@example.com").first()
            if user is None:
                user = User(username="forgotuser", email="forgot@example.com", role="tenant")
                user.set_password("secret123")
                db.session.add(user)
                db.session.commit()

        response = client.post(
            "/forgot-password",
            json={"email": "forgot@example.com"},
        )

        assert response.status_code == 200
        assert b"If an account exists" in response.data
