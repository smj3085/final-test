import React from 'react';
import { Header } from '../components/Expenses/Header';
import { Balance } from '../components/Expenses/Balance';
import { IncomeExpenses } from '../components/Expenses/IncomeExpenses';
import { TransactionList } from '../components/Expenses/TransactionList';
import { AddTransaction } from '../components/Expenses/AddTransaction';

import { GlobalProvider } from '../components/Expenses/context/GlobalState';
import { Divider, Grid, Segment } from 'semantic-ui-react'
import {FaMoneyBill} from 'react-icons/fa';


function Expenses() {
  return (
    <GlobalProvider>
      <Segment className="expenses-container" style={{padding:'50px'}}>
        <Header />
        <Grid columns={2} relaxed='very' stackable>
            <Grid.Column>
                <Balance />
                <IncomeExpenses />
            </Grid.Column>
            <Grid.Column verticalAlign='middle'>
                <TransactionList />
                <AddTransaction />
            </Grid.Column>
        </Grid>
        <Divider vertical><FaMoneyBill large />
        </Divider>
    </Segment>
    </GlobalProvider>
  );
}

export default Expenses;
