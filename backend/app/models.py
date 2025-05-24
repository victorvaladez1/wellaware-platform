from app.extensions import db
from datetime import datetime
import uuid

class WellNote(db.Model):
    __tablename__ = "well_notes"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    well_id = db.Column(db.Integer, nullable=False)
    note = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class CrewMember(db.Model):
    __tablename__ = "crew_members"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(50), nullable=False)
    phone = db.Column(db.String(20))
    email = db.Column(db.String(120), unique=True)
    assigned_well_id = db.Column(db.Integer)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class MaintenanceLog(db.Model):
    __tablename__ = "maintenance_logs"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    well_id = db.Column(db.Integer, nullable=False)
    crew_member_id = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow)