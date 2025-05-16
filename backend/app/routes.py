from flask import Blueprint

main = Blueprint("main", __name__)

@main.route("/")
def index():
    return {"message": "WellAware platform backend is running"}