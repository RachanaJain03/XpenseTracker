import React from "react";
import {PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const ExpenseSummary = ({expenses}) => {

    const categoryTotals = expenses.reduce((acc, expense) => {
        acc[expense.category] = (acc[expense.category]|| 0) + expense.amount
        return acc; 
    }, {})
    const chartData = Object.keys(categoryTotals).map((category) => ({
        name: category,
        value: categoryTotals[category]
    }))

    if(chartData.length === 0) return <p style={{ color: "#ccc"}}>No expense data to show.</p>

    return(
        <div style={{width: "100%", maxWidth: "400px", margin: "auto", padding: "20px"}}>
            <h3 style={{ textAlign: "center", color: "#fff"}}>Expense Summary</h3>
            <ResponsiveContainer width= "100%" height={300}>
                <PieChart>
                    <Pie
                      data={chartData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label
                      >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell${index}`} fill={COLORS[index % COLORS.length]}/>
                        ))}
                      </Pie>
                      <Tooltip/>
                      <Legend/>
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ExpenseSummary;