from flask import Flask
from flask_cors import CORS
from .config import Config
from app.extensions import db

from app.routes.notes import notes_bp
from app.routes.sim_routes import sim_routes
from app.routes.crew_routes import crew_bp
from app.routes.maintenance_routes import maintenance_bp
from app.routes.main import main

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    db.init_app(app)
    CORS(app)

    app.register_blueprint(notes_bp)
    app.register_blueprint(sim_routes)
    app.register_blueprint(crew_bp)
    app.register_blueprint(maintenance_bp)
    app.register_blueprint(main)

    return app
