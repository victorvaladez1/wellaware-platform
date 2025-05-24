from flask import Blueprint, request, jsonify
from app.utils.decorators import admin_required
from app.models import db, CrewMember

crew_bp = Blueprint("crew", __name__)

@crew_bp.route("/api/crew", methods=["GET"])
def get_crew():
    crew = CrewMember.query.all()
    return jsonify([
        {
            "id": member.id,
            "name": member.name,
            "role": member.role,
            "phone": member.phone,
            "email": member.email,
            "assigned_well_id": member.assigned_well_id
        } for member in crew
    ])

@crew_bp.route("/api/crew", methods=["POST"])
def add_crew_member():
    data = request.get_json()
    name = data.get("name")
    role = data.get("role")
    phone = data.get("phone")
    email = data.get("email")
    assigned_well_id = data.get("assigned_well_id")

    if not name or not role:
        return jsonify({"error": "Missing required fields"}), 400

    member = CrewMember(
        name=name,
        role=role,
        phone=phone,
        email=email,
        assigned_well_id=assigned_well_id
    )
    db.session.add(member)
    db.session.commit()

    return jsonify({"message": "Crew member added"}), 201

@crew_bp.route("/api/crew/<int:id>", methods=["DELETE"])
@admin_required
def delete_crew_member(id):
    member = CrewMember.query.get(id)
    if not member:
        return jsonify({"error": "Crew member not found"}), 404
    db.session.delete(member)
    db.session.commit()
    return jsonify({"message": "Crew member deleted"}), 200
