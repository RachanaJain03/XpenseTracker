
import { useEffect, useState } from "react";
import AddExpenseModal from "./components/AddExpenseModal";
import WalletCard from "./components/wallet";
import DashboardCard from "./components/Dashboard";
import Header from "./components/Header";
import EditExpenseModal from "./components/EditExpenseModal";
import ExpenseSummary from "./components/ExpenseSummary";
import AddIncomeModal from "./components/AddIncomeModal";


function App(){

  const [expenses, setExpenses] = useState([])
  const [walletBalance, setWalletBalance] = useState(5000)
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [expenseToEdit, setExpenseToEdit] = useState(null)
  const [showIncomeModal, setShowIncomeModal] = useState(false)

  useEffect(()=>{
    const storedExpenses = JSON.parse(localStorage.getItem("expenses")) || [];
    const storedBalance = parseFloat(localStorage.getItem("walletBalance"))

    setExpenses(storedExpenses);
    if(!isNaN(storedBalance)){
      setWalletBalance(storedBalance)
    }
  },[])

  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
    localStorage.setItem("walletBalance", walletBalance)
  },[expenses, walletBalance])

  const handleAddIncome = (amount) => {
    
    setWalletBalance(prev => prev + amount);
  };

  const handleAddExpense = (expenseData)=>{
    setExpenses((prev) => [...prev, expenseData]);
    setWalletBalance((prev) => prev - expenseData.amount)
  }
  const handleUpdateExpense = (updatedExpense) => {
  setExpenses(prev => prev.map(exp => exp.id === updatedExpense.id ? updatedExpense : exp));

  const oldExpense = expenses.find(e => e.id === updatedExpense.id);
  const amountDiff = updatedExpense.amount - oldExpense.amount;

  setWalletBalance(prev => prev - amountDiff);
};

  const handleAddDelete = (id)=> {
    const expenseToDelete = expenses.find(exp => exp.id === id);

    if(!expenseToDelete) return;

    setExpenses(prev => prev.filter(exp => exp.id !== id))
    setWalletBalance(prev => prev + expenseToDelete.amount)
  }
  



  return (
    <div className="app-container">
      <Header />

      <div className="dashboard-row">
        <DashboardCard
          label="Wallet Balance"
          amount={walletBalance}
          buttonLabel="+ Add Income"
          onClick={()=> setShowIncomeModal(true)}
          color="limegreen"
        />
        <DashboardCard
          label="Expenses"
          amount={expenses.reduce((sum, exp) => sum + exp.amount, 0)}
          buttonLabel="+ Add Expense"
          onClick={() => setShowModal(true)}
          color="red"
        />
      </div>

      {showModal && (
        <AddExpenseModal
          walletBalance={walletBalance}
          onAddExpense={handleAddExpense}
          onClose={() => setShowModal(false)}
        />
      )}
      {showIncomeModal && (
        <AddIncomeModal
          onAddIncome={handleAddIncome}
          onClose={()=> setShowIncomeModal(false)}
          />
      )}
      <div style={styles.sectionWrapper}>
  {/* Recent Transactions */}
  <div style={styles.recentTransactions}>
    <h3 style={styles.sectionTitle}>Recent Transactions</h3>
    {expenses.length === 0 ? (
      <p style={{ color: "#ccc" }}>• No Transactions!</p>
    ) : (
      expenses.map((exp) => (
        <div key={exp.id} style={styles.transactionCard}>
          <div style={styles.transactionLeft}>
            <span style={styles.transactionIcon}>🍽️</span>
            <div>
              <strong>{exp.title}</strong>
              <div style={{ fontSize: "0.85rem", color: "#888" }}>{exp.date}</div>
            </div>
          </div>

          <div style={styles.rightSection}>
            <span style={{ color: "orange", fontWeight: "bold" }}>₹{exp.amount}</span>
            <button
              onClick={() => handleAddDelete(exp.id)}
              style={styles.deleteBtn}
            >
              ❌
            </button>
            <button
              onClick={() => {
                setExpenseToEdit(exp);
                setShowEditModal(true);
              }}
              style={styles.editBtn}
            >
              ✏️
            </button>
          </div>
        </div>
      ))
    )}
  </div>

  {/* Top Expenses */}
  <div style={styles.topExpenses}>
    <h3 style={styles.sectionTitle}>Top Expenses</h3>
    <ExpenseSummary expenses={expenses} />
  </div>
</div>
<div style={{ display: "flex", background: "#3b3b3b", borderRadius: "10px", marginTop: "30px"}}>
  <ExpenseSummary expenses={expenses}/>
</div>

{showEditModal && (
  <EditExpenseModal
    expense={expenseToEdit}
    onClose={() => setShowEditModal(false)}
    onUpdateExpense={handleUpdateExpense}
    
  />
)}
    
    </div>
  );
}
const styles = {
  deleteBtn: {
    marginLeft: "10px",
    backgroundColor: "crimson",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  editBtn: {
    marginLeft: "10px",
    backgroundColor: "teal",
    color: "white",
    border: "none",
    borderRadius: "4px",
    padding: "4px 8px",
    cursor: "pointer",
  },
  sectionWrapper: {
  display: "flex",
  gap: "20px",
  marginTop: "30px",
  flexWrap: "wrap"
},
recentTransactions: {
  backgroundColor: "#2c2c2c",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
  minWidth: "350px"
},
topExpenses: {
  backgroundColor: "#2c2c2c",
  padding: "20px",
  borderRadius: "10px",
  flex: 1,
  minWidth: "350px"
},
sectionTitle: {
  color: "#fff",
  marginBottom: "15px"
},
  transactionContainer: {
  backgroundColor: "#2c2c2c",
  padding: "20px",
  borderRadius: "10px",
  marginTop: "20px",
},
transactionCard: {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 20px",
  marginBottom: "10px",
  borderRadius: "8px",
},
rightSection: {
  display: "flex",
  alignItems: "center",
  gap: "10px",
}
};
export default App;
