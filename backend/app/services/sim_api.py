import os
import requests

SIM_API_BASE = os.getenv("SIM_API_BASE_URL", "https://wellaware-sim.onrender.com")

def fetch_wells():
    try:
        res = requests.get(f"{SIM_API_BASE}/api/wells")
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Error fetching wells:", e)
        return []
    
def fetch_readings(well_id=None):
    try:
        url = f"{SIM_API_BASE}/api/readings"
        if well_id:
            url += f"?well_id={well_id}"
        res = requests.get(url)
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Error fetching readings:", e)
        return []
    
def fetch_alerts():
    try:
        res = requests.get(f"{SIM_API_BASE}/api/alerts")
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Error fetching alerts:", e)
        return []
    
def fetch_alert_log():
    try:
        res = requests.get(f"{SIM_API_BASE}/api/alert-log")
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Error fetching alert log:", e)
        return []
    
def create_well(name, location):
    try:
        res = requests.post(
            f"{SIM_API_BASE}/api/wells",
            json={"name": name, "location": location}
        )
        res.raise_for_status()
        return res.json()
    except Exception as e:
        print("Error creating well:", e)
        return None
    
def delete_well(well_id):
    try: 
        res = requests.delete(f"{SIM_API_BASE}/api/wells/{well_id}")
        res.raise_for_status()
        return {"success": True}
    except Exception as e:
        print("Error deleting well:", e)
        return {"success": False}