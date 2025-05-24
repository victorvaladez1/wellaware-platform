from flask import Blueprint, jsonify
from app.utils.decorators import admin_required

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the WellAware Platform API!"})