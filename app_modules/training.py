import streamlit as st
import pandas as pd
from utils.data_manager import load_data, save_data

def show():
    st.header("Training Plans")
    
    athletes_df = load_data("athletes.csv", ["name"])
    if athletes_df.empty:
        st.warning("Please add athletes first.")
        return
        
    # Load training data
    df = load_data("training.csv", ["athlete_name", "date", "exercise", "sets", "reps", "notes"])
    
    # Add new training plan
    with st.expander("Add Training Plan"):
        with st.form("new_training"):
            athlete = st.selectbox("Athlete", athletes_df["name"].tolist())
            date = st.date_input("Date")
            exercise = st.text_input("Exercise")
            sets = st.number_input("Sets", 1)
            reps = st.number_input("Reps", 1)
            notes = st.text_area("Notes")
            
            if st.form_submit_button("Add Plan"):
                new_data = pd.DataFrame([[athlete, date, exercise, sets, reps, notes]], 
                                      columns=["athlete_name", "date", "exercise", "sets", "reps", "notes"])
                df = pd.concat([df, new_data], ignore_index=True)
                save_data("training.csv", df)
                st.success("Training plan added successfully!")
                st.rerun()
    
    # Display training plans
    if not df.empty:
        athlete_filter = st.selectbox("Select Athlete", df["athlete_name"].unique(), key="training_view")
        filtered_df = df[df["athlete_name"] == athlete_filter]
        st.dataframe(filtered_df)
    else:
        st.info("No training plans available.")
