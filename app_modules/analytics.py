import streamlit as st
import pandas as pd
import plotly.express as px
from utils.data_manager import load_data

def show():
    st.header("Analytics Dashboard")
    
    # Load all data
    athletes_df = load_data("athletes.csv", ["name", "age", "sport", "level"])
    performance_df = load_data("performance.csv", ["athlete_name", "date", "metric", "value"])
    injuries_df = load_data("injuries.csv", ["athlete_name", "date", "type", "severity"])
    
    if athletes_df.empty:
        st.warning("No data available for analysis.")
        return
    
    # Overall Statistics
    st.subheader("Overall Statistics")
    col1, col2, col3 = st.columns(3)
    col1.metric("Total Athletes", len(athletes_df))
    col2.metric("Sports Covered", len(athletes_df["sport"].unique()))
    if not injuries_df.empty:
        col3.metric("Injury Rate", f"{(len(injuries_df)/len(athletes_df)):.2f} per athlete")
    
    # Performance Analysis
    if not performance_df.empty:
        st.subheader("Performance Trends")
        metric = st.selectbox("Select Metric", performance_df["metric"].unique())
        filtered_perf = performance_df[performance_df["metric"] == metric]
        
        fig = px.line(filtered_perf, x="date", y="value", color="athlete_name",
                     title=f"{metric} - All Athletes")
        st.plotly_chart(fig)
    
    # Injury Analysis
    if not injuries_df.empty:
        st.subheader("Injury Analysis")
        fig = px.histogram(injuries_df, x="type", title="Injury Distribution")
        st.plotly_chart(fig)
    
    # Export Data
    st.subheader("Export Data")
    if st.button("Export All Data"):
        # Prepare data for export
        with pd.ExcelWriter("athlete_data_export.xlsx") as writer:
            athletes_df.to_excel(writer, sheet_name="Athletes", index=False)
            if not performance_df.empty:
                performance_df.to_excel(writer, sheet_name="Performance", index=False)
            if not injuries_df.empty:
                injuries_df.to_excel(writer, sheet_name="Injuries", index=False)
        st.success("Data exported successfully!")
