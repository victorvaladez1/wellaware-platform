from flask import Blueprint, jsonify, request
from app.utils.decorators import admin_required
from app.services.sim_api import (
    fetch_wells,
    fetch_readings,
    fetch_alerts,
    fetch_alert_log,
)

sim_routes = Blueprint("sim_routes", __name__)

# In-memory cache of wells for development
wells_cache = fetch_wells()

@sim_routes.route("/api/sim/wells", methods=["GET"])
def get_sim_wells():
    return jsonify(wells_cache)

@sim_routes.route("/api/sim/wells/<int:well_id>", methods=["GET"])
def get_sim_well_by_id(well_id):
    for well in wells_cache:
        if well.get("id") == well_id:
            return jsonify(well), 200
    return jsonify({"error": "Well not found"}), 404

@sim_routes.route("/api/sim/wells", methods=["POST"])
def post_sim_well():
    data = request.get_json()
    name = data.get("name")
    location = data.get("location")

    if not name or not location:
        return jsonify({"error": "Missing name or location"}), 400

    new_id = max(well["id"] for well in wells_cache) + 1 if wells_cache else 1
    new_well = {"id": new_id, "name": name, "location": location}
    wells_cache.append(new_well)
    return jsonify(new_well), 201

@sim_routes.route("/api/sim/wells/<int:well_id>", methods=["PUT"])
def update_sim_well(well_id):
    data = request.get_json()
    name = data.get("name")
    location = data.get("location")

    if not name or not location:
        return jsonify({"error": "Missing name or location"}), 400

    for well in wells_cache:
        if well["id"] == well_id:
            well["name"] = name
            well["location"] = location
            return jsonify(well), 200

    return jsonify({"error": "Well not found"}), 404

@sim_routes.route("/api/sim/wells/<int:well_id>", methods=["DELETE"])
def delete_sim_well(well_id):
    for i, well in enumerate(wells_cache):
        if well["id"] == well_id:
            wells_cache.pop(i)
            return jsonify({"message": "Well deleted"}), 200
    return jsonify({"error": "Well not found"}), 404

@sim_routes.route("/api/sim/readings", methods=["GET"])
def get_sim_readings():
    well_id = request.args.get("well_id")
    readings = fetch_readings(well_id=well_id)
    return jsonify(readings)

@sim_routes.route("/api/sim/alerts", methods=["GET"])
def get_sim_alerts():
    alerts = fetch_alerts()
    return jsonify(alerts)

@sim_routes.route("/api/sim/alert-log", methods=["GET"])
def get_sim_alert_log():
    alert_log = fetch_alert_log()
    return jsonify(alert_log)
