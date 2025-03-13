import numpy as np
import pandas as pd
from utils.data_manager import load_data

def analyze_performance_trend(athlete_name):
    """Analyze historical performance data to identify trends"""
    performance_df = load_data("performance.csv", ["athlete_name", "date", "metric", "value"])
    if not performance_df.empty:
        athlete_perf = performance_df[performance_df["athlete_name"] == athlete_name]
        if not athlete_perf.empty:
            return athlete_perf["value"].mean(), athlete_perf["value"].std()
    return 0, 0

def predict_career_path(athlete_name):
    """
    Predict potential career paths based on:
    - Performance trends
    - Training consistency
    - Injury history
    - Current level
    """
    # Load athlete data
    athletes_df = load_data("athletes.csv", ["name", "age", "sport", "level"])
    training_df = load_data("training.csv", ["athlete_name", "date", "exercise", "sets", "reps"])
    injuries_df = load_data("injuries.csv", ["athlete_name", "date", "type", "severity"])
    
    athlete = athletes_df[athletes_df["name"] == athlete_name]
    if athlete.empty:
        return {
            "success": False,
            "error": "Athlete not found"
        }
    
    # Analyze performance trends
    perf_mean, perf_std = analyze_performance_trend(athlete_name)
    
    # Calculate training consistency
    training_consistency = 0
    if not training_df.empty:
        athlete_training = training_df[training_df["athlete_name"] == athlete_name]
        training_consistency = len(athlete_training)
    
    # Analyze injury history
    injury_risk = 0
    if not injuries_df.empty:
        athlete_injuries = injuries_df[injuries_df["athlete_name"] == athlete_name]
        injury_risk = len(athlete_injuries)
    
    # Calculate potential score (0-100)
    base_score = 70  # Start with base potential
    score = base_score
    
    # Adjust score based on factors
    score += min(perf_mean * 0.5, 15)  # Performance impact (max +15)
    score -= min(perf_std * 0.3, 10)   # Consistency impact (max -10)
    score += min(training_consistency * 0.2, 10)  # Training impact (max +10)
    score -= min(injury_risk * 2, 15)   # Injury impact (max -15)
    
    # Ensure score stays within 0-100 range
    score = max(min(score, 100), 0)
    
    # Determine career path recommendations
    career_paths = []
    if score >= 85:
        career_paths.append("Professional Athlete")
        career_paths.append("Elite Competition")
    elif score >= 70:
        career_paths.append("Semi-Professional")
        career_paths.append("Regional Competition")
    elif score >= 50:
        career_paths.append("Amateur Competition")
        career_paths.append("Local Leagues")
    else:
        career_paths.append("Recreational Sports")
        career_paths.append("Fitness Focus")
    
    return {
        "success": True,
        "potential_score": round(score, 1),
        "career_paths": career_paths,
        "factors": {
            "performance_level": round(perf_mean, 2),
            "consistency": round(perf_std, 2),
            "training_dedication": training_consistency,
            "injury_risk": injury_risk
        }
    }
