import pandas as pd
import os
import streamlit as st

def load_data(filename, columns):
    filepath = os.path.join("data", filename)
    try:
        if os.path.exists(filepath):
            return pd.read_csv(filepath)
        else:
            return pd.DataFrame(columns=columns)
    except Exception as e:
        st.error(f"Error loading data: {str(e)}")
        return pd.DataFrame(columns=columns)

def save_data(filename, df):
    filepath = os.path.join("data", filename)
    try:
        df.to_csv(filepath, index=False)
    except Exception as e:
        st.error(f"Error saving data: {str(e)}")