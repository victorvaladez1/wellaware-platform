from flask import Blueprint, jsonify, request
from app.services.sim_api import (
    fetch_wells,
    fetch_readings,
    fetch_alerts,
    fetch_alert_log,
    create_well,
    delete_well
)


sim_routes = Blueprint("sim_routes", __name__)

@sim_routes.route("/api/sim/wells", methods=["GET"])
def get_sim_wells():
    wells = fetch_wells()
    return jsonify(wells)

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

@sim_routes.route("/api/sim/wells", methods=["POST"])
def post_sim_well():
    data = request.get_json()
    name = data.get("name")
    location = data.get("location")

    if not name or not location:
        return jsonify({"error": "Missing name or location"}), 400
    
    result = create_well(name, location)
    if result:
        return jsonify(result), 201
    return jsonify({"error": "Failed to create well"}), 500

@sim_routes.route("/api/sim/wells/<int:well_id>", methods=["DELETE"])
def delete_sim_well(well_id):
    result = delete_well(well_id)
    if result.get("success"):
        return jsonify({"message": "Well deleted"}), 200
    return jsonify({"error": "Failed to delete well"}), 500