import numpy as np
from utils.data_manager import load_data

def predict_injury_risk(athlete_name):
    """
    Simple injury risk prediction based on:
    - Recent injury history
    - Performance trends
    - Training load
    """
    injuries_df = load_data("injuries.csv", ["athlete_name", "date", "severity"])
    performance_df = load_data("performance.csv", ["athlete_name", "date", "value"])
    
    # Base risk score
    risk_score = 5.0
    
    # Factor 1: Recent injuries
    if not injuries_df.empty:
        athlete_injuries = injuries_df[injuries_df["athlete_name"] == athlete_name]
        if not athlete_injuries.empty:
            recent_injuries = len(athlete_injuries)
            avg_severity = athlete_injuries["severity"].mean()
            risk_score += min(recent_injuries * 0.5, 2.5)  # Max 2.5 points from injury history
            risk_score += min(avg_severity * 0.25, 1.5)    # Max 1.5 points from severity
    
    # Factor 2: Performance volatility
    if not performance_df.empty:
        athlete_performance = performance_df[performance_df["athlete_name"] == athlete_name]
        if not athlete_performance.empty:
            performance_std = athlete_performance["value"].std()
            risk_score += min(performance_std * 0.1, 1.0)  # Max 1 point from performance volatility
    
    # Ensure risk score stays within 0-10 range
    return min(max(risk_score, 0), 10)
