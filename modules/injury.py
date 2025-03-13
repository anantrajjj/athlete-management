import streamlit as st
import pandas as pd
from utils.data_manager import load_data, save_data
from utils.ml_models import predict_injury_risk

def show():
    st.header("Injury Tracking")
    
    athletes_df = load_data("athletes.csv", ["name"])
    if athletes_df.empty:
        st.warning("Please add athletes first.")
        return
        
    # Load injury data
    df = load_data("injuries.csv", ["athlete_name", "date", "type", "severity", "recovery_time"])
    
    # Add new injury record
    with st.expander("Record Injury"):
        with st.form("new_injury"):
            athlete = st.selectbox("Athlete", athletes_df["name"].tolist())
            date = st.date_input("Date")
            injury_type = st.selectbox("Type", ["Muscle", "Joint", "Bone", "Other"])
            severity = st.slider("Severity", 1, 10)
            recovery_time = st.number_input("Expected Recovery Time (days)", 1)
            
            if st.form_submit_button("Record Injury"):
                new_data = pd.DataFrame([[athlete, date, injury_type, severity, recovery_time]], 
                                      columns=["athlete_name", "date", "type", "severity", "recovery_time"])
                df = pd.concat([df, new_data], ignore_index=True)
                save_data("injuries.csv", df)
                st.success("Injury recorded successfully!")
                st.rerun()
    
    # Injury Risk Assessment
    st.subheader("Injury Risk Assessment")
    selected_athlete = st.selectbox("Select Athlete for Risk Assessment", 
                                  athletes_df["name"].tolist(),
                                  key="risk_assessment")
    if st.button("Calculate Risk"):
        risk_score = predict_injury_risk(selected_athlete)
        st.metric("Injury Risk Score", f"{risk_score:.2f}/10")
    
    # Display injury history
    if not df.empty:
        st.subheader("Injury History")
        st.dataframe(df)
    else:
        st.info("No injury records available.")
