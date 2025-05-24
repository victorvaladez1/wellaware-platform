from flask import Blueprint, request, jsonify
from app.utils.decorators import admin_required
from app.models import db, WellNote

notes_bp = Blueprint("notes", __name__)

@notes_bp.route("/api/notes", methods=["POST"])
def add_note():
    data = request.get_json()
    well_id = data.get("well_id")
    note = data.get("note")

    if not well_id or not note:
        return jsonify({"error": "Missing well_id or note"}), 400
    
    new_note = WellNote(well_id=well_id, note=note)
    db.session.add(new_note)
    db.session.commit()

    return jsonify({
        "id": new_note.id,
        "well_id": new_note.well_id,
        "note": new_note.note,
        "created_at": new_note.created_at.isoformat()
    }), 201

@notes_bp.route("/api/notes/<int:well_id>", methods=["GET"])
def get_notes(well_id):
    notes = WellNote.query.filter_by(well_id=well_id).all()
    return jsonify([
        {
            "id": note.id,
            "note": note.note,
            "created_at": note.created_at.isoformat()
        } for note in notes
    ])