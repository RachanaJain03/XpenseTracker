import React, { useState } from "react"

const AddIncomeModal = ({ onClose, onAddIncome})=>{
   const [income, setIncome] = useState("");

   const handleSubmit = (e) => {
     e.preventDefault()
     const amount = parseFloat(income);
     if(!amount || amount <= 0){
        alert("Please enter a valid amount");
        return;
     }
     onAddIncome(amount);
     setIncome("");
     onClose()
   }
   return(
    <div style={styles.overlay}>
        <div style={styles.modal}>
            <h3>Add Balance</h3>
            <form onSubmit={handleSubmit}>
                <input
                 type="number"
                 placeholder="Income Amount"
                 value={income}
                 onChange={(e) => setIncome(e.target.value)}
                 style={styles.input}
                 />
                 <div style={styles.buttonGroup}>
                    <button type="submit" style={styles.addBtn}>Add Balance</button>
                    <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
                 </div>
            </form>
        </div>
    </div>
   )
}

const styles = {
    overlay: {
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)", display: "flex",
        justifyContent: "center", alignItems: "center", zIndex: 9999,
    },
    modal: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "300px"
  },
  input: {
    width: "100%", padding: "10px", margin: "10px 0"
  },
  buttonGroup: {
    display: "flex", justifyContent: "space-between", marginTop: "10px"
  },
  addBtn: {
    backgroundColor: "orange", border: "none", padding: "8px", borderRadius: "5px"
  },
  cancelBtn: {
    backgroundColor: "#ccc", border: "none", padding: "8px", borderRadius: "5px"
  }
}

export default AddIncomeModal;