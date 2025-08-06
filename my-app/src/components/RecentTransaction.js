import React, { useState } from "react";

const categoryIcons = {
  Food: "🍔",
  Entertainment: "🎬",
  Travel: "🚗",
};

const RecentTransactions = ({ expenses, onEdit, onDelete})=> {
    const itemsPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    const sortedExpenses = [...expenses].sort(
        (a,b) => new Date(b.date) - new Date(a.date)
    );
    const totalPages  = Math.ceil(sortedExpenses.length/itemsPerPage);
    const paginatedExpenses = sortedExpenses.slice(
        (currentPage-1)*itemsPerPage,
        currentPage*itemsPerPage
    );

    return (
        <div style={{ padding: "20px", background: "#2c2c2c", borderRadius: "10px" }}>
      <h3 style={{ color: "#fff", fontStyle: "italic" }}>Recent Transactions</h3>
      {paginatedExpenses.map((exp) => (
        <div
          key={exp.id}
          style={{
            background: "#fff",
            margin: "10px 0",
            borderRadius: "8px",
            padding: "10px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <div>{categoryIcons[exp.category]} <strong>{exp.title}</strong></div>
            <small style={{ color: "gray" }}>{exp.date}</small>
          </div>
          <div style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "10px", color: "#f57c00" }}>₹{exp.amount}</span>
            <button
              onClick={() => onDelete(exp.id)}
              style={{ background: "crimson", color: "white", border: "none", borderRadius: "4px", marginRight: "5px", padding: "4px 8px" }}
            >❌</button>
            <button
              onClick={() => onEdit(exp)}
              style={{ background: "orange", color: "white", border: "none", borderRadius: "4px", padding: "4px 8px" }}
            >✏️</button>
          </div>
        </div>
      ))}

      {/* Pagination */}
      <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
        <button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>←</button>
        <span style={{ margin: "0 10px", color: "#fff" }}>{currentPage}</span>
        <button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>→</button>
      </div>
    </div>
    )
}
export default RecentTransactions;