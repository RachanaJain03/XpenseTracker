import React, {useState} from "react";

const AddExpenseModal = ({ onClose, onAddExpense, walletBalance}) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");
    const [category, setCategory] = useState("");
    const [date, setDate] = useState("");

    const handleSubmit = (e) =>{
        e.preventDefault();
        const expenseAmount = parseFloat(amount);

        if(!title || !amount || !category || !date){
            alert("Please fill all the fields");
            return;
        }
        if(expenseAmount > walletBalance){
            alert("you don't have enough balance")
            return;
        }
        const expenseData = {
            id: Date.now(),
            title,
            amount: expenseAmount,
            category,
            date
        }

        onAddExpense(expenseData);
        setTitle("");
        setAmount("");
        setCategory("");
        setDate("");

        onClose()
    }

    return (
        <div style={styles.overlay}>
            <div style={styles.modal}>
                <h3>Add Expenses</h3>
                <form onSubmit={handleSubmit}>
                    <input
                       name="title"
                      placeholder="title"
                      value={title}
                      onChange={(e)=> setTitle(e.target.value)}
                      style={styles.input}
                      />
                      <input
                        name="price"
                        placeholder="Amount"
                        type="number"
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)}
                        style={styles.input}
                        />
                        <select
                          value={category}
                          onChange={(e)=> setCategory(e.target.value)}
                          style={styles.input}
                          >
                            <option value="">Select category</option>
                            <option value="Food">Food</option>
                            <option value="Entertainment">Entertainment</option>
                            <option value="Travel">Travel</option>
                          </select>
                          <input
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            />
                            <div style={styles.buttonGroup}>
                                <button type="submit" style={styles.addBtn}>Add Expense</button>
                                <button onClick={onClose} type="button" style={styles.cancelBtn}>Cancel</button>
                            </div>
                </form>
            </div>

        </div>
    )

}
const styles = {
    overlay:{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex", justifyContent: "center", alignItems: "center", zIndex: 9999,
    },
    modal: {
        backgroundColor: "#fff", padding: "20px", borderRadius: "10px", width: "300px"
    },
    input : {
        width: "100%", padding: "20px", margin: "5px 0"
    },
    buttonGroup: {
        display: "flex", justifyContent : "space-between", marginTop: "10px"
    },
    addBtn: {
    backgroundColor: "orange", border: "none", padding: "8px", borderRadius: "5px"
  },
  cancelBtn: {
    backgroundColor: "#ccc", border: "none", padding: "8px", borderRadius: "5px"
  }
}

export default AddExpenseModal;