import React from "react";

const Header = () => {
  return (
    <header style={styles.header}>
      <h1 style={styles.title}>Expense Tracker</h1>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#282c34",
    padding: "20px",
    textAlign: "center",
  },
  title: {
    color: "white",
    fontSize: "2rem",
    margin: 0,
  },
};

export default Header;