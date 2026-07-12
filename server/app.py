from flask import Flask

from config import Config

from extensions import (
    db,
    migrate,
    bcrypt,
    jwt,
    ma,
    mail
)

from flask_cors import CORS

from routes.auth import auth_bp
from routes.properties import properties_bp
from routes.favorites import favorites_bp
from routes.inquiries import inquiries_bp

# Later we'll add:
# from routes.favorites import favorites_bp
# from routes.inquiries import inquiries_bp

app = Flask(__name__)

app.config.from_object(Config)

# Allow React frontend to communicate with Flask
CORS(
    app,
    resources={
        r"/*": {
            "origins": [
                "http://localhost:5173",
                "http://127.0.0.1:5173",
                "https://pangisha-smarthouse-client-koddf69m9-d-bengos-projects.vercel.app"
            ]
        }
    },
    supports_credentials=True
)

# Initialize extensions
db.init_app(app)
migrate.init_app(app, db)
mail.init_app(app)

bcrypt.init_app(app)
jwt.init_app(app)
ma.init_app(app)

from models import *

# Register blueprints
app.register_blueprint(auth_bp)
app.register_blueprint(properties_bp)
app.register_blueprint(favorites_bp)
app.register_blueprint(inquiries_bp)
# Future blueprints
# app.register_blueprint(favorites_bp)
# app.register_blueprint(inquiries_bp)

# Health check route
@app.route("/")
def home():
    return {
        "message": "Pangisha SmartHouse API is running"
    }, 200

if __name__ == "__main__":
    app.run(
        debug=True,
        port=5555
    )
