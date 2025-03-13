import streamlit as st
import pandas as pd
from utils.data_manager import load_data, save_data

def show():
    st.header("Athlete Profiles")
    
    # Load existing athletes
    df = load_data("athletes.csv", ["name", "age", "sport", "level"])
    
    # Add new athlete form
    with st.expander("Add New Athlete"):
        with st.form("new_athlete"):
            name = st.text_input("Name")
            age = st.number_input("Age", 15, 50)
            sport = st.text_input("Sport")
            level = st.selectbox("Level", ["Amateur", "Professional", "Elite"])
            
            if st.form_submit_button("Add Athlete"):
                new_data = pd.DataFrame([[name, age, sport, level]], 
                                      columns=["name", "age", "sport", "level"])
                df = pd.concat([df, new_data], ignore_index=True)
                save_data("athletes.csv", df)
                st.success("Athlete added successfully!")
                st.rerun()
    
    # Display athletes
    if not df.empty:
        st.dataframe(df)
    else:
        st.info("No athletes registered yet.")
