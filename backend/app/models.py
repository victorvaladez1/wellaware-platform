from . import db
from datetime import datetime
import uuid

class WellNote(db.Model):
    __tablename__ = "well_notes"

    id = db.Column(db.String, primary_key=True, default=lambda: str(uuid.uuid4()))
    well_id = db.Column(db.Integer, nullable=False)
    note = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)