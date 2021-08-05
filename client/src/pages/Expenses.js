import React from 'react';
import { Header } from '../components/Expenses/Header';
import { Balance } from '../components/Expenses/Balance';
import { IncomeExpenses } from '../components/Expenses/IncomeExpenses';
import { TransactionList } from '../components/Expenses/TransactionList';
import { AddTransaction } from '../components/Expenses/AddTransaction';

import { GlobalProvider } from '../components/Expenses/context/GlobalState';


function Expenses() {
  return (
    <GlobalProvider>
    
      <div className="expenses-container">
        <Header />
        <Balance />
        <IncomeExpenses />
        <TransactionList />
        <AddTransaction />
      </div>
    </GlobalProvider>
  );
}

export default Expenses;
