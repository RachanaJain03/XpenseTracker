import React, {useEffect, useState} from "react";

const EditExpenseModal = ({onClose, onUpdateExpense, expense})=> {
  const [title, setTitle]= useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("")
  const [date, setDate] = useState("")


  useEffect(()=>{
    if(expense){
        setTitle(expense.title)
        setAmount(expense.amount)
        setCategory(expense.category)
        setDate(expense.date)
    }
  },[expense])

  const handleSubmit = (e)=>{
    e.preventDefault();
    if(!title || !amount || !category || !date){
        alert("Please fill all the field");
        return;
    }

    
  }
  const updatedExpense = {
        ...expense,
        title,
        amount: parseFloat(amount),
        category,
        date,
    }

    
        return (
    <div style={styles.overlay}>
      <div style={styles.modal}>
        <h3>Edit Expense</h3>
        <form onSubmit={handleSubmit}>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="title"
            style={styles.input}
          />
          <input
            value={amount}
            type="number"
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Amount"
            style={styles.input}
          />
          <select
            name="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            style={styles.input}
          >
            <option value="">Select category</option>
            <option value="Food">Food</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Travel">Travel</option>
          </select>
          <input
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
            style={styles.input}
          />
          <div style={styles.buttonGroup}>
            <button type="submit" style={styles.updateBtn}>Update</button>
            <button type="button" onClick={onClose} style={styles.cancelBtn}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

const styles = {
  overlay: {
    position: "fixed", top: 0, left: 0, width: "100%", height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)", display: "flex", justifyContent: "center", alignItems: "center"
  },
  modal: {
    backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "300px"
  },
  input: {
    width: "100%", padding: "10px", margin: "5px 0", boxSizing: "border-box"
  },
  buttonGroup: {
    display: "flex", justifyContent: "space-between", marginTop: "10px"
  },
  updateBtn: {
    backgroundColor: "orange", border: "none", padding: "8px", borderRadius: "5px", color: "white", cursor: "pointer"
  },
  cancelBtn: {
    backgroundColor: "#ccc", border: "none", padding: "8px", borderRadius: "5px", cursor: "pointer"
  }
};

export default EditExpenseModal;
    
