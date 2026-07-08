from flask import Flask
from config import Config
from extensions import (
    db,
    migrate,
    bcrypt,
    jwt,
    ma
)
from flask_cors import CORS

from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.favorites import favorites_bp
from routes.inquiries import inquiries_bp

app = Flask(__name__)

# Load configuration
app.config.from_object(Config)

# Allow React frontend to communicate with Flask
CORS(app, origins=["https://deft-lily-0b05b4.netlify.app"])
# Initialize database first
db.init_app(app)

# Import all models so Flask-Migrate can detect them
from models import *

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

# Health check route
@app.route("/")
def home():
    return {
        "message": "Pangisha SmartHouse API is running"
    }, 200


if __name__ == "__main__":
    app.run(
        debug=False,
        port=5555
    )