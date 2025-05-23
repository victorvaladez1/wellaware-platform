from flask import Blueprint, jsonify

main = Blueprint("main", __name__)

@main.route("/", methods=["GET"])
def root():
    return jsonify({"message": "Welcome to the WellAware Platform API!"})