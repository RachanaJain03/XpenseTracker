import React, {useState, useEffect} from "react";
import { saveToStorage, getFromStorage } from "../utils/localstorage";


const WalletCard = ()=>{
    const [walletBalance, setWalletBalance] = useState(5000)

    useEffect(()=>{
        const storedBalance = getFromStorage("walletBalance")
        if(storedBalance) setWalletBalance(parseFloat(storedBalance))
    },[])
    useEffect(()=>{
        saveToStorage("walletBalance", walletBalance);
    },[walletBalance]);

    const handleAddIncome = ()=>{

        const amount =parseFloat(prompt("Enter amount to add"));
        if(!amount || amount <= 0){
            alert("Enter a valid amount");
            return;
        }
        setWalletBalance(prev => prev + amount)
    }

    

    return (
        <div style={styles.card}>
            <h3>walletBalance: <span style={{color: "limegreen"}}>{walletBalance}</span></h3>
            <button onClick={handleAddIncome} style={styles.button}>+ Add Income</button>
        </div>
    )

}

const styles = {

    card: {
        padding: "20px",
        backgroundColor: "#2d2d2d",
        borderRadius: "10px",
        color: "#fff",
        width: "250px",
        textAlign: "center",
        marginTop: "20px"
    },
    button: {
        backgroundColor: "#caf50",
        color: "white",
        padding: "10px",
        border:"none",
        borderRadius: "6px",
        marginTop: "10px",

    }
}

export default WalletCard;