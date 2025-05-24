from flask import Blueprint, jsonify, request
from app.services.sim_api import fetch_wells, fetch_readings, fetch_alerts, fetch_alert_log

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