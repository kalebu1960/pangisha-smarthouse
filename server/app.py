from flask import Flask
from flask_cors import CORS

try:
    from .config import Config
    from .extensions import (
        db,
        migrate,
        bcrypt,
        jwt,
        ma,
    )
    from .routes.auth import auth_bp
    from .routes.properties import properties_bp
    from .routes.favorites import favorites_bp
    from .routes.inquiries import inquiries_bp
except ImportError:
    from config import Config
    from extensions import (
        db,
        migrate,
        bcrypt,
        jwt,
        ma,
    )
    from routes.auth import auth_bp
    from routes.properties import properties_bp
    from routes.favorites import favorites_bp
    from routes.inquiries import inquiries_bp


def create_app():
    app = Flask(__name__)

    # Load configuration
    app.config.from_object(Config)

    # Allow React frontend to communicate with Flask
    CORS(
        app,
        resources={r"/*": {"origins": ["https://deft-lily-0b05b4.netlify.app", "http://localhost:5173", "http://127.0.0.1:5173"]}},
    )

    # Initialize database first
    db.init_app(app)

    # Import all models so Flask-Migrate can detect them
    try:
        from .models import User, Property, Favorite, Inquiry, PropertyImage
    except ImportError:
        from models import User, Property, Favorite, Inquiry, PropertyImage

    # Initialize other extensions
    migrate.init_app(app, db)
    bcrypt.init_app(app)
    jwt.init_app(app)
    ma.init_app(app)

    # Register blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(properties_bp)
    app.register_blueprint(favorites_bp)
    app.register_blueprint(inquiries_bp)

    with app.app_context():
        db.create_all()

    # Health check route
    @app.route("/")
    def home():
        return {
            "message": "Pangisha SmartHouse API is running"
        }, 200

    return app


app = create_app()


if __name__ == "__main__":
    app.run(
        debug=False,
        port=5555
    )