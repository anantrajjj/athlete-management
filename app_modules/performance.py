import streamlit as st
import pandas as pd
import plotly.express as px
from utils.data_manager import load_data, save_data

def show():
    st.header("Performance Metrics")
    
    athletes_df = load_data("athletes.csv", ["name"])
    if athletes_df.empty:
        st.warning("Please add athletes first.")
        return
        
    # Load performance data
    df = load_data("performance.csv", ["athlete_name", "date", "metric", "value"])
    
    # Add new performance metric
    with st.expander("Add Performance Metric"):
        with st.form("new_metric"):
            athlete = st.selectbox("Athlete", athletes_df["name"].tolist())
            date = st.date_input("Date")
            metric = st.selectbox("Metric", ["Speed (km/h)", "Strength (kg)", "Endurance (min)"])
            value = st.number_input("Value", 0.0)
            
            if st.form_submit_button("Add Metric"):
                new_data = pd.DataFrame([[athlete, date, metric, value]], 
                                      columns=["athlete_name", "date", "metric", "value"])
                df = pd.concat([df, new_data], ignore_index=True)
                save_data("performance.csv", df)
                st.success("Metric added successfully!")
                st.rerun()
    
    # Display performance trends
    if not df.empty:
        athlete_filter = st.selectbox("Select Athlete", df["athlete_name"].unique())
        filtered_df = df[df["athlete_name"] == athlete_filter]
        
        fig = px.line(filtered_df, x="date", y="value", color="metric",
                     title=f"Performance Trends - {athlete_filter}")
        st.plotly_chart(fig)
    else:
        st.info("No performance data available.")
