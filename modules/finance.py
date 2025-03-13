import streamlit as st
import pandas as pd
import plotly.express as px
from utils.data_manager import load_data, save_data

def show():
    st.header("Financial Management")
    
    athletes_df = load_data("athletes.csv", ["name"])
    if athletes_df.empty:
        st.warning("Please add athletes first.")
        return
        
    # Load financial data
    df = load_data("finances.csv", ["athlete_name", "date", "type", "amount", "category"])
    
    # Add new financial record
    with st.expander("Add Financial Record"):
        with st.form("new_finance"):
            athlete = st.selectbox("Athlete", athletes_df["name"].tolist())
            date = st.date_input("Date")
            trans_type = st.selectbox("Type", ["Income", "Expense"])
            amount = st.number_input("Amount", 0.0)
            category = st.selectbox("Category", ["Training", "Equipment", "Competition", "Sponsorship", "Other"])
            
            if st.form_submit_button("Add Record"):
                new_data = pd.DataFrame([[athlete, date, trans_type, amount, category]], 
                                      columns=["athlete_name", "date", "type", "amount", "category"])
                df = pd.concat([df, new_data], ignore_index=True)
                save_data("finances.csv", df)
                st.success("Financial record added successfully!")
                st.rerun()
    
    # Financial Analysis
    if not df.empty:
        athlete_filter = st.selectbox("Select Athlete", df["athlete_name"].unique(), key="finance_view")
        filtered_df = df[df["athlete_name"] == athlete_filter]
        
        # Summary metrics
        income = filtered_df[filtered_df["type"] == "Income"]["amount"].sum()
        expenses = filtered_df[filtered_df["type"] == "Expense"]["amount"].sum()
        balance = income - expenses
        
        col1, col2, col3 = st.columns(3)
        col1.metric("Total Income", f"${income:,.2f}")
        col2.metric("Total Expenses", f"${expenses:,.2f}")
        col3.metric("Balance", f"${balance:,.2f}")
        
        # Category breakdown
        fig = px.pie(filtered_df, values="amount", names="category", 
                    title=f"Financial Breakdown - {athlete_filter}")
        st.plotly_chart(fig)
    else:
        st.info("No financial records available.")
