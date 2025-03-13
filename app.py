import streamlit as st
import os
from modules import athlete, performance, injury, training, finance, analytics

# Create data directory if it doesn't exist
os.makedirs("data", exist_ok=True)

st.set_page_config(page_title="Athlete Management Platform", layout="wide")

st.title("Athlete Management Platform")

# Sidebar navigation
page = st.sidebar.selectbox(
    "Navigate",
    ["Athletes", "Performance", "Injury Tracking", "Training Plans", "Finance", "Analytics"]
)

# Main content
if page == "Athletes":
    athlete.show()
elif page == "Performance":
    performance.show()
elif page == "Injury Tracking":
    injury.show()
elif page == "Training Plans":
    training.show()
elif page == "Finance":
    finance.show()
elif page == "Analytics":
    analytics.show()
