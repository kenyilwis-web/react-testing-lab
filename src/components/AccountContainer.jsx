import React, {useState, useEffect} from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";
import Sort from "./Sort";

function AccountContainer() {
  const [transactions,setTransactions] = useState([])
  const [search,setSearch] = useState("")

  // Load all transactions on initial render so the table is populated on startup.
  useEffect(()=>{
    fetch("http://localhost:6001/transactions")
    .then(r=>r.json())
    .then(data=>setTransactions(data))
  },[])

  // Persist a new transaction and then append the API response to local state.
  function postTransaction(newTransaction){
    fetch('http://localhost:6001/transactions',{
      method: "POST",
      headers:{
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newTransaction)
    })
    .then(r=>r.json())
    .then(data=>setTransactions([...transactions,data]))
  }

  // Sort by the selected field while preserving existing values as strings.
  function onSort(sortBy){
    const sortedTransactions = [...transactions].sort((firstTransaction, secondTransaction) => {
      const firstValue = firstTransaction[sortBy] ?? "";
      const secondValue = secondTransaction[sortBy] ?? "";

      return String(firstValue).localeCompare(String(secondValue));
    });

    setTransactions(sortedTransactions);
  }

  // Keep view-level filtering derived from state so original transactions remain source of truth.
  const displayedTransactions = transactions.filter((transaction) => {
    const value = search.toLowerCase();

    return (
      transaction.description.toLowerCase().includes(value) ||
      transaction.category.toLowerCase().includes(value)
    );
  });
  

  return (
    <div>
      <Search setSearch={setSearch}/>
      <AddTransactionForm postTransaction={postTransaction}/>
      <Sort onSort={onSort}/>
      <TransactionsList transactions={displayedTransactions} />
    </div>
  );
}

export default AccountContainer;
