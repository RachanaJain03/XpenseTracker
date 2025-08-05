import React from "react";

const DashboardCard = ({label, amount, buttonLabel, onClick, color})=> {
   return (
    <div style={styles.card}>
        <h3>{label}: <span style={{color}}>{`₹${amount.toFixed(2)}`}</span></h3>
        <button onClick={onClick} style={{ ...styles.button, backgroundColor: color }}>
            {buttonLabel}
        </button>
        
    </div>

   )
}

const styles = {
  card: {
    backgroundColor: "#3b3b3b",
    borderRadius: "10px",
    padding: "20px",
    width: "250px",
    textAlign: "center",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
  },
  button: {
    marginTop: "10px",
    padding: "10px 16px",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default DashboardCard;