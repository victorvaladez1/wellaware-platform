from flask import Blueprint, request, jsonify
from app.utils.decorators import admin_required
from app.models import db, MaintenanceLog

maintenance_bp = Blueprint("maintenance", __name__)

@maintenance_bp.route("/api/maintenance", methods=["GET"])
def get_logs():
    logs = MaintenanceLog.query.all()
    return jsonify([
        {
            "id": log.id,
            "well_id": log.well_id,
            "description": log.description,
            "performed_by": log.performed_by,
            "timestamp": log.timestamp.isoformat()
        } for log in logs
    ])

@maintenance_bp.route("/api/maintenance", methods=["POST"])
def add_log():
    data = request.get_json()
    well_id = data.get("well_id")
    description = data.get("description")
    performed_by = data.get("performed_by")

    if not well_id or not description or not performed_by:
        return jsonify({"error": "Missing required fields"}), 400
    
    log = MaintenanceLog(
        well_id=well_id,
        description=description,
        performed_by=performed_by
    )
    db.session.add(log)
    db.session.commit()

    return jsonify({"message": "Maintenance log added."}), 201

@maintenance_bp.route("/api/maintenance/<int:id>", methods=["DELETE"])
def delete_log(id):
    log = MaintenanceLog.query.get(id)
    if not log:
        return jsonify({"error": "Log not found"}), 404
    
    db.session.delete(log)
    db.session.commit()
    return jsonify({"message": f"Log with id {id} deleted."}), 200